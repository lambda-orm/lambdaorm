import {Property,Relation,Index,Delta} from './../../model'
import {ISchemaBuilder} from '../'
import {SchemaHelper} from '../../schema/schemaHelper'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlLanguage} from './language'

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