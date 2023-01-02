
import { helper, SchemaManager } from '../manager'
import { Entity, SchemaError, SintaxisError } from '../contract'
import { Node } from '3xpr'

/**
 *  Expression completer
 */
export class ExpressionNormalizer {
	private schema: SchemaManager
	constructor (schema: SchemaManager) {
		this.schema = schema
	}

	public normalize (node: Node): Node {
		if (node.type === 'var' && node.children.length === 0) {
			// Example: Products => Products.map(p=>p)
			const arrowVariable = new Node('p', 'var')
			const allFields = new Node('p', 'var')
			const map = new Node('map', 'arrow', [node, arrowVariable, allFields])
			this.normalizeNode(map)
			return map
		} else {
			this.normalizeNode(node)
			return node
		}
	}

	private normalizeNode (node: Node): void {
		if (node.type === 'arrow' || node.type === 'childFunc') {
			// rename ambiguous functions
			if (node.name === 'select') {
				node.name = 'map'
			} else if (node.name === 'where') {
				node.name = 'filter'
			} else if (node.name === 'remove') {
				node.name = 'delete'
			}
			this.completeSentence(node)
		} else if (node.children) {
			// rename ambiguous functions
			if (node.type === 'func') {
				if (node.name === 'in') {
					node.name = 'includes'
				}
			}
			for (const i in node.children) {
				this.normalizeNode(node.children[i])
			}
		}
	}

	private getClauses (node: Node): any {
		const clauses: any = {}
		let current = node
		while (current) {
			const name = current.type === 'var' ? 'from' : current.name
			clauses[name] = current
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}
		return clauses
	}

	private completeSentence (mainNode: Node, entityName?: string): void {
		let compeleInclude: any
		const clauses: any = this.getClauses(mainNode)
		const entity = this.schema.model.getForcedEntity(entityName || clauses.from.name)
		if (clauses.insert) {
			compeleInclude = this.completeInsertInclude
			this.completeInsertNode(entity, clauses.insert)
		} else if (clauses.bulkInsert) {
			compeleInclude = this.completeBulkInsertInclude
			this.completeInsertNode(entity, clauses.bulkInsert)
		} else if (clauses.update) {
			compeleInclude = this.completeUpdateInclude
			this.completeFilterNode(entity, clauses, clauses.update)
			this.completeUpdateNode(entity, clauses.update)
		} else if (clauses.updateAll) {
			compeleInclude = this.completeUpdateInclude
			clauses.updateAll.name = 'update'
			// validate that it has an object defined
			// Example: Entity.update({name:'test'})
		} else if (clauses.delete) {
			compeleInclude = this.completeDeleteInclude
			this.completeFilterNode(entity, clauses, clauses.delete)
		} else if (clauses.deleteAll) {
			compeleInclude = this.completeDeleteInclude
			clauses.deleteAll.name = 'delete'
		} else if (clauses.map) {
			compeleInclude = this.completeMapInclude
			this.completeMapNode(entity, clauses.map)
		} else if (clauses.distinct) {
			compeleInclude = this.completeMapInclude
			this.completeDistinctNode(clauses, entity)
		} else if (clauses.first) {
			compeleInclude = this.completeMapInclude
			this.completeFirstNode(clauses, mainNode, entity)
		} else if (clauses.last) {
			compeleInclude = this.completeMapInclude
			this.completeLastNode(clauses, mainNode, entity)
		} else {
			// Solve expresión without map example: Products.filter(p=> id==1)
			compeleInclude = this.completeMapInclude
			const varArrow = new Node('p', 'var', [])
			const varAll = new Node('p', 'var', [])
			mainNode.children[0] = new Node('map', 'arrow', [mainNode.children[0], varArrow, varAll])
			clauses.map = mainNode.children[0]
			this.completeMapNode(entity, clauses.map)
		}

		if (clauses.sort) {
			this.completeSortNode(clauses)
		}
		if (clauses.page && !clauses.sort) {
			this.addSortNode(clauses, mainNode, 'asc')
		}
		if (clauses.include) {
			this.completeIncludeNode(clauses, compeleInclude, entity)
		}
	}

	private completeFilterNode (entity: Entity, clauses: any, clause:any): void {
		if (!clauses.filter) {
			this.createClauseFilter(entity, clause)
		}
	}

	private completeDistinctNode (clauses: any, entity: Entity): void {
		// Replace distinct for map and add function distinct to child of map
		clauses.map = clauses.distinct
		clauses.map.name = 'map'
		this.completeMapNode(entity, clauses.map)
		clauses.map.children[2] = new Node('distinct', 'funcRef', [clauses.map.children[2]])
	}

