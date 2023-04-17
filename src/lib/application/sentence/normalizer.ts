
import { helper } from '../helper'
import { Entity, Field, Relation, SchemaError, SintaxisError, ISchemaService } from '../../domain'
import { IExpressions, Operand, OperandType, Position, IModelService, IOperandNormalizer } from '3xpr'
import { Type, Kind } from 'typ3s'
/**
 *  Expression completer
 */
export class SentenceNormalizer implements IOperandNormalizer {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model: IModelService,
		private readonly schema: ISchemaService,
		private readonly expressions: IExpressions
	) {}

	public normalize (operand: Operand): Operand {
		// it clones the operand because it is going to modify it and it should not alter the operand passed by parameter
		const cloned = this.expressions.clone(operand)
		this.normalizeOperand(cloned)
		if (cloned.type === OperandType.Var && cloned.children.length === 0) {
			// Example: Products => Products.map(p=>p)
			const arrowVariable = new Operand(cloned.pos, 'p', OperandType.Var)
			const allFields = new Operand(cloned.pos, 'p', OperandType.Var)
			const map = new Operand(cloned.pos, 'map', OperandType.Arrow, [cloned, arrowVariable, allFields])
			this.normalizeSentence(map)
			return map
		} else {
			this.normalizeSentence(cloned)
			return cloned
		}
	}

	private normalizeOperand (operand: Operand): void {
		if (operand.type === OperandType.Arrow || operand.type === OperandType.ChildFunc || operand.type === OperandType.CallFunc) {
			const alias = this.model.functionAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		} else if (operand.type === OperandType.Operator) {
			const alias = this.model.operatorAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		} else if (operand.type === OperandType.Const && operand.returnType !== undefined && operand.returnType.kind === Kind.boolean) {
			operand.name = (operand.name.toString().toLowerCase() === 'true')
		}
		for (const child of operand.children) {
			this.normalizeOperand(child)
		}
	}

	private getClauses (operand: Operand): any {
		const clauses: any = {}
		let current = operand
		while (current) {
			let name = current.type === OperandType.Var ? 'from' : current.name
			if (name === 'push') {
				name = 'insert'
				current.name = 'insert'
			} else if (name === 'remove') {
				name = 'delete'
				current.name = 'delete'
			}
			clauses[name] = current
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}

		return clauses
	}

	private normalizeSentence (mainOperand: Operand, entityName?: string): void {
		let compeleInclude: any
		const clauses: any = this.getClauses(mainOperand)
		const entity = this.schema.model.getForcedEntity(entityName || clauses.from.name)
		if (clauses.insert) {
			compeleInclude = this.completeInsertInclude
			this.normalizeInsert(entity, clauses.insert)
		} else if (clauses.bulkInsert) {
			compeleInclude = this.completeBulkInsertInclude
			this.normalizeInsert(entity, clauses.bulkInsert)
		} else if (clauses.update) {
			compeleInclude = this.completeUpdateInclude
			this.completeFilter(entity, clauses, clauses.update)
			this.normalizeUpdate(entity, clauses.update)
		} else if (clauses.updateAll) {
			compeleInclude = this.completeUpdateInclude
			this.normalizeUpdate(entity, clauses.updateAll)
			clauses.updateAll.name = 'update'
		} else if (clauses.delete) {
			compeleInclude = this.completeDeleteInclude
			this.completeFilter(entity, clauses, clauses.delete)
			this.normalizeDelete(clauses.delete)
		} else if (clauses.deleteAll) {
			compeleInclude = this.completeDeleteInclude
			this.normalizeDelete(clauses.deleteAll)
			clauses.deleteAll.name = 'delete'
		} else if (clauses.map) {
			compeleInclude = this.completeMapInclude
			this.normalizeMap(entity, clauses.map)
		} else if (clauses.distinct) {
			compeleInclude = this.completeMapInclude
			this.normalizeDistinct(clauses, entity)
		} else if (clauses.first) {
			compeleInclude = this.completeMapInclude
			this.normalizeFirst(clauses, mainOperand, entity)
		} else if (clauses.last) {
			compeleInclude = this.completeMapInclude
			this.normalizeLast(clauses, mainOperand, entity)
		} else {
			// Solve expresión without map example: Products.filter(p=> id==1)
			compeleInclude = this.completeMapInclude
			const varArrow = new Operand(mainOperand.pos, 'p', OperandType.Var)
			const varAll = new Operand(mainOperand.pos, 'p', OperandType.Var)
			mainOperand.children[0] = new Operand(mainOperand.pos, 'map', OperandType.Arrow, [mainOperand.children[0], varArrow, varAll])
			clauses.map = mainOperand.children[0]
			this.normalizeMap(entity, clauses.map)
		}

		if (clauses.sort) {
			this.normalizeSort(clauses)
		}
		if (clauses.page && !clauses.sort) {
			this.addSortNode(clauses, mainOperand, 'asc')
		}
		if (clauses.include) {
			this.normalizeInclude(clauses, compeleInclude, entity)
		}
	}

	private completeFilter (entity: Entity, clauses: any, clause:any): void {
		if (!clauses.filter) {
			this.createClauseFilter(entity, clause)
		}
	}

	private normalizeDistinct (clauses: any, entity: Entity): void {
		// Replace distinct for map and add function distinct to child of map
		clauses.map = clauses.distinct
		clauses.map.name = 'map'
		this.normalizeMap(entity, clauses.map)
		clauses.map.children[2] = new Operand(clauses.map.pos, 'distinct', OperandType.CallFunc, [clauses.map.children[2]])
	}

	private normalizeFirst (clauses: any, mainOperand: Operand, entity: Entity): void {
		// Add orderby and limit , replace first for map
		// example: SELECT * FROM Orders ORDER BY OrderId LIMIT 0,1
		clauses.map = clauses.first
		clauses.map.name = 'map'
		this.normalizeMap(entity, clauses.map)
		if (!clauses.sort) {
			this.addSortNode(clauses, mainOperand, 'asc')
		}
		if (!clauses.page) {
			const constPage = new Operand(mainOperand.pos, '1', OperandType.Const, [])
			const constRecords = new Operand(mainOperand.pos, '1', OperandType.Const, [])
			mainOperand.children[0] = new Operand(mainOperand.pos, 'page', OperandType.ChildFunc, [mainOperand.children[0], constPage, constRecords])
		}
	}

	private normalizeLast (clauses: any, mainOperand: Operand, entity: Entity): void {
		// Add orderby desc and limit, replace last for map
		// example: SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 0,1
		clauses.map = clauses.last
		clauses.map.name = 'map'
		this.normalizeMap(entity, clauses.map)
		if (!clauses.sort) {
			this.addSortNode(clauses, mainOperand, 'desc')
		}
		if (!clauses.page) {
			const constPage = new Operand(mainOperand.pos, '1', OperandType.Const, [])
			const constRecords = new Operand(mainOperand.pos, '1', OperandType.Const, [])
			mainOperand.children[0] = new Operand(mainOperand.pos, 'page', OperandType.ChildFunc, [mainOperand.children[0], constPage, constRecords])
		}
	}

	private addSortNode (clauses: any, mainOperand: Operand, order: string): void {
		// if the order is not defined, order by the first field
		const firstKeyVal = clauses.map.children[2].children[0]
		const varArrow = new Operand(mainOperand.pos, 'p', OperandType.Var, [])
		const varSort = new Operand(mainOperand.pos, 'p.' + firstKeyVal.name, OperandType.Var, [])
		const funcAsc = new Operand(mainOperand.pos, order, OperandType.CallFunc, [varSort])
		mainOperand.children[0] = new Operand(mainOperand.pos, 'sort', OperandType.Arrow, [mainOperand.children[0], varArrow, funcAsc])
	}

	private normalizeSort (clauses: any): void {
		// sets ascending order in the case that it has not already been specified
		const body = clauses.sort.children[2]
		if (body.type === OperandType.List) {
			for (let i = 0; i < body.children.length; i++) {
				if (body.children[i].type !== OperandType.CallFunc || !(['asc', 'desc'].includes(body.children[i].name))) {
					// Example: .sort(p => [p.category, p.name])
					body.children[i] = new Operand(body.pos, 'asc', OperandType.CallFunc, [body.children[i]])
				}
			}
		} else if (body.type !== OperandType.CallFunc || !(['asc', 'desc'].includes(body.name))) {
			// Example: .sort(p => p.name)
			clauses.sort.children[2] = new Operand(clauses.sort.pos, 'asc', OperandType.CallFunc, [body])
		}
	}

	private normalizeInclude (clauses: any, compeleInclude:any, entity: Entity): void {
		if (!compeleInclude) {
			throw new SchemaError('Include not implemented!!!')
		}
		const clauseInclude = clauses.include
		const arrowVar = clauseInclude.children[1].name
		const body = clauseInclude.children[2]
		if (body.type === OperandType.List) {
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

	private addChildFieldField (map: Operand, entity: Entity, include: Operand): void {
		const relation = this.getIncludeRelation(entity, include)
		const objArrowVar = map.children[1].name
		const fieldToAdd = new Operand(map.pos, objArrowVar + '.' + relation.from, OperandType.Var)
		const keyVal = new Operand(map.pos, '__' + relation.from, OperandType.KeyVal, [fieldToAdd])
		map.children[2].children.push(keyVal)
	}

	private normalizeMap (entity: Entity, operand: Operand): void {
		if (operand.children && operand.children.length === 3) {
			const arrowVar = operand.children[1].name
			const fields = operand.children[2]
			if (fields.children.length === 0 && fields.name === arrowVar) {
				// Example: Entity.map(p=> p) to  Entity.map(p=> {field1:p.field1,field2:p.field2,field3:p.field3,...})
				operand.children[2] = this.createReadFields(operand.pos, entity, arrowVar)
			} else if (fields.type === OperandType.Var) {
				// Example: Entity.map(p=> p.name) to  Entity.map(p=> {name:p.name})
				const keyVal = this.fieldToKeyVal(arrowVar, fields)
				operand.children[2] = new Operand(operand.pos, OperandType.Obj, OperandType.Obj, [keyVal])
			} else if (fields.type === OperandType.List) {
				// Example: Entity.map(p=> [p.id, p.name]) to  Entity.map(p=> {id:p.id,name:p.name})
				const obj = new Operand(operand.pos, OperandType.Obj, OperandType.Obj, [])
				for (const child of fields.children) {
					const keyVal = this.fieldToKeyVal(arrowVar, child)
					obj.children.push(keyVal)
				}
				operand.children[2] = obj
			}
		} else {
			const varArrow = new Operand(operand.pos, 'p', OperandType.Var, [])
			const fields = this.createReadFields(operand.pos, entity, 'p')
			operand.children.push(varArrow)
			operand.children.push(fields)
		}
	}

	private fieldToKeyVal (arrowVar: string, field: Operand): Operand {
		let key: string
		if (field.name.startsWith(arrowVar + '.')) {
			key = field.name.replace(arrowVar + '.', '')
			if (key.includes('.')) {
				key = helper.str.replace(key, '.', '_')
			}
		} else {
			key = field.name
		}
		return new Operand(field.pos, key, OperandType.KeyVal, [field])
	}

	private normalizeInsert (entity: Entity, operand: Operand): void {
		if (operand.children.length === 1) {
			// example: Categories.insert() to: Categories.insert({name:name,description:description})
			const fields = this.createWriteVars(operand.pos, entity, undefined, false, true)
			operand.children.push(fields)
		} else if (operand.children.length === 2 && operand.children[1].type === OperandType.Var) {
			// example: Categories.insert(entity) to: Categories.insert({name:entity.name,description:entity.description})
			operand.children[1] = this.createWriteVars(operand.pos, entity, operand.children[1].name, false, true)
		} else if (operand.children.length === 2 && operand.children[1].type === OperandType.List) {
			// example: Categories.insert([name,description]) to: Categories.insert({name:name,description:description})
			operand.children[1] = this.writeVarsFromList(entity, operand.children[1])
		} else if (operand.children.length === 3 && operand.children[2].type === OperandType.Obj) {
			// example: 'Categories.insert(p=>{name:p.name,description:p.description}) to: Categories.insert({name:name,description:description})
			const variable = operand.children[1].name
			for (const child of operand.children[2].children) {
				child.name = child.name.replace(`${variable}.`, '')
			}
			operand.children[1] = operand.children[2]
			// remove index 2
			operand.children.pop()
		} else if (operand.children.length === 3 && operand.children[2].type === OperandType.List) {
			// example: 'Categories.insert(p=>[p.name,p.description]) to: Categories.insert({name:name,description:description})
			const variable = operand.children[1].name
			for (const child of operand.children[2].children) {
				child.name = child.name.replace(`${variable}.`, '')
			}
			operand.children[1] = this.writeVarsFromList(entity, operand.children[2])
			// remove index 2
			operand.children.pop()
		}
	}

	private normalizeUpdate (entity: Entity, operand: Operand): void {
		if (operand.children.length === 1) {
			// Example: Categories.update() to: Categories.update(p=>{name:name,description:description})
			// In the case that the mapping is not defined, it assumes that the data will be the entity to update
			const variable = new Operand(operand.pos, 'p', OperandType.Var, [], Type.any)
			const fields = this.createWriteVars(operand.pos, entity, undefined, false, true)
			operand.children.push(variable)
			operand.children.push(fields)
		} else if (operand.children.length === 2 && operand.children[1].type === OperandType.Var) {
			// Example: Categories.update(entity) to: Categories.update(p=>{name:entity.name,description:entity.description})
			// In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
			const variable = new Operand(operand.pos, 'p', OperandType.Var, [], Type.any)
			const fields = this.createWriteVars(operand.pos, entity, operand.children[1].name, true)
			operand.children[1] = variable
			operand.children.push(fields)
		} else if (operand.children.length === 2 && operand.children[1].type === OperandType.List) {
			// Example: Categories.update([name, description]) to: Categories.update(p=>{name:name,description:description})
			const variable = new Operand(operand.pos, 'p', OperandType.Var, [], Type.any)
			const fields = this.writeVarsFromList(entity, operand.children[1])
			operand.children[1] = variable
			operand.children.push(fields)
		} else if (operand.children.length === 2 && operand.children[1].type === OperandType.Obj) {
			// Example: Categories.update({ name: entity.name }) to: Categories.update(p=>{name:entity.name})
			const variable = new Operand(operand.pos, 'p', OperandType.Var, [], Type.any)
			const fields = operand.children[1]
			operand.children[1] = variable
			operand.children.push(fields)
		} else if (operand.children.length === 3 && operand.children[2].type === OperandType.Var) {
			if (operand.children[2].name === operand.children[1].name) {
				// Example: Categories.update(p => p) to: Categories.update(p=>{name:name,description:description})
				operand.children[2] = this.createWriteVars(operand.pos, entity, undefined, true)
			} else {
				// Example: Categories.update(p => entity) to: Categories.update(p=>{name:entity.name,description:entity.description})
				operand.children[2] = this.createWriteVars(operand.pos, entity, operand.children[2].name, true)
			}
		} else if (operand.children.length === 3 && operand.children[2].type === OperandType.List) {
			// Example: Categories.update(p=>[name, description]) to: Categories.update(p=>{name:name,description:description})
			operand.children[2] = this.writeVarsFromList(entity, operand.children[2])
		}
	}

	private normalizeDelete (operand: Operand): void {
		if (operand.children.length === 2) {
			// example: Categories.delete(entity) to: Categories.delete().filter(p=>(p.id==entity.id))
			operand.children.pop()
		} else if (operand.children.length === 3) {
			// example: Categories.delete(p => entity) to: Categories.delete().filter(p=>(p.id==entity.id))
			operand.children.pop()
			operand.children.pop()
		}
	}

	private createReadFields (pos:Position, entity: Entity, parent?: string): Operand {
		const obj = new Operand(pos, OperandType.Obj, OperandType.Obj, [])
		for (const property of entity.properties) {
			// const field = new Operand(pos, parent ? parent + '.' + property.name : property.name, OperandType.Var, [], Type.to(property.type))
			const name = parent ? parent + '.' + property.name : property.name
			const field = new Field(pos, entity.name, name, Type.to(property.type), parent, true)
			const type = Type.to(property.type)
			const keyVal = new Operand(pos, property.name, OperandType.KeyVal, [field], type)
			obj.children.push(keyVal)
		}
		return obj
	}

	private createWriteVars (pos:Position, entity: Entity, parent?: string, excludePrimaryKey = false, excludeAutoIncrement = false): Operand {
		const obj = new Operand(pos, OperandType.Obj, OperandType.Obj, [])
		for (const property of entity.properties) {
			if ((!property.autoIncrement || !excludeAutoIncrement) && ((entity.primaryKey !== undefined && !entity.primaryKey.includes(property.name)) || !excludePrimaryKey)) {
				// const field = new Operand(pos, parent ? parent + '.' + property.name : property.name, OperandType.Var, [], Type.to(property.type))
				const name = parent ? parent + '.' + property.name : property.name
				const variable = new Operand(pos, name, OperandType.Var, [], Type.to(property.type))
				const keyVal = new Operand(pos, property.name, OperandType.KeyVal, [variable], Type.to(property.type))
				obj.children.push(keyVal)
			}
		}
		return obj
	}

	private writeVarsFromList (entity: Entity, list:Operand):Operand {
		const obj = new Operand(list.pos, OperandType.Obj, OperandType.Obj, [])
		for (const child of list.children) {
			const property = entity.properties.find(p => p.name === child.name)
			if (property === undefined) {
				throw new Error(`${entity.name}.${child.name} not found`)
			}
			const variable = new Operand(list.pos, property.name, OperandType.Var, [], Type.to(property.type))
			const keyVal = new Operand(list.pos, property.name, OperandType.KeyVal, [variable], Type.to(property.type))
			obj.children.push(keyVal)
		}
		return obj
	}

	private createClauseFilter (entity: Entity, operand: Operand): void {
		if (operand.children.length === 1 || (operand.children.length === 3 && operand.children[2].type === OperandType.Obj)) {
			// Example operand.children.length === 1: Entity.delete()
			// Example operand.children.length === 3:
			// Entity.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			// Aplica al update del include, en el caso del ejemplo seria a: p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })
			const condition = this.createFilter(operand.pos, entity, 'p')
			const arrowVar = new Operand(operand.pos, 'p', OperandType.Var, [])
			operand.children[0] = new Operand(operand.pos, 'filter', OperandType.Arrow, [operand.children[0], arrowVar, condition])
		} else if (operand.children.length === 2 && (operand.children[1].type === OperandType.Var || operand.children[1].type === OperandType.Obj)) {
			// Example operand.children[1].type === OperandType.Var: Entity.update(entity) ,Entity.delete(entity)
			// Example operand.children[1].type === OperandType.Obj: Entity.update({unitPrice:unitPrice,productId:productId})
			// const condition = this.createFilter(entity, 'p', operand.children[1].name)
			const parentVariable = operand.children[1].type === OperandType.Var ? operand.children[1].name : undefined
			const condition = this.createFilter(operand.pos, entity, 'p', parentVariable)
			const arrowVar = new Operand(operand.pos, 'p', OperandType.Var, [])
			operand.children[0] = new Operand(operand.pos, 'filter', OperandType.Arrow, [operand.children[0], arrowVar, condition])
		} else if (operand.children.length === 3 && operand.children[2].type === OperandType.Var) {
			// Example: Categories.delete(p => entity)
			// Example: Categories.delete(p => p )
			const parentVariable = operand.children[1].name !== operand.children[2].name ? operand.children[2].name : undefined
			const condition = this.createFilter(operand.pos, entity, 'p', parentVariable)
			const arrowVar = new Operand(operand.pos, 'p', OperandType.Var, [])
			operand.children[0] = new Operand(operand.pos, 'filter', OperandType.Arrow, [operand.children[0], arrowVar, condition])
		}
	}

	private createFilter (pos:Position, entity: Entity, parent?: string, parentVariable?: string): Operand {
		if (entity.primaryKey === undefined || entity.primaryKey.length === 0) {
			throw new SchemaError(`Entity ${entity.name} cannot be create filter because the primary key is empty`)
		}
		let condition
		for (const name of entity.primaryKey) {
			const field = entity.properties.find(p => p.name === name)
			if (field === undefined) {
				throw new SchemaError(`Entity ${entity.name} not found property ${name} defined in primary key`)
			}
			const fieldOperand = new Operand(pos, parent ? parent + '.' + field.name : field.name, OperandType.Var, [], Type.to(field.type))
			const variableOperand = new Operand(pos, parentVariable ? parentVariable + '.' + name : name, OperandType.Var, [], Type.to(field.type))
			const equal = new Operand(pos, '==', OperandType.Operator, [fieldOperand, variableOperand], Type.boolean)
			condition = condition ? new Operand(pos, '&&', OperandType.Operator, [condition, equal], Type.boolean) : equal
		}
		return condition
	}

	private completeMapInclude (entity: Entity, arrowVar: string, operand: Operand): Operand {
		return this.completeSelectInclude(entity, arrowVar, operand, 'map')
	}

	private completeSelectInclude (entity: Entity, _arrowVar: string, operand: Operand, clause: string): Operand {
		let map: Operand, relation: Relation|undefined
		if (operand.type === OperandType.Arrow) {
			// resuelve el siguiente caso  .includes(details.map(p=>p))
			let current = operand
			while (current) {
				if (current.type === OperandType.Var) {
					// p.details
					const parts = current.name.split('.')
					const relationName = parts[1]
					relation = entity.relations.find(p => p.name === relationName) as Relation
					break
				}
				if (current.children.length > 0) { current = current.children[0] } else { break }
			}
			map = operand// new Node(clause,'childFunc',[operand])
			if (relation === undefined) {
				throw Error('Relation not found')
			}
			this.normalizeSentence(map, relation.entity)
		} else if (operand.type === OperandType.Var) {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en .include(p=> p.details.map(p=>p))
			const varArrowNode = new Operand(operand.pos, 'p', OperandType.Var, [])
			const varAll = new Operand(operand.pos, 'p', OperandType.Var, [])
			const parts = operand.name.split('.')
			const relationName = parts[1]
			relation = entity.relations.find(p => p.name === relationName)
			if (relation === undefined) {
				throw Error('Relation not found')
			}
			map = new Operand(operand.pos, clause, OperandType.Arrow, [operand, varArrowNode, varAll])
			this.normalizeSentence(map, relation.entity)
		} else {
			throw new SintaxisError('Error to add include operand ' + operand.type + ':' + operand.name)
		}
		// add filter with parent
		const clauses: any = this.getClauses(map)
		const childFilter = clauses.filter
		const arrowFilterVar = childFilter ? childFilter.children[1].name : 'p'
		const propertyTo = this.schema.model.getProperty(relation.entity, relation.to)
		const fieldRelation = new Field(operand.pos, relation.entity, arrowFilterVar + '.' + relation.to, Type.to(propertyTo.type))
		// new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping)
		const varRelation = new Operand(operand.pos, 'LambdaOrmParentId', OperandType.Var, [], Type.List(Type.to(propertyTo.type)))
		const filterInclude = new Operand(operand.pos, 'in', OperandType.CallFunc, [fieldRelation, varRelation])
		if (!childFilter) {
			const varFilterArrowNode = new Operand(operand.pos, arrowFilterVar, OperandType.Var, [])
			map.children[0] = new Operand(operand.pos, 'filter', OperandType.Arrow, [map.children[0], varFilterArrowNode, filterInclude])
		} else {
			childFilter.children[0] = new Operand(operand.pos, '&&', OperandType.Operator, [childFilter.children[0], filterInclude])
		}
		// If the column for which the include is to be resolved is not in the select, it must be added
		const arrowSelect = clauses.map.children[1].name
		// const field = new Operand(operand.pos, arrowSelect + '.' + relation.to, OperandType.Var)
		const field = new Field(operand.pos, relation.target as string, arrowSelect + '.' + relation.to, Type.to(propertyTo.type))
		clauses.map.children[2].children.push(new Operand(operand.pos, 'LambdaOrmParentId', OperandType.KeyVal, [field]))
		return map
	}

	private completeBulkInsertInclude (entity: Entity, arrowVar: string, operand: Operand): Operand {
		return this.completeInclude(entity, arrowVar, operand, 'bulkInsert')
	}

	private completeInsertInclude (entity: Entity, arrowVar: string, operand: Operand): Operand {
		return this.completeInclude(entity, arrowVar, operand, 'insert')
	}

	private completeUpdateInclude (entity: Entity, arrowVar: string, operand: Operand): Operand {
		return this.completeInclude(entity, arrowVar, operand, 'update')
	}

	private completeDeleteInclude (entity: Entity, arrowVar: string, operand: Operand): Operand {
		return this.completeInclude(entity, arrowVar, operand, 'delete')
	}

	private getIncludeRelation (entity: Entity, operand: Operand): any {
		if (operand.type === OperandType.CallFunc || operand.type === OperandType.ChildFunc || operand.type === OperandType.Arrow) {
			// resuelve el siguiente caso  .includes(details.insert())
			let current = operand
			while (current) {
				if (current.type === OperandType.Var) {
					// p.details
					const parts = current.name.split('.')
					const relationName = parts[1]
					return entity.relations.find(p => p.name === relationName)
				}
				if (current.children.length > 0) { current = current.children[0] } else { break }
			}
		} else if (operand.type === OperandType.Var) {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
			const parts = operand.name.split('.')
			const relationName = parts[1]
			return entity.relations.find(p => p.name === relationName)
		} else {
			throw new SchemaError('not found relation in include operand ' + operand.type + ':' + operand.name)
		}
	}

	private completeInclude (entity: Entity, _arrowVar: string, operand: Operand, clause: string): Operand {
		if (operand.type === OperandType.Arrow) {
			// resuelve el siguiente caso  .includes(details.insert())
			const relation = this.getIncludeRelation(entity, operand)
			const clauses: any = this.getClauses(operand)
			const clauseOperand = clauses[clause] ? clauses[clause] : new Operand(operand.pos, clause, OperandType.CallFunc, [operand])
			this.normalizeSentence(clauseOperand, relation.entity)
			return clauseOperand
		} else if (operand.type === OperandType.Var) {
			// resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
			// entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
			const relation = this.getIncludeRelation(entity, operand)
			if (!relation) {
				throw new SchemaError(`Relation ${operand.name} not found in ${entity.name}`)
			}
			const clauseOperand = new Operand(operand.pos, clause, OperandType.CallFunc, [operand])
			this.normalizeSentence(clauseOperand, relation.entity)
			return clauseOperand
		} else if (operand.type === OperandType.CallFunc || operand.type === OperandType.ChildFunc) {
			// Example .include(p=>p.details.insert({orderId:orderId,productId:productId,...}))
			// Example .include(p=>p.details.insert())
			const relation = this.getIncludeRelation(entity, operand)
			if (!relation) {
				throw new SchemaError(`Relation ${operand.name} not found in ${entity.name}`)
			}
			this.normalizeSentence(operand, relation.entity)
			return operand
		} else {
			throw new SchemaError('Error to add include operand ' + operand.type + ':' + operand.name)
		}
	}
}
