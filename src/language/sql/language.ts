import {IExecutor,Property,Relation,Index,Operand,Context,Delta,Parameter,ILanguage,IOperandExecutor,IOperandManager,ISchemaBuilder } from './../../model'
import {Node} from './../../parser/index'
import {OperandManager} from '../index'
import { SqlConstant,SqlVariable,SqlField,SqlKeyValue,SqlArray,SqlObject,SqlOperator,SqlFunctionRef,SqlArrowFunction,SqlBlock,
SqlSentence,SqlFrom,SqlJoin,SqlMap,SqlFilter,SqlGroupBy,SqlHaving,SqlSort,SqlInsert,SqlUpdate,SqlDelete,
SqlSentenceInclude,SqlQuery,SqlInclude } from './operands'
import {SchemaHelper} from '../../schema/schemaHelper'
import {SqlDialectMetadata} from './dialectMetadata'


export class SqlEntityContext
{    
    public parent?:SqlEntityContext
    public entity:string
    public alias:string
    public metadata:any
    public children:SqlEntityContext[]
    public joins:any
    public fields:Property[]
    public groupByFields:string[]
    public arrowVar:string
    
    constructor(parent?:SqlEntityContext){        
        this.parent=parent
        if(parent)parent.children.push(this)        
        this.entity=''
        this.alias=''
        this.arrowVar=''
        this.children=[]
        this.joins={}
        this.fields=[]
        this.groupByFields=[]
    }
} 
export class SqlContext
{
    public aliases:any
    public current:SqlEntityContext 
    constructor(current:SqlEntityContext){
        this.current = current
        this.aliases={}
    }
}
export class SqlExecutor implements IOperandExecutor
{
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language;
    }

    public async execute(operand:Operand,context:Context,executor:IExecutor):Promise<any>
    {       
        let query:SqlQuery = operand as SqlQuery
        let result:any;    
        switch(query.name){
            case 'select': result= await this.executeSelect(query,context,executor);break;
            case 'insert': result=  await this.executeInsert(query,context,executor);break;
            case 'update': result=  await this.executeUpdate(query,context,executor);break;
            case 'delete': result=  await this.executeDelete(query,context,executor);break;
            default:  throw `sentence ${query.name} not implemented`;
        }
        return result;
    }
    protected async executeSelect(query:SqlQuery,context:Context,executor:IExecutor):Promise<any>
    {           
        let mainResult = await executor.query(query.sentence,this.params(query.variables,context));
        if(mainResult.length>0){
            for(const p in query.children){
                let include = query.children[p] as SqlSentenceInclude;
                if(!context.contains(include.variable)){
                    let ids:any[] = [];
                    for(let i=0;i< mainResult.length;i++){
                        let id = mainResult[i][include.relation.from];
                        if(!ids.includes(id))
                        ids.push(id)
                    }
                    context.set(include.variable,ids);
                }                
                let includeResult= await this.execute(include.children[0] as SqlQuery,context,executor);
                for(let i=0;i< mainResult.length;i++){
                    let element = mainResult[i];
                    let relationId = element[include.relation.from];
                    element[include.name] = (include.relation.type== 'manyToOne')
                                                            ?includeResult.filter((p:any) => p[include.relation.to] == relationId)
                                                            :includeResult.find((p:any) => p[include.relation.to] == relationId)
                                                            
                }          
            }
        }
        return mainResult;
    }
    protected async executeInsert(query:SqlQuery,context:Context,executor:IExecutor):Promise<number>
    {        
        // before insert the relationships of the type oneToOne and oneToMany
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                switch(include.relation.type){
                    case "oneToOne":
                    case "oneToMany":    
                        let relationContext = new Context(relation,context);
                        let relationId= await this.execute(include.children[0] as SqlQuery,relationContext,executor);
                        context.set(include.relation.from,relationId);
                }
            }
        }        
        //insert main entity
        let insertId = await executor.insert(query.sentence,this.params(query.variables,context));
        if(query.apk!="")
           context.set(query.apk,insertId); 
        // after insert the relationships of the type oneToOne and manyToOne          
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                if(include.relation.type== 'manyToOne'){
                    let parentId = context.get(include.relation.from);
                    let childPropertyName = include.relation.to;
                    for(let i=0;i< relation.length;i++){
                        let child = relation[i];
                        child[childPropertyName]=parentId;
                        let childContext = new Context(child,context);
                        let childId= await this.execute(include.children[0] as SqlQuery,childContext,executor);
                    }       
                }
            }
        }        
        return insertId;
    }
    protected async executeUpdate(query:SqlQuery,context:Context,executor:IExecutor):Promise<any>
    { 
        let changeCount = await executor.update(query.sentence,this.params(query.variables,context));
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i];
                            let childContext = new Context(child,context);
                            let includeResult= await this.execute(include.children[0] as SqlQuery,childContext,executor);
                        }
                        break;
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context);
                        let includeResult= await this.execute(include.children[0] as SqlQuery,childContext,executor);
                        break;
                } 
            }                   
        }        
        return changeCount; 
    }
    protected async executeDelete(query:SqlQuery,context:Context,executor:IExecutor):Promise<any>
    { 
        //before remove relations entities
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i];
                            let childContext = new Context(child,context);
                            let includeResult= await this.execute(include.children[0] as SqlQuery,childContext,executor);
                        }
                        break;
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context);
                        let includeResult= await this.execute(include.children[0] as SqlQuery,childContext,executor);
                        break;
                } 
            }                   
        }
        //remove main entity 
        let changeCount = await executor.delete(query.sentence,this.params(query.variables,context));
        return changeCount;  
    }
    protected  params(variables:string[],context:Context):Parameter[]
    {   
        let params:Parameter[]=[];
        for(const p in variables){
            let variable = variables[p];
            let value = context.get(variable);
            //TODO: ver si se puede determinar el tipo de la variable desde el parser
            // , dado que por valor , podria ser null y no podria determinar que tipo corresponde
            let type="";
            if(Array.isArray(value))
                type='array';
            else
                //TODO: determine if it is integer or decimal  
                type=typeof value;
            params.push({name:variable,type:type,value:value});
        }
        return params;
    }
}
export class SqlSchemaBuilder implements ISchemaBuilder
{    
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language;
    }

    public create(delta:Delta,dialect:string,schema:SchemaHelper):string
    {
        let metadata = this.language.dialects[dialect] as SqlDialectMetadata 
        let sql:string[]=[];
        //removes
        for(const name in delta.changed){
            const newEntity = delta.changed[name].new;
            const oldEntity = delta.changed[name].old;
            this.modifyEntityRemoveIndexes(sql,newEntity,metadata);
            this.modifyEntityRemoveConstraint(sql,newEntity,metadata);
        }
        for(const name in delta.remove){
            const oldEntity = delta.remove[name].old;
            this.removeEntity(sql,oldEntity,metadata);
        }
        // create entities
        for(const name in delta.new){
            const newEntity = delta.new[name].new;
            this.createEntity(sql,schema,newEntity,metadata);
        }
        // alter and remove columns
        for(const name in delta.changed){
            const newEntity = delta.changed[name].new;
            const oldEntity = delta.changed[name].old;
            this.modifyEntityAlterAndAddColumns(sql,newEntity,metadata);
            this.modifyEntityRemoveColumns(sql,newEntity,metadata);
        }
        // create news constraints      
        for(const name in delta.changed){
            const newEntity = delta.changed[name].new;
            const oldEntity = delta.changed[name].old;
            this.modifyEntityAddConstraint(sql,schema,newEntity,metadata);
        }
        for(const name in delta.new){
            const newEntity = delta.new[name].new;
            this.createEntityCreateFk(sql,schema,newEntity,metadata);
        }
        // create new indexes
        for(const name in delta.changed){
            const newEntity = delta.changed[name].new;
            const oldEntity = delta.changed[name].old;
            this.modifyEntityCreateIndexes(sql,newEntity,metadata);
        }
        for(const name in delta.new){
            const newEntity = delta.new[name].new;
            this.createEntityCreateIndexes(sql,newEntity,metadata);
        }
        
        let separator = metadata.other('sepatatorSql');
        return sql.join(separator)+separator;
    }

    private createEntity(sql:string[],schema:SchemaHelper,entity:any,metadata:SqlDialectMetadata):void
    {
        let define:string[]=[];
        for(const name in entity.property){
            define.push('\n\t'+this.createColumn(entity.property[name],metadata));
        }
        if(entity.primaryKey && entity.primaryKey.length > 0){
            define.push('\n\t'+this.createPk(entity,metadata));
        }
        if(entity.uniqueKey && entity.uniqueKey.length > 0){
            define.push('\n\t'+this.createUk(entity,metadata));
        }

        let text = metadata.ddl('createTable');
        text =text.replace('{name}',entity.mapping);
        text =text.replace('{define}',define.join(','));

        sql.push('\n'+text);
    }
    private createEntityCreateFk(sql:string[],schema:SchemaHelper,entity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);
        if(entity.relation)
        for(const name in entity.relation)
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,entity.relation[name],metadata));

        for(const name in entity.relation.changed){
            const _new = entity.relation.changed[name].new;
            const old = entity.relation.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,_new,metadata)); 
        }
    }
    private createEntityCreateIndexes(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        if(entity.uniqueKey && entity.uniqueKey.length > 0)
            sql.push('\n'+this.createUkIndex(entity,metadata));            
        if(entity.index)
            for(const name in entity.index)
                sql.push('\n'+this.createIndex(entity,entity.index[name],metadata));
    }
    private modifyEntity(sql:string[],schema:SchemaHelper,entity:any,oldEntity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);

        //remove indexes
        for(const name in entity.index.remove){
            const old = entity.index.remove[name].old;
            sql.push('\n'+this.dropIndex(entity,old,metadata));
        }

        //remove constraint
        for(const name in entity.uniqueKey.remove){
            const old = entity.uniqueKey.remove.old;
            sql.push('\n'+alterEntity+' '+this.dropUk(old,metadata));
            sql.push('\n'+this.dropUkIndex(entity,metadata));  
        }
        for(const name in entity.uniqueKey.changed){
            const _new = entity.uniqueKey.changed[name].new;
            const old = entity.uniqueKey.changed[name].old;
            sql.push('\n'+this.dropUkIndex(entity,metadata)); 
            sql.push('\n'+alterEntity+' '+this.dropUk(old,metadata));
        }
        for(const name in entity.primaryKey.remove){
            const old = entity.primaryKey.remove.old;
            sql.push('\n'+alterEntity+' '+this.dropPk(old,metadata));
        }
        for(const name in entity.primaryKey.changed){
            const _new = entity.primaryKey.changed[name].new;
            const old = entity.primaryKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.dropPk(old,metadata));
        }
        for(const name in entity.relation.remove){
            const old = entity.relation.remove[name].old;
            sql.push('\n'+alterEntity+' '+this.dropFk(old,metadata));
        }
        for(const name in entity.relation.changed){
            const _new = entity.relation.changed[name].new;
            const old = entity.relation.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.dropFk(old,metadata));
        }

        //remove columns
        for(const name in entity.property.remove){
            const old = entity.property.remove[name].old;
            sql.push('\n'+alterEntity+' '+this.dropColumn(old,metadata));
        }
        //add and alter columns
        for(const name in entity.property.new){
            const _new = entity.property.new[name].new;
            sql.push('\n'+alterEntity+' '+this.addColumn(_new,metadata));  
        }
        for(const name in entity.property.changed){
            const _new = entity.property.changed[name].new;
            const old = entity.property.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.alterColumn(_new,metadata));
        }
        //add constraints
        for(const name in entity.primaryKey.new){
            const _new = entity.primaryKey.new;
            sql.push('\n'+alterEntity+' '+this.addPk(_new,metadata));  
        }
        for(const name in entity.primaryKey.changed){
            const _new = entity.primaryKey.changed[name].new;
            const old = entity.primaryKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addPk(_new,metadata)); 
        }
        for(const name in entity.uniqueKey.new){
            const _new = entity.uniqueKey.new;
            sql.push('\n'+alterEntity+' '+this.addUk(_new,metadata));
            sql.push('\n'+this.createUkIndex(entity,metadata));   
        }
        for(const name in entity.uniqueKey.changed){
            const _new = entity.uniqueKey.changed[name].new;
            const old = entity.uniqueKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addUk(_new,metadata));
            sql.push('\n'+this.createUkIndex(entity,metadata));  
        }
        for(const name in entity.relation.new){
            const _new = entity.relation.new[name].new;
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,_new,metadata));  
        }
        for(const name in entity.relation.changed){
            const _new = entity.relation.changed[name].new;
            const old = entity.relation.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,_new,metadata)); 
        }
        //create indexes
        for(const name in entity.index.new){
            const _new = entity.index.new[name].new;
            sql.push('\n'+this.createIndex(entity,_new,metadata));
        }
        for(const name in entity.index.changed){
            const _new = entity.index.changed[name].new;
            const old = entity.index.changed[name].old;
            sql.push('\n'+this.dropIndex(entity,old,metadata));
            sql.push('\n'+this.createIndex(entity,_new,metadata));
        } 
    }
    private modifyEntityRemoveColumns(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);
        for(const name in entity.property.remove){
            const old = entity.property.remove[name].old;
            sql.push('\n'+alterEntity+' '+this.dropColumn(old,metadata));
        }
    }
    private modifyEntityAlterAndAddColumns(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);
        for(const name in entity.property.new){
            const _new = entity.property.new[name].new;
            sql.push('\n'+alterEntity+' '+this.addColumn(_new,metadata));  
        }
        for(const name in entity.property.changed){
            const _new = entity.property.changed[name].new;
            const old = entity.property.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.alterColumn(_new,metadata));
        }
    }
    private modifyEntityRemoveIndexes(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        for(const name in entity.index.remove){
            const old = entity.index.remove[name].old;
            sql.push('\n'+this.dropIndex(entity,old,metadata));
        }
        for(const name in entity.uniqueKey.remove){
            sql.push('\n'+this.dropUkIndex(entity,metadata)); 
        }
        for(const name in entity.uniqueKey.changed){
            sql.push('\n'+this.dropUkIndex(entity,metadata)); 
        }       
    }
    private modifyEntityRemoveConstraint(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);

        for(const name in entity.uniqueKey.remove){
            const old = entity.uniqueKey.remove.old;
            sql.push('\n'+alterEntity+' '+this.dropUk(old,metadata));
            sql.push('\n'+this.dropUkIndex(entity,metadata));  
        }
        for(const name in entity.uniqueKey.changed){
            const _new = entity.uniqueKey.changed[name].new;
            const old = entity.uniqueKey.changed[name].old;
            sql.push('\n'+this.dropUkIndex(entity,metadata)); 
            sql.push('\n'+alterEntity+' '+this.dropUk(old,metadata));
        }
        for(const name in entity.primaryKey.remove){
            const old = entity.primaryKey.remove.old;
            sql.push('\n'+alterEntity+' '+this.dropPk(old,metadata));
        }
        for(const name in entity.primaryKey.changed){
            const _new = entity.primaryKey.changed[name].new;
            const old = entity.primaryKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.dropPk(old,metadata));
        }
        for(const name in entity.relation.remove){
            const old = entity.relation.remove[name].old;
            sql.push('\n'+alterEntity+' '+this.dropFk(old,metadata));
        }
        for(const name in entity.relation.changed){
            const _new = entity.relation.changed[name].new;
            const old = entity.relation.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.dropFk(old,metadata));
        }
    }
    private modifyEntityAddConstraint(sql:string[],schema:SchemaHelper,entity:any,metadata:SqlDialectMetadata):void
    {
        const alterEntity = metadata.ddl('alterTable').replace('{name}',entity.mapping);

        //add constraints
        for(const name in entity.primaryKey.new){
            const _new = entity.primaryKey.new;
            sql.push('\n'+alterEntity+' '+this.addPk(_new,metadata));  
        }
        for(const name in entity.primaryKey.changed){
            const _new = entity.primaryKey.changed[name].new;
            const old = entity.primaryKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addPk(_new,metadata)); 
        }
        for(const name in entity.uniqueKey.new){
            const _new = entity.uniqueKey.new;
            sql.push('\n'+alterEntity+' '+this.addUk(_new,metadata));
        }
        for(const name in entity.uniqueKey.changed){
            const _new = entity.uniqueKey.changed[name].new;
            const old = entity.uniqueKey.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addUk(_new,metadata));
        }
        for(const name in entity.relation.new){
            const _new = entity.relation.new[name].new;
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,_new,metadata));  
        }
        for(const name in entity.relation.changed){
            const _new = entity.relation.changed[name].new;
            const old = entity.relation.changed[name].old;
            sql.push('\n'+alterEntity+' '+this.addFk(schema,entity,_new,metadata)); 
        }
    }
    private modifyEntityCreateIndexes(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {
        for(const name in entity.uniqueKey.new){
            const _new = entity.uniqueKey.new;
            sql.push('\n'+this.createUkIndex(entity,metadata));   
        }
        for(const name in entity.uniqueKey.changed){
            const _new = entity.uniqueKey.changed[name].new;
            const old = entity.uniqueKey.changed[name].old;
            sql.push('\n'+this.createUkIndex(entity,metadata));  
        }
        for(const name in entity.index.new){
            const _new = entity.index.new[name].new;
            sql.push('\n'+this.createIndex(entity,_new,metadata));
        }
        for(const name in entity.index.changed){
            const _new = entity.index.changed[name].new;
            const old = entity.index.changed[name].old;
            sql.push('\n'+this.createIndex(entity,_new,metadata));
        }       
    }
    private removeEntity(sql:string[],entity:any,metadata:SqlDialectMetadata):void
    {  
        let text = metadata.ddl('dropTable');
        text =text.replace('{name}',entity.mapping);

        sql.push('\n'+text);
        if(entity.uniqueKey && entity.uniqueKey.length > 0)
            sql.push('\n'+this.dropUkIndex(entity,metadata));            
        if(entity.index)
            for(const name in entity.index)
                sql.push('\n'+this.dropIndex(entity,entity.index[name],metadata));
    }
    private createColumn(property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
        let autoincrement = property.autoincrement?metadata.other("autoincrement"):"";

        let text = metadata.ddl('createColumn');
        text =text.replace('{name}',property.mapping as string);
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        text =text.replace('{autoincrement}',autoincrement);
        return text;
    }
    private createPk(entity:any,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<entity.primaryKey.length;i++){
            const column = entity.property[entity.primaryKey[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('createPk');
        text =text.replace('{name}',entity.mapping+'_PK');
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private createUk(entity:any,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<entity.uniqueKey.length;i++){
            const column = entity.property[entity.uniqueKey[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('createUk');
        text =text.replace('{name}',entity.mapping+'_UK');
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private createFk(schema:SchemaHelper,entity:any,relation:Relation,metadata:SqlDialectMetadata):string
    {
        let column = entity.property[relation.from];
        let fEntity = schema.getEntity(relation.entity);
        let fColumn = fEntity.property[relation.to];

        let text = metadata.ddl('createFk');
        text =text.replace('{name}',relation.name);
        text =text.replace('{column}',column.mapping);
        text =text.replace('{fTable}',fEntity.mapping);
        text =text.replace('{fColumn}',fColumn.mapping);
        return text;
    }
    private createIndex(entity:any,index:Index,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<index.fields.length;i++){
            const column = entity.property[index.fields[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('createIndex');
        text =text.replace('{name}',entity.mapping+'_'+index.name);
        text =text.replace('{table}',entity.mapping);
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private createUkIndex(entity:any,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<entity.uniqueKey.length;i++){
            const column = entity.property[entity.uniqueKey[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('createIndex');
        text =text.replace('{name}',entity.mapping+'_UK');
        text =text.replace('{table}',entity.mapping);
        text =text.replace('{columns}',columns.join(','));
        return text;
    }    
    private alterColumn(property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
        let autoincrement = property.autoincrement?metadata.other("autoincrement"):"";

        let text = metadata.ddl('alterColumn');
        text =text.replace('{name}',property.mapping as string);
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        text =text.replace('{autoincrement}',autoincrement);
        return text;
    }
    private addColumn(property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
        let autoincrement = property.autoincrement?metadata.other("autoincrement"):"";

        let text = metadata.ddl('addColumn');
        text =text.replace('{name}',property.mapping as string);
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        text =text.replace('{autoincrement}',autoincrement);
        return text;
    }
    private addPk(entity:any,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<entity.primaryKey.length;i++){
            const column = entity.property[entity.primaryKey[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('addPk');
        text =text.replace('{name}',entity.mapping+'_PK');
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private addUk(entity:any,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<entity.uniqueKey.length;i++){
            const column = entity.property[entity.uniqueKey[i]];
            columns.push(columnTemplate.replace('{name}',column.mapping));
        }
        let text = metadata.ddl('addUk');
        text =text.replace('{name}',entity.mapping+'_UK');
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private addFk(schema:SchemaHelper,entity:any,relation:Relation,metadata:SqlDialectMetadata):string
    {
        let column = entity.property[relation.from];
        let fEntity = schema.getEntity(relation.entity);
        let fColumn = fEntity.property[relation.to];

        let text = metadata.ddl('addFk');
        text =text.replace('{name}',relation.name);
        text =text.replace('{column}',column.mapping);
        text =text.replace('{fTable}',fEntity.mapping);
        text =text.replace('{fColumn}',fColumn.mapping);
        return text;
    }    
    private dropColumn(property:Property,metadata:SqlDialectMetadata):string
    {  
        let text = metadata.ddl('dropColumn');
        text =text.replace('{name}',property.mapping as string);
        return text;
    }
    private dropPk(entity:any,metadata:SqlDialectMetadata):string
    {  
        let text = metadata.ddl('dropPk');
        text =text.replace('{name}',entity.mapping+'_PK');
        return text;
    }
    private dropUk(entity:any,metadata:SqlDialectMetadata):string
    {  
        let text = metadata.ddl('dropPk');
        text =text.replace('{name}',entity.mapping+'_UK');
        return text;
    }
    private dropFk(relation:Relation,metadata:SqlDialectMetadata):string
    {  
        let text = metadata.ddl('dropPk');
        text =text.replace('{name}',relation.name);
        return text;
    }
    private dropIndex(entity:any,index:Index,metadata:SqlDialectMetadata):string
    {      
        let text = metadata.ddl('dropIndex');
        text =text.replace('{name}',entity.mapping+'_'+index.name);
        return text;
    }
    private dropUkIndex(entity:any,metadata:SqlDialectMetadata):string
    {       
        let text = metadata.ddl('dropIndex');
        text =text.replace('{name}',entity.mapping+'_UK');
        return text;
    }
}
export class SqlOperandManager extends OperandManager
{   
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        super();
        this.language=language;
    }
    
    public build(node:Node,dialect:string,schema:SchemaHelper):Operand
    {
        try{
            let operand = this.nodeToOperand(node,schema,new SqlContext(new SqlEntityContext()));
            operand = this.reduce(operand);
            let metadata = this.language.dialects[dialect] as SqlDialectMetadata 
            let sqlSquery = this.createQuery(operand as SqlSentence,metadata);            
            return this.setParent(sqlSquery);
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    public sql(operand:Operand):string
    {          
        let query= operand as SqlQuery
        let mainQuery = query.sentence+';';
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let includemainQuery= this.sql(include.children[0]);
            mainQuery= mainQuery+'\n'+includemainQuery
        }
        return mainQuery;
    }
    public model(operand:Operand):any
    {
        let query= operand as SqlQuery
        let result:any = {}
        for(let i=0;i<query.columns.length;i++){
            let column = query.columns[i]
            result[column.name]=column.type
        }       
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let childsSchema = this.model(include.children[0]);
            if(include.relation.type == 'manyToOne'){
                result[include.name] = [childsSchema]
            }else{
                result[include.name]= childsSchema;
            }
        }
        return result;
    }
    protected reduce(operand:Operand):Operand
    {
        return operand
    }
    protected createQuery(sqlSentence:SqlSentence,metadata:SqlDialectMetadata):SqlQuery
    { 
       let children=[];
       let includes = sqlSentence.getIncludes();       
       for(const p in includes){          
          let include =  includes[p] as SqlSentenceInclude;
          let query = this.createQuery(include.children[0] as SqlSentence,metadata);
          let sqlInclude = new SqlInclude(include.name,[query],include.relation,include.variable); 
          children.push(sqlInclude);            
       }
       let sentence = sqlSentence.build(metadata);
       return new SqlQuery(sqlSentence.name,children,sentence,sqlSentence.entity,sqlSentence.apk,sqlSentence.columns,sqlSentence.variables);
    }   
    protected _serialize(operand:Operand):any
    {
        let children = [];    
        if(operand instanceof SqlQuery){
            let query = operand as SqlQuery;
            for(const k in query.children){
                children.push(this._serialize(query.children[k]));
            }
            return {n:query.name,t:query.constructor.name,c:children,s:query.sentence,cols:query.columns,v:query.variables,e:query.entity,apk:query.apk};
        }else if(operand instanceof SqlInclude){
            let include = operand as SqlInclude;
            for(const k in include.children){
                children.push(this._serialize(include.children[k]));
            }
            return {n:include.name,t:include.constructor.name,c:children,r:include.relation,v:include.variable}; 
        }
    }
    protected _deserialize(serialized:any):Operand
    {
        throw 'NotImplemented';
    }
    protected createAlias(context:SqlContext,name:string,relation?:string):string
    {
        let c= name.charAt(0).toLowerCase();
        let alias = c;
        for(let i=1;context.aliases[alias];i++)alias=alias+i;
        context.aliases[alias] = relation?relation:name;
        return alias;        
    }    
    protected createOperand(node:Node,children:Operand[],schema:SchemaHelper,context:SqlContext):Operand
    {
        switch(node.type){
            case 'const':
                return new SqlConstant(node.name,children);
            case 'var':
                let parts = node.name.split('.');
                if(parts[0] == context.current.arrowVar){
                    if(parts.length == 1){
                        // TODO, aqui se deberia retornar el array de fields 
                        return new SqlField(context.current.alias+'.*','any'); 
                    }
                    else if(parts.length == 2){
                        let _field = context.current.fields.find(p=> p.name == parts[1])
                        if(_field){ 
                            return new SqlField(_field.name,_field.type);                          
                        }else{                            
                            if(schema.existsProperty(context.current.entity,parts[1])){
                                let property= schema.getProperty(context.current.entity,parts[1]);
                                return new SqlField(context.current.alias+'.'+property.mapping,property.type); 
                            }else{
                                let relationInfo= schema.getRelation(context.current.entity,parts[1]);
                                if(relationInfo){
                                    let relation =  this.addJoins(parts,parts.length,context); 
                                    let relationAlias=context.current.joins[relation];
                                    // TODO, aqui se deberia retornar el array de fields 
                                    return new SqlField(relationAlias+'.*','any'); 
                                }else{
                                    throw 'Property '+parts[1]+' not fount in '+context.current.entity;
                                }

                            }                            
                        } 
                    }else{
                        let propertyName = parts[parts.length-1];
                        let relation =  this.addJoins(parts,parts.length-1,context); 
                        let info = schema.getRelation(context.current.entity,relation);                        
                        let relationAlias=context.current.joins[relation];
                        let property = info.relationSchema.property[propertyName]; 
                        if(property){
                            return new SqlField(relationAlias+'.'+property.mapping,property.type);
                        }else{
                            let relationName = info.relationSchema.relation[propertyName];
                            if(relationName){
                                let relation2 =  this.addJoins(parts,parts.length,context);
                                let relationAlias2=context.current.joins[relation2];
                                // TODO, aqui se deberia retornar el array de fields                                
                                return new SqlField(relationAlias2+'.*','any');
                            }else{
                                throw 'Property '+propertyName+' not fount in '+relation;
                            } 
                        }
                    }
                }
                else
                    return new  SqlVariable(node.name,children);                           
            case 'keyVal':
                return new SqlKeyValue(node.name,children);
            case 'array':
                return new SqlArray(node.name,children);
            case 'obj':
                return new SqlObject(node.name,children);
            case 'oper':
                return new SqlOperator(node.name,children);
            case 'funcRef':
                return new SqlFunctionRef(node.name,children);
            case 'block':
                return  new SqlBlock(node.name,children);
            default:
                throw 'node name: '+node.name +' type: '+node.type+' not supported';
        }
    }    
    protected createArrowFunction(node:Node,children:Operand[]):Operand
    {
        try{
            switch(node.name){
                case 'map': 
                case 'first': 
                    return new SqlMap(node.name,children);
                case 'filter': 
                    return new SqlFilter(node.name,children);
                case 'having': 
                    return new SqlHaving(node.name,children);
                case 'sort': 
                    return new SqlSort(node.name,children);
                case 'insert': return new SqlInsert(node.name,children);
                // case 'insertFrom': return new SqlInsertFrom(node.name,children);
                case 'update': return new SqlUpdate(node.name,children);
                // case 'updateFrom': return new SqlUpdateFrom(node.name,children);
                case 'delete': return new SqlDelete(node.name,children);
                default:
                    throw'arrow function : '+node.name+' not supported'; 
            }            
        } 
        catch(error){
            throw'cretae arrow function: '+node.name+' error: '+error.toString(); 
        }
    }
    protected createClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {        
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],schema,context);
        return this.createArrowFunction(clause,[child]);
    }
    protected createInsertClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {   
        if(clause.children.length== 1){
            let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
            let child = this.nodeToOperand(fields,schema,context);
            return new SqlInsert(context.current.metadata.mapping,[child]);
        }else if(clause.children.length== 2){
            let child = this.nodeToOperand(clause.children[1],schema,context);
            return new SqlInsert(context.current.metadata.mapping,[child]);
        }
        // }else if(clause.children.length== 3){
        //     context.current.arrowVar = clause.children[1].name;                    
        //     let child = this.nodeToOperand(clause.children[2],schema,context);           
        //     return new SqlInsert(context.current.metadata.mapping,[child]);
        // } 

        // if(operand.children.length== 0){
        //     //Orders.insert() 
        //     let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
        //     let child = this.nodeToOperand(fields,schema,context);
        //     operand.children.push(child);
        // }
        // else if(operand.children[0] instanceof SqlVariable){
        //      //Orders.insert(entity)
        //     let fields = this.createNodeFields(context.current.entity,schema,operand.children[0].name,false,true)
        //     operand.children[0] = this.nodeToOperand(fields,schema,context);
        // }
        throw 'Sentence Insert incorrect!!!';
    }
    protected createUpdateClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {      
        if(clause.children.length== 1){
            //Orders.update()
            // In the case that the mapping is not defined, it assumes that the context will be the entity to update
            let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
            let child = this.nodeToOperand(fields,schema,context);
            return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);

        }else if(clause.children.length== 2){
            let child:Operand;
            if(clause.children[1].type == 'var'){
                //Orders.update(entity) 
                // In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
                let fields = this.createNodeFields(context.current.entity,schema,clause.children[1].name,true);
                child = this.nodeToOperand(fields,schema,context);
            }else if(clause.children[1].type == 'obj'){
                //Orders.update({name:'test'}) 
                child = this.nodeToOperand(clause.children[1],schema,context);
            }
            else{
                throw 'Args incorrect in Sentence Update'; 
            }
            return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
        }
        // else if(clause.children.length== 3){
        //     context.current.arrowVar = clause.children[1].name;                    
        //     let child = this.nodeToOperand(clause.children[2],schema,context);           
        //     return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
        // }
        throw 'Sentence Update incorrect!!!';
    }
    protected createMapClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {
        if(clause.children.length==3){
            context.current.arrowVar = clause.children[1].name;
            let fields = clause.children[2];
            let child =null;
            if(fields.children.length==0 && fields.name == context.current.arrowVar){
                let fields = this.createNodeFields(context.current.entity,schema,'p')
                child = this.nodeToOperand(fields,schema,context);
            }else{
                child = this.nodeToOperand(clause.children[2],schema,context);
            }  
            return this.createArrowFunction(clause,[child]);
        }else{
            context.current.arrowVar = 'p';
            let fields = this.createNodeFields(context.current.entity,schema,'p')
            let child = this.nodeToOperand(fields,schema,context);
            return this.createArrowFunction(clause, [child]);
        }
    }
    protected createNodeFields(entityName:string,schema:SchemaHelper,parent?:string,excludePrimaryKey:boolean=false,excludeAutoincrement:boolean=false):any
    {
        let obj = new Node('obj', 'obj', []);
        let entity=schema.getEntity(entityName);
        for(let name in entity.property){
            let property = entity.property[name];
            if((!property.autoincrement || !excludeAutoincrement) && (!entity.primaryKey.includes(property.name) || !excludePrimaryKey) ){
                let field = new Node(parent?parent+'.'+name:name, 'var', []);
                let keyVal = new Node(name, 'keyVal', [field])
                obj.children.push(keyVal);
            }
        }
        return obj;
    }
    /**
     * In the case that a filter is not defined, it is assumed that it will be filtered by the PK
     * @param clause 
     * @param children 
     * @param schema 
     * @param context 
     */
    protected createFilterIfNotExists(clause:Node,children:Operand[],schema:SchemaHelper,context:SqlContext)
    {       
        if(!children.some(p=> p.name=='filter')){ 
            let filter:Operand; 
            if(clause.children.length== 1 )
                //Orders.delete() 
                filter = this.createFilter(context.current.entity,schema,context);
            else if(clause.children.length== 2 && clause.children[1].type == 'var')
                //Orders.delete(entity)
                filter = this.createFilter(context.current.entity,schema,context,clause.children[1].name);    
            else
                throw 'Sentence without filter is wrong!!!';
            children.push(filter);
        }        
    }
    protected createFilter(entityName:string,schema:SchemaHelper,context:SqlContext,parent?:string):any
    {
        let condition = undefined;
        let entity=schema.getEntity(entityName);
        for(let i in entity.primaryKey){ 
            let name = entity.primaryKey[i]; 
            let field = entity.property[name];
            let sqlField = new SqlField(parent?parent + '.' + field.mapping:field.mapping,field.type);
            let variable = new SqlVariable(name);
            let equal =new SqlOperator('==', [sqlField,variable]);
            condition =condition?new SqlOperator('&&', [condition,equal]):equal;
        }
        if(condition){
            return new SqlFilter('filter',[condition]);
        }
        throw 'Create Filter incorrect!!!';
    }
    protected createSelectInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if(node.type =='arrow'){
            //resuelve el siguiente caso  .includes(details.map(p=>p))     
            let current = node;
            while (current) {
                if(current.type == 'var'){
                    //p.details
                    let parts = current.name.split('.');
                    relationName=parts[1];
                    relation = context.current.metadata.relation[relationName];                            
                    current.name = relation.entity;
                    break;
                }
                if (current.children.length > 0)
                    current = current.children[0];
                else
                    break;
            }
            child = this.createSentence(node, schema, context);
        } else if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en .include(p=> p.details.map(p=>p))      
            let varArrow = new Node('p', 'var', []);
            let varAll = new Node('p', 'var', []);
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('map','arrow',[node,varArrow,varAll]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let toEntity=schema.getEntity(relation.entity);
        let toField = toEntity.property[relation.to];
        let fieldRelation = new SqlField(child.alias + '.' + toField.mapping,toField.type);
        let variableName = 'list_'+relation.to;
        let varRelation = new SqlVariable(variableName);
        let filterInclude =new SqlFunctionRef('includes', [fieldRelation,varRelation]);
        let childFilter= child.children.find(p=> p.name == 'filter');
        if(!childFilter){
            let childFilter = new SqlFilter('filter',[filterInclude]);
            child.children.push(childFilter);
        }else{
            childFilter.children[0] =new SqlOperator('&&', [childFilter.children[0],filterInclude]);
        }
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createInsertInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en Details.insert()      
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('insert','childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let variableName = relation.to;
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createUpdateInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en Details.update()      
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('update','childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let variableName = relation.to;
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createDeleteInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details) 
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('delete','childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        }
        return new SqlSentenceInclude(relationName,[child],relation,relation.to);
    } 
    protected createSentence(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentence
    {
        context.current = new SqlEntityContext(context.current)
        let createInclude:any;
        let sentence:any = {}; 
        let current = node;
        while(current){
            let name =current.type == 'var'?'from':current.name;
            sentence[name] =  current;
            if(current.children.length > 0)
                current = current.children[0]
            else
                break;  
        }            
        context.current.entity=sentence.from.name;
        context.current.metadata=schema.getEntity(context.current.entity);
        context.current.alias = this.createAlias(context,context.current.entity);
        let apk =  schema.getApk(context.current.entity);
        let name:string = "";           
        let children = [];
        let operand= null;

        if(sentence['filter'] ){
            let clause = sentence['filter'];
            operand = this.createClause(clause,schema,context);
            children.push(operand);
        }
        if(sentence['from']){
            let tableName = context.current.metadata.mapping;// schema.entityMapping(clause.name);
            operand =new SqlFrom(tableName+'.'+context.current.alias);
            children.push(operand);
        }
        if(sentence['deleteAll']){
            // Only the DeleteAll can be an unfiltered delete.
            // this is done for security to avoid deleting all records if the filter is forgotten
            name='delete';
            let clause = sentence['deleteAll'];
            operand =new SqlDelete(context.current.metadata.mapping+'.'+context.current.alias);
        }else if(sentence['delete']){
            name='delete';
            createInclude= this.createDeleteInclude;
            let clause = sentence['delete'];
            this.createFilterIfNotExists(clause,children,schema,context);
            operand =new SqlDelete(context.current.metadata.mapping+'.'+context.current.alias);
            children.push(operand);             
        }else if (sentence['insert']){
            name='insert';
            createInclude= this.createInsertInclude;
            let clause = sentence['insert'] as Node;
            operand= this.createInsertClause(clause,schema,context);
            context.current.fields = this.solveFieldsInModify(operand,context);
            children.push(operand);
        }else if (sentence['updateAll']){
            // Only the updateAll can be an unfiltered update.
            // this is done for security to avoid updated all records if the filter is forgotten
            name='update';
            let clause = sentence['updateAll'] as Node;
            operand= this.createUpdateClause(clause,schema,context);
            context.current.fields = this.solveFieldsInModify(operand,context);
            children.push(operand);            
        }else if (sentence['update']){
            name='update';
            createInclude= this.createUpdateInclude;
            let clause = sentence['update'] as Node;           
            operand= this.createUpdateClause(clause,schema,context);
            context.current.fields = this.solveFieldsInModify(operand,context);
            this.createFilterIfNotExists(clause,children,schema,context);
            children.push(operand);            
        }else{
            name='select';
            createInclude= this.createSelectInclude;
            if(sentence['map'] || sentence['first']){
                let clause = sentence['first']?sentence['first']:sentence['map'];
                operand = this.createMapClause(clause,schema,context);
                context.current.fields = this.fieldsInSelect(operand);
                context.current.groupByFields = this.groupByFields(operand);
                children.push(operand); 
            }else{
                let varEntity = new Node(context.current.entity, 'var', []);
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []);               
                let clause = new Node('map','arrow',[varEntity,varArrow,varAll]);
                operand = this.createMapClause(clause,schema,context);
                context.current.fields = this.fieldsInSelect(operand);
                context.current.groupByFields = this.groupByFields(operand);
                children.push(operand); 
            }
            if(context.current.groupByFields.length>0){
                let fields = [];
                for(let i=0;i<context.current.groupByFields.length;i++){
                    fields.push( this.clone(context.current.groupByFields[i]));
                }
                if(fields.length==1){
                    operand = new SqlGroupBy('groupBy',fields);
                }else{
                    let array:Operand = new SqlArray('array',fields);
                    operand = new SqlGroupBy('groupBy',[array]);
                } 
                children.push(operand); 
            }
            if(sentence['having']){
                let clause = sentence['having'];
                operand = this.createClause(clause,schema,context);
                children.push(operand); 
            }
            if(sentence['sort'] ){
                let clause = sentence['sort'];
                operand = this.createClause(clause,schema,context);
                children.push(operand); 
            }
        }
        if(sentence['include']){
            if(createInclude===undefined)
               throw 'Include not implemented!!!';

            let clause = sentence['include'];                
            context.current.arrowVar = clause.children[1].name; 
            let body = clause.children[2];                
            if (body.type == 'array'){
                for (let i=0; i< body.children.length;i++) {
                    let include = createInclude.bind(this)(body.children[i],schema,context)
                    children.push(include);
                }
            }
            else{
                let include = createInclude.bind(this)(body,schema,context)
                children.push(include);    
            }
        }
        for(const key in context.current.joins){

            let info = schema.getRelation(context.current.entity,key);

            let relatedAlias = info.previousRelation!=''?context.current.joins[info.previousRelation]:context.current.alias;   
            let relatedProperty = info.previousSchema.property[info.relationData.from];
            let relationTable = info.relationSchema.name;
            let relationAlias =context.current.joins[key];;
            let relationProperty = info.relationSchema.property[info.relationData.to];

            let relatedField = new SqlField(relatedAlias+'.'+relatedProperty.mapping,relatedProperty.type);
            let relationField = new SqlField(relationAlias+'.'+relationProperty.mapping,relationProperty.type); 
            let equal = new SqlOperator('==',[relationField,relatedField])
            operand = new SqlJoin(relationTable+'.'+relationAlias,[equal]);
            children.push(operand);   
        }
        let sqlSentence = new SqlSentence(name,children,context.current.entity,apk,context.current.alias,context.current.fields);
        context.current = context.current.parent?context.current.parent as SqlEntityContext:new SqlEntityContext()
        return sqlSentence   
    }
    protected nodeToOperand(node:Node,schema:SchemaHelper,context:SqlContext):Operand
    {
        if(node.type == 'arrow' || node.type == 'childFunc' ){
            return this.createSentence(node,schema,context);
        }else{
            let children = this.childrenToOperands(node.children,schema,context);
            return this.createOperand(node,children,schema,context);
        }
    }
    protected childrenToOperands(children:Node[],schema:SchemaHelper,context:SqlContext):Operand[]
    {
        let operands:Operand[] = [];
        if(children){
            for(const k in children){
                let p = children[k];
                let child = this.nodeToOperand(p,schema,context);
                operands.push(child);
            }
        }
        return operands
    }
    protected addJoins(parts:string[],to:number,context:SqlContext):string
    {
        let relation = '';
        for(let i=1;i<to;i++){
            relation= (i>1?relation+'.':'')+parts[i];
            if(!context.current.joins[relation]){
                context.current.joins[relation] = this.createAlias(context,parts[i],relation);
            }
        }
        return relation;
    }    
    protected groupByFields(operand:Operand):string[]
    {
        let data = {fields:[],groupBy:false};
        this._groupByFields(operand,data);
        return data.groupBy?data.fields:[]; 
    }
    protected _groupByFields(operand:Operand,data:any):void
    {
        if(operand instanceof SqlField){
            data.fields.push(operand);
        }else if(operand instanceof SqlFunctionRef && ['avg','count','first','last','max','min','sum'].indexOf(operand.name)>-1){
            data.groupBy = true;
        }else if(!(operand instanceof SqlSentence)){
            for(const k in operand.children){
                let p = operand.children[k];
                this._groupByFields(p,data);
            }
        }
    }
    protected clone(obj:any):any
    {
        let children = [];
        if(obj.children){
            for(const k in obj.children){
                let p = obj.children[k];
                let child = this.clone(p);
                children.push(child);
            }
        }
        return new obj.constructor(obj.name,children);
    } 
    protected fieldsInSelect(operand:Operand):Property[]
    {       
        let fields:Property[] = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof SqlObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p];
                    if(keyVal.children[0] instanceof SqlField){
                        let _field = keyVal.children[0] as SqlField
                        let field = {name:keyVal.name,type:_field.type};
                        fields.push(field);
                    }else{
                        let field = {name:keyVal.name,type:'any'};
                        fields.push(field); 
                    }                  
                }    
            }else if(operand.children[0] instanceof SqlArray){
                let array = operand.children[0];
                for(let i=0;i< array.children.length;i++){
                    let element = array.children[i];
                    if(element instanceof SqlField){
                        let parts =element.name.split('.');
                        let _field = element as SqlField                        
                        let field = {name:parts[parts.length-1],type:_field.type};
                        fields.push(field);
                    }else{
                        let field = {name:'field'+i,type:'any'};
                        fields.push(field);
                    } 
                }    
            }else if(operand.children[0] instanceof SqlField){
                let parts =operand.children[0].name.split('.');
                let _field = operand.children[0]  as SqlField 
                let field = {name:parts[parts.length-1],type:_field.type};
                fields.push(field);
            }
            else{
                let field = {name:'field0',type:'any'};
                fields.push(field);
            }  
        }
        return fields;
    }
    /**
    * change name of property by mapping and return fields for clause update or insert
    * @param operand clause update or update
    * @param context current sqlContext
    * @returns fields to execute query
    */
    protected solveFieldsInModify(operand:Operand,context:SqlContext):Property[]
    {       
        let fields:Property[] = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof SqlObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p];
                    let property =context.current.metadata.property[keyVal.name];
                    let field = {name:keyVal.name,type:property.type};
                    obj.children[p].name = property.mapping;
                    fields.push(field);                  
                }    
            } 
        }
        return fields;
    }
}
export class SqlLanguage implements ILanguage
{
    public name:string
    public libraries:any
    public dialects:any
    private schemaBuilder:SqlSchemaBuilder
    private operandManager:SqlOperandManager
    private operandExecutor:SqlExecutor
    constructor(){
        this.name= 'sql',
        this.libraries={};
        this.dialects={}; 
        this.schemaBuilder = new SqlSchemaBuilder(this);
        this.operandManager = new SqlOperandManager(this);
        this.operandExecutor = new SqlExecutor(this);

    }
    public addLibrary(library:any):void
    {
        this.libraries[library.name] =library;
        for(const name in library.dialects){
            let data =  library.dialects[name];
            let dialect = new SqlDialectMetadata(name);
            dialect.add(data);
            this.dialects[name] =dialect 
        }
    }
    public get schema():ISchemaBuilder
    {
        return this.schemaBuilder;
    }
    public get operand():IOperandManager
    {
        return this.operandManager;
    }
    public get executor():IOperandExecutor
    {
        return this.operandExecutor;
    }
}