	private completeFirstNode (clauses: any, mainNode: Node, entity: Entity): void {
		// Add orderby and limit , replace first for map
		// example: SELECT * FROM Orders ORDER BY OrderId LIMIT 0,1
		clauses.map = clauses.first
		clauses.map.name = 'map'
		this.completeMapNode(entity, clauses.map)
		if (!clauses.sort) {
			this.addSortNode(clauses, mainNode, 'asc')
		}
		if (!clauses.page) {
			const constPage = new Node('1', 'const', [])
			const constRecords = new Node('1', 'const', [])
			mainNode.children[0] = new Node('page', 'childFunc', [mainNode.children[0], constPage, constRecords])
		}
	}

	private completeLastNode (clauses: any, mainNode: Node, entity: Entity): void {
		// Add orderby desc and limit, replace last for map
		// example: SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 0,1
		clauses.map = clauses.last
		clauses.map.name = 'map'
		this.completeMapNode(entity, clauses.map)
		if (!clauses.sort) {
			this.addSortNode(clauses, mainNode, 'desc')
		}
		if (!clauses.page) {
			const constPage = new Node('1', 'const', [])
			const constRecords = new Node('1', 'const', [])
			mainNode.children[0] = new Node('page', 'childFunc', [mainNode.children[0], constPage, constRecords])
		}
	}

	private addSortNode (clauses: any, mainNode: Node, order: string): void {
		// if the order is not defined, order by the first field
		const firstKeyVal = clauses.map.children[2].children[0]
		const varArrow = new Node('p', 'var', [])
		const varSort = new Node('p.' + firstKeyVal.name, 'var', [])
		const funcAsc = new Node(order, 'funcRef', [varSort])
		mainNode.children[0] = new Node('sort', 'arrow', [mainNode.children[0], varArrow, funcAsc])
	}

	private completeSortNode (clauses: any): void {
		// sets ascending order in the case that it has not already been specified
		const body = clauses.sort.children[2]
		if (body.type === 'array') {
			for (let i = 0; i < body.children.length; i++) {
				if (body.children[i].type === 'var') {
					body.children[i] = new Node('asc', 'funcRef', [body.children[i]])
				}
			}
		} else if (body.type === 'var') {
			clauses.sort.children[2] = new Node('asc', 'funcRef', [body])
		}
	}

	private completeIncludeNode (clauses: any, compeleInclude:any, entity: Entity): void {
		if (!compeleInclude) {
			throw new SchemaError('Include not implemented!!!')
		}
		const clauseInclude = clauses.include
		const arrowVar = clauseInclude.children[1].name
		const body = clauseInclude.children[2]
		if (body.type === 'array') {
			for (let i = 0; i < body.children.length; i++) {
				body.children[i] = compeleInclude.bind(this)(entity, arrowVar, body.children[i])
				if (clauses.map) {
					this.addChildFieldField(clauses.map, entity, body.children[i])
				}
			}
		} else {
			clauseInclude.children[2] = compeleInclude.bind(this)(entity, arrowVar, body)
			if (clauses.map) {
				this.addChildFieldField(clauses.map, entity, body)
			}
		}
	}

	private addChildFieldField (map: Node, entity: Entity, include: Node): void {
		const relation = this.getIncludeRelation(entity, include)
		const objArrowVar = map.children[1].name
		const fieldToAdd = new Node(objArrowVar + '.' + relation.from, 'var')
		const keyVal = new Node('__' + relation.from, 'keyVal', [fieldToAdd])
		map.children[2].children.push(keyVal)
	}

	private completeMapNode (entity: Entity, node: Node): void {
		if (node.children && node.children.length === 3) {
			const arrowVar = node.children[1].name
			const fields = node.children[2]
			if (fields.children.length === 0 && fields.name === arrowVar) {
				// Example: Entity.map(p=> p) to  Entity.map(p=> {field1:p.field1,field2:p.field2,field3:p.field3,...})
				node.children[2] = this.createReadNodeFields(entity, arrowVar)
			} else if (fields.type === 'var') {
				// Example: Entity.map(p=> p.name) to  Entity.map(p=> {name:p.name})
				const keyVal = this.fieldToKeyVal(arrowVar, fields)
				node.children[2] = new Node('obj', 'obj', [keyVal])
			} else if (fields.type === 'array') {
				// Example: Entity.map(p=> [p.id, p.name]) to  Entity.map(p=> {id:p.id,name:p.name})
				const obj = new Node('obj', 'obj', [])
				for (const child of fields.children) {
					const keyVal = this.fieldToKeyVal(arrowVar, child)
					obj.children.push(keyVal)
				}
				node.children[2] = obj
			}
		} else {
			const varArrow = new Node('p', 'var', [])
			const fields = this.createReadNodeFields(entity, 'p')
			node.children.push(varArrow)
			node.children.push(fields)
		}
	}

