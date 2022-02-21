
import { Helper } from './helper'
import { Entity } from '../model'
import { SchemaManager } from '.'
import { Node } from 'js-expressions'

/**
 *  Expression completer
 */
export class ExpressionCompleter {
	private schema: SchemaManager
	constructor (schema: SchemaManager) {
		this.schema = schema
	}

	public complete (node:Node):Node {
		if (node.type === 'var' && node.children.length === 0) {
			// Example: Products => Products.map(p=>p)
			const arrowVariable = new Node('p', 'var')
			const allFields = new Node('p', 'var')
			const map = new Node('map', 'arrow', [node, arrowVariable, allFields])
			this.completeNode(map)
			return map
		} else {
			this.completeNode(node)
			return node
		}
	}

	private completeNode (node:Node):void {
		if (node.type === 'arrow' || node.type === 'childFunc') {
			this.completeSentence(node)
		} else if (node.children) {
			for (const i in node.children) { this.completeNode(node.children[i]) }
		}
	}

	private getClauses (node:Node):any {
		const clauses:any = {}
		let current = node
		while (current) {
			const name = current.type === 'var' ? 'from' : current.name
			clauses[name] = current
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}
		return clauses
	}

	private completeSentence (mainNode:Node, entityName?:string):void {
		let compleInclude: any
		const clauses:any = this.getClauses(mainNode)
		const entity = this.schema.model.getEntity(entityName || clauses.from.name)
		if (entity === undefined) {
			throw new Error(`entity ${entityName} not found`)
		}
		if (clauses.insert) {
			compleInclude = this.completeInsertInclude
			const node = clauses.insert
			this.completeInsertNode(entity, node)
		} else if (clauses.bulkInsert) {
			compleInclude = this.completeBulkInsertInclude
			const node = clauses.bulkInsert
			this.completeInsertNode(entity, node)
		} else if (clauses.update) {
			compleInclude = this.completeUpdateInclude
			const node = clauses.update
			this.completeUpdateNode(entity, node)
			if (!clauses.filter) { this.createClauseFilter(entity, node) }
		} else if (clauses.updateAll) {
			compleInclude = this.completeUpdateInclude
			const node = clauses.updateAll
			node.name = 'update'
			// TODO: validar que tenga un objeto definido
			// Example: Entity.update({name:'test'})
		} else if (clauses.delete) {
			compleInclude = this.completeDeleteInclude
			const node = clauses.delete
			if (!clauses.filter) { this.createClauseFilter(entity, node) }
		} else if (clauses.deleteAll) {
			compleInclude = this.completeDeleteInclude
			const node = clauses.deleteAll
			node.name = 'delete'
		} else {
			if (clauses.map) {
				compleInclude = this.completeMapInclude
				this.completeMapNode(entity, clauses.map)
			} else if (clauses.distinct) {
				// Replace distinct for map and add function distinct to child of map
				compleInclude = this.completeMapInclude
				clauses.map = clauses.distinct
				clauses.map.name = 'map'
				this.completeMapNode(entity, clauses.map)
				clauses.map.children[2] = new Node('distinct', 'funcRef', [clauses.map.children[2]])
			} else if (clauses.first) {
				// Add orderby and limit , replace first for map
				// example: SELECT * FROM Orders ORDER BY OrderId LIMIT 0,1
				compleInclude = this.completeMapInclude
				clauses.map = clauses.first
				clauses.map.name = 'map'
				this.completeMapNode(entity, clauses.map)
				if (!clauses.sort) {
					const autoincrement = this.schema.model.getAutoincrement(entity.name)
					if (autoincrement !== undefined) {
						const varArrow = new Node('p', 'var', [])
						const varSort = new Node('p.' + autoincrement.name, 'var', [])
						mainNode.children[0] = new Node('sort', 'arrow', [mainNode.children[0], varArrow, varSort])
					}
				}
				if (!clauses.page) {
					const constPage = new Node('1', 'const', [])
					const constRecords = new Node('1', 'const', [])
					mainNode.children[0] = new Node('page', 'childFunc', [mainNode.children[0], constPage, constRecords])
				}
			} else if (clauses.last) {
				// Add orderby desc and limit, replace last for map
				// example: SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 0,1
				compleInclude = this.completeMapInclude
				clauses.map = clauses.last
				clauses.map.name = 'map'
				this.completeMapNode(entity, clauses.map)
				if (!clauses.sort) {
					const autoincrement = this.schema.model.getAutoincrement(entity.name)
					if (autoincrement !== undefined) {
						const varArrow = new Node('p', 'var', [])
						const varSort = new Node('p.' + autoincrement.name, 'var', [])
						const funcDesc = new Node('desc', 'funcRef', [varSort])
						mainNode.children[0] = new Node('sort', 'arrow', [mainNode.children[0], varArrow, funcDesc])
					}
				}
				if (!clauses.page) {
					const constPage = new Node('1', 'const', [])
					const constRecords = new Node('1', 'const', [])
					mainNode.children[0] = new Node('page', 'childFunc', [mainNode.children[0], constPage, constRecords])
				}
			} else if (clauses.take) {
				// Add limit , replace take for map
				// example: SELECT * FROM Orders  LIMIT 0,1
				compleInclude = this.completeMapInclude
				clauses.map = clauses.take
				clauses.map.name = 'map'
				this.completeMapNode(entity, clauses.map)
				if (!clauses.page) {
					const constPage = new Node('1', 'const', [])
					const constRecords = new Node('1', 'const', [])
					mainNode.children[0] = new Node('page', 'childFunc', [mainNode.children[0], constPage, constRecords])
				}
			} else {
				// Solve expresion without map example: Products.filter(p=> id==1)
				compleInclude = this.completeMapInclude
				const varArrow = new Node('p', 'var', [])
				const varAll = new Node('p', 'var', [])
				mainNode.children[0] = new Node('map', 'arrow', [mainNode.children[0], varArrow, varAll])
				clauses.map = mainNode.children[0]
				this.completeMapNode(entity, clauses.map)
			}
		}
		if (clauses.include) {
			if (!compleInclude) { throw new Error('Include not implemented!!!') }

			const clauseInclude = clauses.include
			const arrowVar = clauseInclude.children[1].name
			const body = clauseInclude.children[2]
			if (body.type === 'array') {
				for (let i = 0; i < body.children.length; i++) {
					body.children[i] = compleInclude.bind(this)(entity, arrowVar, body.children[i])
					if (clauses.map) {
						this.addChildFieldField(clauses.map, entity, body.children[i])
					}
				}
			} else {
				clauseInclude.children[2] = compleInclude.bind(this)(entity, arrowVar, body)
				if (clauses.map) {
					this.addChildFieldField(clauses.map, entity, body)
				}
			}
		}
	}