	private fieldToKeyVal (arrowVar: string, field: Node): Node {
		let key: string
		if (field.name.startsWith(arrowVar + '.')) {
			key = field.name.replace(arrowVar + '.', '')
			if (key.includes('.')) {
				key = helper.str.replace(key, '.', '_')
			}
		} else {
			key = field.name
		}
		return new Node(key, 'keyVal', [field])
	}

	private completeInsertNode (entity: Entity, node: Node): void {
		if (node.children.length === 1) {
			// example: Entity.insert()
			const fields = this.createWriteNodeFields(entity, undefined, false, true)
			node.children.push(fields)
		} else if (node.children.length === 2 && node.children[1].type === 'var') {
			// example: Entity.insert(entity)
			node.children[1] = this.createWriteNodeFields(entity, node.children[1].name, false, true)
		}
	}

	private completeUpdateNode (entity: Entity, node: Node): void {
		if (node.children.length === 1) {
			// Example: Entity.update()
			// In the case that the mapping is not defined, it assumes that the data will be the entity to update
			const fields = this.createWriteNodeFields(entity, undefined, false, true)
			node.children.push(fields)
		} else if (node.children.length === 2 && node.children[1].type === 'var') {
			// Example: Entity.update(entity)
			// In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
			node.children[1] = this.createWriteNodeFields(entity, node.children[1].name, true)
		} else if (node.children.length === 3 && node.type === 'arrow' && node.children[1].name === node.children[2].name) {
			// Example: Entity.update({ name: entity.name }).include(p => p.details.update(p => p))
			node.children[2] = this.createWriteNodeFields(entity, node.children[1].name, true)
		}
	}

	private createReadNodeFields (entity: Entity, parent?: string): any {
		const obj = new Node('obj', 'obj', [])
		for (const i in entity.properties) {
			const property = entity.properties[i]
			const field = new Node(parent ? parent + '.' + property.name : property.name, 'var', [])
			const keyVal = new Node(property.name, 'keyVal', [field])
			obj.children.push(keyVal)
		}
		return obj
	}

	private createWriteNodeFields (entity: Entity, parent?: string, excludePrimaryKey = false, excludeAutoIncrement = false): any {
		const obj = new Node('obj', 'obj', [])
		for (const i in entity.properties) {
			const property = entity.properties[i]
			if ((!property.autoIncrement || !excludeAutoIncrement) && ((entity.primaryKey !== undefined && !entity.primaryKey.includes(property.name)) || !excludePrimaryKey)) {
				const field = new Node(parent ? parent + '.' + property.name : property.name, 'var', [])
				const keyVal = new Node(property.name, 'keyVal', [field])
				obj.children.push(keyVal)
			}
		}
		return obj
	}

	private createClauseFilter (entity: Entity, node: Node): void {
		if (node.children.length === 1 || node.children.length === 3) {
			// Example node.children.length === 1: Entity.delete()
			// Example node.children.length === 3:
			// Entity.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			// Aplica al update del include, en el caso del ejemplo seria a: p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })
			const condition = this.createFilter(entity, 'p')
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		} else if (node.children.length === 2 && (node.children[1].type === 'var' || node.children[1].type === 'obj')) {
			// Example node.children[1].type === 'var': Entity.update(entity) ,Entity.delete(entity)
			// Example node.children[1].type === 'obj': Entity.update({unitPrice:unitPrice,productId:productId})
			// const condition = this.createFilter(entity, 'p', node.children[1].name)
			const parentVariable = node.children[1].type === 'var' ? node.children[1].name : undefined
			const condition = this.createFilter(entity, 'p', parentVariable)
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		}
	}

	private createFilter (entity: Entity, parent?: string, parentVariable?: string): Node {
		if (entity.primaryKey === undefined || entity.primaryKey.length === 0) {
			throw new SchemaError(`Entity ${entity.name} cannot be create filter because the primary key is empty`)
		}
		let condition
		for (const name of entity.primaryKey) {
			const field = entity.properties.find(p => p.name === name)
			if (field === undefined) {
				throw new SchemaError(`Entity ${entity.name} not found property ${name} defined in primary key`)
			}
			const fieldNode = new Node(parent ? parent + '.' + field.name : field.name, 'var')
			const variableNode = new Node(parentVariable ? parentVariable + '.' + name : name, 'var')
			const equal = new Node('==', 'operator', [fieldNode, variableNode])
			condition = condition ? new Node('&&', 'operator', [condition, equal]) : equal
		}
		return condition
	}

	private completeMapInclude (entity: Entity, arrowVar: string, node: Node): Node {
		return this.completeSelectInclude(entity, arrowVar, node, 'map')
	}