	private addChildFieldField (map:Node, entity:Entity, include:Node):void {
		const relation = this.getIncludeRelation(entity, include)
		const objArrowVar = map.children[1].name
		const fieldToAdd = new Node(objArrowVar + '.' + relation.from, 'var')
		const keyVal = new Node('__' + relation.from, 'keyVal', [fieldToAdd])
		map.children[2].children.push(keyVal)
	}

	private completeMapNode (entity:Entity, node:Node):void {
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
				for (const p in fields.children) {
					const child = fields.children[p]
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

	private fieldToKeyVal (arrowVar:string, field:Node):Node {
		let key: string
		if (field.name.startsWith(arrowVar + '.')) {
			key = field.name.replace(arrowVar + '.', '')
			if (key.includes('.')) {
				key = Helper.replace(key, '.', '_')
			}
		} else {
			key = field.name
		}
		return new Node(key, 'keyVal', [field])
	}

	private completeInsertNode (entity:Entity, node:Node):void {
		if (node.children.length === 1) {
			// example: Entity.insert()
			const fields = this.createWriteNodeFields(entity, undefined, false, true)
			node.children.push(fields)
		} else if (node.children.length === 2 && node.children[1].type === 'var') {
			// example: Entity.insert(entity)
			node.children[1] = this.createWriteNodeFields(entity, node.children[1].name, false, true)
		}
	}

	private completeUpdateNode (entity:Entity, node:Node):void {
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

	private createReadNodeFields (entity:Entity, parent?:string):any {
		const obj = new Node('obj', 'obj', [])
		for (const i in entity.properties) {
			const property = entity.properties[i]
			const field = new Node(parent ? parent + '.' + property.name : property.name, 'var', [])
			const keyVal = new Node(property.name, 'keyVal', [field])
			obj.children.push(keyVal)
		}
		return obj
	}

	private createWriteNodeFields (entity:Entity, parent?:string, excludePrimaryKey = false, excludeAutoincrement = false):any {
		const obj = new Node('obj', 'obj', [])
		for (const i in entity.properties) {
			const property = entity.properties[i]
			if ((!property.autoincrement || !excludeAutoincrement) && ((entity.primaryKey !== undefined && !entity.primaryKey.includes(property.name)) || !excludePrimaryKey)) {
				const field = new Node(parent ? parent + '.' + property.name : property.name, 'var', [])
				const keyVal = new Node(property.name, 'keyVal', [field])
				obj.children.push(keyVal)
			}
		}
		return obj
	}

	private createClauseFilter (entity:Entity, node:Node):void {
		if (node.children.length === 1) {
			// Example: Entity.delete()
			const condition = this.createFilter(entity, 'p')
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		} else if (node.children.length === 2 && node.children[1].type === 'var') {
			// Example Entity.update(entity) ,Entity.delete(entity)
			const condition = this.createFilter(entity, 'p', node.children[1].name)
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		} else if (node.children.length === 2 && node.children[1].type === 'obj') {
			// Example Entity.update({unitPrice:unitPrice,productId:productId)
			const condition = this.createFilter(entity, 'p', node.children[1].name)
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		} else if (node.children.length === 3) {
			// Example: Entity.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			// Aplica al update del include, en el caso del ejemplo seria a: p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })
			const condition = this.createFilter(entity, 'p')
			const arrowVar = new Node('p', 'var', [])
			node.children[0] = new Node('filter', 'arrow', [node.children[0], arrowVar, condition])
		}
	}

	private createFilter (entity:Entity, parent?:string, parentVariable?:string):Node {
		let condition
		if (entity.primaryKey !== undefined) {
			for (let i = 0; i < entity.primaryKey?.length; i++) {
				const name = entity.primaryKey[i]
				const field = entity.properties.find(p => p.name === name)
				if (field !== undefined) {
					const fieldNode = new Node(parent ? parent + '.' + field.name : field.name, 'var')
					const variableNode = new Node(parentVariable ? parentVariable + '.' + name : name, 'var')
					const equal = new Node('==', 'oper', [fieldNode, variableNode])
					condition = condition ? new Node('&&', 'oper', [condition, equal]) : equal
				}
			}
		}
		if (condition) {
			return condition
		}
		throw new Error('Create Filter incorrect!!!')
	}

	private completeMapInclude (entity:Entity, arrowVar:string, node:Node):Node {
		return this.completeSelectInclude(entity, arrowVar, node, 'map')
	}

	private completeSelectInclude (entity:Entity, arrowVar:string, node:Node, clause:string):Node {
		let map:Node, relation:any
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
			// resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiendolo en .include(p=> p.details.map(p=>p))
			const varArrowNode = new Node('p', 'var', [])
			const varAll = new Node('p', 'var', [])
			const parts = node.name.split('.')
			const relationName = parts[1]
			relation = entity.relations.find(p => p.name === relationName)
			map = new Node(clause, 'arrow', [node, varArrowNode, varAll])
			this.completeSentence(map, relation.entity)
		} else {
			throw new Error('Error to add include node ' + node.type + ':' + node.name)
		}
		// add filter with parent
		const clauses:any = this.getClauses(map)
		const childFilter = clauses.filter
		const arrowFilterVar = childFilter ? childFilter.children[1].name : 'p'
		const fieldRelation = new Node(arrowFilterVar + '.' + relation.to, 'var') // new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping)
		// const varRelation = new Node('list_' + relation.to, 'var')
		const varRelation = new Node('__parentId', 'var')
		const filterInclude = new Node('includes', 'funcRef', [fieldRelation, varRelation])
		if (!childFilter) {
			const varFilterArrowNode = new Node(arrowFilterVar, 'var', [])
			map.children[0] = new Node('filter', 'arrow', [map.children[0], varFilterArrowNode, filterInclude])
		} else {
			childFilter.children[0] = new Node('&&', 'oper', [childFilter.children[0], filterInclude])
		}
		// If the column for which the include is to be resolved is not in the select, it must be added
		const arrowSelect = clauses.map.children[1].name
		const field = new Node(arrowSelect + '.' + relation.to, 'var')
		clauses.map.children[2].children.push(new Node('__parentId', 'keyVal', [field]))
		// clauses.map.children[2].children.push(new Node(fieldName, 'var'))
		// switch (clauses.map.children[2].type) {
		// case 'var':
		// if (clauses.map.children[2].name !== fieldName) {
		// const nodeToAdd = new Node(fieldName, 'var')
		// clauses.map.children[2] = new Node('array', 'array', [clauses.map.children[2], nodeToAdd])
		// }
		// break
		// case 'array':
		// if (!clauses.map.children[2].children.some((p: Node) => p.name === fieldName)) {
		// clauses.map.children[2].children.push(new Node(fieldName, 'var'))
		// }
		// }
		return map
	}

	private completeBulkInsertInclude (entity:Entity, arrowVar:string, node:Node):Node {
		return this.completeInclude(entity, arrowVar, node, 'bulkInsert')
	}

	private completeInsertInclude (entity:Entity, arrowVar:string, node:Node):Node {
		return this.completeInclude(entity, arrowVar, node, 'insert')
	}

	private completeUpdateInclude (entity:Entity, arrowVar:string, node:Node):Node {
		return this.completeInclude(entity, arrowVar, node, 'update')
	}

	private completeDeleteInclude (entity:Entity, arrowVar:string, node:Node):Node {
		return this.completeInclude(entity, arrowVar, node, 'delete')
	}

	private getIncludeRelation (entity:Entity, node:Node):any {
		if (node.type === 'arrow') {
			// resuelve el siguiente caso  .includes(details.insert())
			let current = node
			while (current) {
				if (current.type === 'var') {
					// p.details
					const parts = current.name.split('.')
					const relationName = parts[1]
					return entity.relations.find(p => p.name === relationName)
					break
				}
				if (current.children.length > 0) { current = current.children[0] } else { break }
			}
		} else if (node.type === 'var') {
			// resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiendolo en Details.insert()
			const parts = node.name.split('.')
			const relationName = parts[1]
			return entity.relations.find(p => p.name === relationName)
		} else {
			throw new Error('not found relation in include node ' + node.type + ':' + node.name)
		}
	}

	private completeInclude (entity: Entity, arrowVar: string, node: Node, clause: string): Node {
		if (node.type === 'arrow') {
		// resuelve el siguiente caso  .includes(details.insert())
			const relation = this.getIncludeRelation(entity, node)
			const clauses:any = this.getClauses(node)
			const clauseNode = clauses[clause] ? clauses[clause] : new Node(clause, 'childFunc', [node])
			this.completeSentence(clauseNode, relation.entity)
			return clauseNode
		} else if (node.type === 'var') {
			// resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiendolo en Details.insert()
			const relation = this.getIncludeRelation(entity, node)
			const clauseNode = new Node(clause, 'childFunc', [node])
			this.completeSentence(clauseNode, relation.entity)
			return clauseNode
		} else {
			throw new Error('Error to add include node ' + node.type + ':' + node.name)
		}
	}
}