	private completeSelectInclude (entity: Entity, _arrowVar: string, node: Node, clause: string): Node {
		let map: Node, relation: any
		if (node.type === 'arrow') {
			// resuelve el siguiente caso  .includes(details.map(p=>p))
			let current = node
			while (current) {
				if (current.type === 'var') {
					// p.details
					const parts = current.name.split('.')
					const relationName = parts[1]
					relation = entity.relations.find(p => p.name === relationName)
					break
				}
				if (current.children.length > 0) { current = current.children[0] } else { break }
			}
			map = node// new Node(clause,'childFunc',[node])
			this.completeSentence(map, relation.entity)
		} else if (node.type === 'var') {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en .include(p=> p.details.map(p=>p))
			const varArrowNode = new Node('p', 'var', [])
			const varAll = new Node('p', 'var', [])
			const parts = node.name.split('.')
			const relationName = parts[1]
			relation = entity.relations.find(p => p.name === relationName)
			map = new Node(clause, 'arrow', [node, varArrowNode, varAll])
			this.completeSentence(map, relation.entity)
		} else {
			throw new SintaxisError('Error to add include node ' + node.type + ':' + node.name)
		}
		// add filter with parent
		const clauses: any = this.getClauses(map)
		const childFilter = clauses.filter
		const arrowFilterVar = childFilter ? childFilter.children[1].name : 'p'
		const fieldRelation = new Node(arrowFilterVar + '.' + relation.to, 'var') // new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping)
		const varRelation = new Node('LambdaOrmParentId', 'var')
		const filterInclude = new Node('in', 'funcRef', [varRelation, fieldRelation])
		if (!childFilter) {
			const varFilterArrowNode = new Node(arrowFilterVar, 'var', [])
			map.children[0] = new Node('filter', 'arrow', [map.children[0], varFilterArrowNode, filterInclude])
		} else {
			childFilter.children[0] = new Node('&&', 'operator', [childFilter.children[0], filterInclude])
		}
		// If the column for which the include is to be resolved is not in the select, it must be added
		const arrowSelect = clauses.map.children[1].name
		const field = new Node(arrowSelect + '.' + relation.to, 'var')
		clauses.map.children[2].children.push(new Node('LambdaOrmParentId', 'keyVal', [field]))
		return map
	}

	private completeBulkInsertInclude (entity: Entity, arrowVar: string, node: Node): Node {
		return this.completeInclude(entity, arrowVar, node, 'bulkInsert')
	}

	private completeInsertInclude (entity: Entity, arrowVar: string, node: Node): Node {
		return this.completeInclude(entity, arrowVar, node, 'insert')
	}

	private completeUpdateInclude (entity: Entity, arrowVar: string, node: Node): Node {
		return this.completeInclude(entity, arrowVar, node, 'update')
	}

	private completeDeleteInclude (entity: Entity, arrowVar: string, node: Node): Node {
		return this.completeInclude(entity, arrowVar, node, 'delete')
	}

	private getIncludeRelation (entity: Entity, node: Node): any {
		if (node.type === 'arrow') {
			// resuelve el siguiente caso  .includes(details.insert())
			let current = node
			while (current) {
				if (current.type === 'var') {
					// p.details
					const parts = current.name.split('.')
					const relationName = parts[1]
					return entity.relations.find(p => p.name === relationName)
				}
				if (current.children.length > 0) { current = current.children[0] } else { break }
			}
		} else if (node.type === 'var') {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
			const parts = node.name.split('.')
			const relationName = parts[1]
			return entity.relations.find(p => p.name === relationName)
		} else {
			throw new SchemaError('not found relation in include node ' + node.type + ':' + node.name)
		}
	}

	private completeInclude (entity: Entity, _arrowVar: string, node: Node, clause: string): Node {
		if (node.type === 'arrow') {
			// resuelve el siguiente caso  .includes(details.insert())
			const relation = this.getIncludeRelation(entity, node)
			const clauses: any = this.getClauses(node)
			const clauseNode = clauses[clause] ? clauses[clause] : new Node(clause, 'childFunc', [node])
			this.completeSentence(clauseNode, relation.entity)
			return clauseNode
		} else if (node.type === 'var') {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
			const relation = this.getIncludeRelation(entity, node)
			if (!relation) {
				throw new SchemaError(`Relation ${node.name} not found in ${entity.name}`)
			}
			const clauseNode = new Node(clause, 'childFunc', [node])
			this.completeSentence(clauseNode, relation.entity)
			return clauseNode
		} else {
			throw new SchemaError('Error to add include node ' + node.type + ':' + node.name)
		}
	}
}
