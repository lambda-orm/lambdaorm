import {Property,Relation,Index,Delta,ChangedValue} from './../../model'
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
    public sync(delta:Delta,dialect:string,schema:SchemaHelper):any[]
    {       
        let metadata = this.language.dialects[dialect] as SqlDialectMetadata 
        let sql:string[]=[];
        //remove constraints for changes in entities
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'primaryKey'){
                    if(!changed.delta)continue
                    for(const n in changed.delta.remove){
                        sql.push(this.dropPk(entityChanged.old,metadata));
                    }
                    for(const c in changed.delta.changed){
                        sql.push(this.dropPk(entityChanged.old,metadata));
                    }
                }
                if(changed.name == 'uniqueKey'){
                    if(changed.delta){
                        for(const n in changed.delta.remove){
                            sql.push(this.dropUk(entityChanged.old,metadata));
                        }
                        for(const c in changed.delta.changed){
                            sql.push(this.dropUk(entityChanged.old,metadata));
                        }                            
                    }
                }
            }
        }
        //remove indexes and Fks for changes in entities
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'index'){
                    if(!changed.delta)continue
                    for(const c in changed.delta.changed){
                        let oldIndex=changed.delta.changed[c].old as Index;
                        sql.push(this.dropIndex(entityChanged.new,oldIndex,metadata));
                    }
                    for(const r in changed.delta.remove){
                        let removeIndex=changed.delta.remove[r].old as Index;
                        sql.push(this.dropIndex(entityChanged.new,removeIndex,metadata));
                    }
                }
                if(changed.name == 'relation'){
                    if(!changed.delta)continue
                    for(const c in changed.delta.changed){
                        let oldRelation=changed.delta.changed[c].old as Relation;
                        if(oldRelation.type=='oneToMany' || oldRelation.type=='oneToOne')
                           sql.push(this.dropFk(entityChanged.new,oldRelation,metadata));
                    }
                    for(const r in changed.delta.remove){
                        let removeRelation=changed.delta.remove[r].old as Relation;
                        sql.push(this.dropFk(entityChanged.new,removeRelation,metadata));
                    }
                }
            }
        }
        //remove indexes and tables for removed entities
        for(const name in delta.remove){
            const removeEntity = delta.remove[name].old;
            if(removeEntity.index){
                for(const name in removeEntity.index)
                    sql.push(this.dropIndex(removeEntity,removeEntity.index[name],metadata));
            } 
            sql.push(this.dropTable(removeEntity,metadata));
                             
        }
        //create tables
        for(const name in delta.new){
            const newEntity = delta.new[name].new;
            sql.push(this.createTable(newEntity,metadata));
        }
        //add columns for entities changes
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'property'){
                    if(!changed.delta)continue
                    for(const n in changed.delta.new){
                        let newProperty=changed.delta.new[n].new as Property;
                        sql.push(this.addColumn(entityChanged.new,newProperty,metadata));
                    }
                    for(const n in changed.delta.changed){                      
                        let newProperty=changed.delta.changed[n].new as Property;
                        let oldProperty=changed.delta.changed[n].old as Property;
                        if(newProperty.mapping == oldProperty.mapping ){
                            sql.push(this.alterColumn(entityChanged.new,newProperty,metadata));
                        }
                    }
                }
            }
        }

        //TODO:
        // Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
        // Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
        // en ambos casos se debe resolver que se hara con los datos para que estos no se pierdan

        //remove columns for entities changes
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'property'){
                    if(!changed.delta)continue
                    for(const n in changed.delta.remove){
                        let oldProperty=changed.delta.remove[n].old as Property;
                        sql.push(this.dropColumn(entityChanged.old,oldProperty,metadata));
                    }
                }
            }
        }
        //create constraints for changes in entities
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'primaryKey'){
                    if(!changed.delta)continue
                    for(const n in changed.delta.new){
                        let newPrimaryKey=changed.delta.new[n].new as string[];
                        sql.push(this.addPk(entityChanged.new,newPrimaryKey,metadata));
                    }
                    for(const c in changed.delta.changed){
                        let changePrimaryKey=changed.delta.changed[c].new as string[];
                        sql.push(this.addPk(entityChanged.new,changePrimaryKey,metadata));
                    }
                }
                if(changed.name == 'uniqueKey'){
                    if(changed.delta){
                        for(const n in changed.delta.new){
                            let newUniqueKey=changed.delta.new[n].new as string[];
                            sql.push(this.addUk(entityChanged.new,newUniqueKey,metadata)); 
                        }
                        for(const c in changed.delta.changed){
                            let chanegUniqueKey=changed.delta.changed[c].new as string[];
                            sql.push(this.addUk(entityChanged.new,chanegUniqueKey,metadata)); 
                        }                            
                    }
                }
            }
        }
        // //create constraints for new entities
        // for(const name in delta.new){
        //     const newEntity = delta.new[name].new;
        //     if(newEntity.primaryKey){
        //         sql.push(this.addPk(newEntity,newEntity.primaryKey,metadata));
        //     } 
        //     if(newEntity.uniqueKey){
        //         sql.push(this.addUk(newEntity,newEntity.uniqueKey,metadata)); 
        //     }                 
        // }
        // create indexes and Fks for changes in entities
        for(const p in delta.changed){
            let entityChanged = delta.changed[p];            
            if(!entityChanged.delta)continue
            for(const q in entityChanged.delta.changed){
                let changed = entityChanged.delta.changed[q];
                if(changed.name == 'index'){
                    if(!changed.delta)continue
                    for(const n in changed.delta.new){
                        let newIndex=changed.delta.new[n].new as Index;
                        sql.push(this.createIndex(entityChanged.new,newIndex,metadata));
                    }
                    for(const c in changed.delta.changed){
                        let changeIndex=changed.delta.changed[c].new as Index;
                        sql.push(this.createIndex(entityChanged.new,changeIndex,metadata));
                    }
                    // for(const r in changed.delta.remove){
                    //     let removeIndex=changed.delta.remove[r];
                    // }
                }
                if(changed.name == 'relation'){
                    if(changed.delta){
                        for(const n in changed.delta.new){
                            let newRelation=changed.delta.new[n].new as Relation;
                            if(newRelation.type=='oneToMany' || newRelation.type=='oneToOne')
                                sql.push(this.addFk(schema,entityChanged.new,newRelation,metadata)); 
                        }
                        for(const c in changed.delta.changed){
                            let changeRelation=changed.delta.changed[c].new as Relation;
                            if(changeRelation.type=='oneToMany' || changeRelation.type=='oneToOne')
                                sql.push(this.addFk(schema,entityChanged.new,changeRelation,metadata)); 
                        }                            
                    }
                }
            }
        }
        //create indexes and Fks for new entities
        for(const name in delta.new){
            const newEntity = delta.new[name].new;
            if(newEntity.index){
                for(const name in newEntity.index)
                    sql.push(this.createIndex(newEntity,newEntity.index[name],metadata));
            } 
            if(newEntity.relation){
                for(const name in newEntity.relation){
                    let relation = newEntity.relation[name] as Relation;
                    if(relation.type=='oneToMany' || relation.type=='oneToOne')
                        sql.push(this.addFk(schema,newEntity,newEntity.relation[name],metadata)); 
                }  
            }                 
        }
        return sql;
    }
    public drop(dialect:string,schema:SchemaHelper):string[]
    {
        let metadata = this.language.dialects[dialect] as SqlDialectMetadata;
        let entities= schema.sortEntities().reverse();        
        let sql:string[]=[];
        //drop all constraint
        for(const p in entities){
            const entityName = entities[p];
            const entity = schema.entity[entityName];
            if(entity.relation){
                for(const name in entity.relation){
                    let relation=entity.relation[name] as Relation;
                    if(relation.type=='oneToMany' || relation.type=='oneToOne')
                       sql.push(this.dropFk(entity,relation,metadata));
                } 
            } 
        }
        //drop indexes and tables
        for(const p in entities){
            const entityName = entities[p];
            const entity = schema.entity[entityName];
            if(entity.index){
                for(const name in entity.index)
                    sql.push(this.dropIndex(entity,entity.index[name],metadata));
            } 
            sql.push(this.dropTable(entity,metadata));
        }
        return sql;
    }
    public truncate(dialect:string,schema:SchemaHelper):string[]
    {
        let metadata = this.language.dialects[dialect] as SqlDialectMetadata 
        let sql:string[]=[];
        for(const name in schema.entity){
            const entity = schema.entity[name];
            sql.push(this.truncateTable(entity,metadata));
        }
        return sql;
    }
    private truncateTable(entity:any,metadata:SqlDialectMetadata):string
    { 
        let text = metadata.ddl('truncateTable');
        text =text.replace('{name}',metadata.solveName(entity.mapping));
        return text;
    }
    private createTable(entity:any,metadata:SqlDialectMetadata):string
    {
        let define:string[]=[];
        for(const name in entity.property){
            define.push(this.createColumn(entity.property[name],metadata));
        }
        if(entity.primaryKey && entity.primaryKey.length > 0){
            define.push(this.createPk(entity,entity.primaryKey,metadata));
        }
        if(entity.uniqueKey && entity.uniqueKey.length > 0){
            define.push(this.createUk(entity,entity.uniqueKey,metadata));
        }
        let text = metadata.ddl('createTable');
        text =text.replace('{name}',metadata.solveName(entity.mapping));
        text =text.replace('{define}',define.join(','));

        return (text);
    }
    private dropTable(entity:any,metadata:SqlDialectMetadata):string
    {  
        let text = metadata.ddl('dropTable');
        text =text.replace('{name}',metadata.solveName(entity.mapping));
        return text;        
    }
    private createColumn(property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
        
        let text = property.autoincrement?metadata.ddl('incrementalColumDefine'):metadata.ddl('columnDefine');
        text =text.replace('{name}',metadata.solveName(property.mapping as string));
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        return text;
    }
    private createPk(entity:any,primaryKey:string[],metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<primaryKey.length;i++){
            const column = entity.property[primaryKey[i]];
            columns.push(columnTemplate.replace('{name}',metadata.solveName(column.mapping)));
        }
        let text = metadata.ddl('createPk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_PK'));
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private createUk(entity:any,uniqueKey:string[],metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<uniqueKey.length;i++){
            const column = entity.property[uniqueKey[i]];
            columns.push(columnTemplate.replace('{name}',metadata.solveName(column.mapping)));
        }
        let text = metadata.ddl('createUk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_UK'));
        text =text.replace('{columns}',columns.join(','));
        return text;
    }
    private createFk(schema:SchemaHelper,entity:any,relation:Relation,metadata:SqlDialectMetadata):string
    {
        let column = entity.property[relation.from];
        let fEntity = schema.getEntity(relation.entity);
        let fColumn = fEntity.property[relation.to];

        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('createFk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_'+relation.name+'_FK'));
        text =text.replace('{column}',metadata.solveName(column.mapping));
        text =text.replace('{fTable}',metadata.solveName(fEntity.mapping));
        text =text.replace('{fColumn}',metadata.solveName(fColumn.mapping));
        return alterEntity+' '+text;
    }
    private createIndex(entity:any,index:Index,metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<index.fields.length;i++){
            const column = entity.property[index.fields[i]];
            columns.push(columnTemplate.replace('{name}',metadata.solveName(column.mapping)));
        }
        let text = metadata.ddl('createIndex');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_'+index.name));
        text =text.replace('{table}',metadata.solveName(entity.mapping));
        text =text.replace('{columns}',columns.join(','));
        return text;
    }    
    private alterColumn(entity:any,property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
        
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = property.autoincrement?metadata.ddl('incrementalColumDefine'):metadata.ddl('columnDefine');
        text =text.replace('{name}',metadata.solveName(property.mapping as string));
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        text= metadata.ddl('alterColumn').replace('{columnDefine}',text);
        return alterEntity+' '+text;
    }
    private addColumn(entity:any,property:Property,metadata:SqlDialectMetadata):string
    {        
        let type = metadata.type(property.type);
        type = property.length?type.replace('{0}',property.length.toString()):type;
        let nullable = property.nullable !== undefined && property.nullable==false?metadata.other("notNullable"):"";
               
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = property.autoincrement?metadata.ddl('incrementalColumDefine'):metadata.ddl('columnDefine');
        text =text.replace('{name}',metadata.solveName(property.mapping as string));
        text =text.replace('{type}',type);
        text =text.replace('{nullable}',nullable);
        text= metadata.ddl('addColumn').replace('{columnDefine}',text);
        return alterEntity+' '+text;
    }
    private addPk(entity:any,primaryKey:string[],metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<primaryKey.length;i++){
            const column = entity.property[primaryKey[i]];
            columns.push(columnTemplate.replace('{name}',metadata.solveName(column.mapping)));
        }
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('addPk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_PK'));
        text =text.replace('{columns}',columns.join(','));
        return alterEntity+' '+text;
    }
    private addUk(entity:any,uniqueKey:string[],metadata:SqlDialectMetadata):string
    {
        let columns:string[]=[];
        let columnTemplate = metadata.other('column');
        for(let i=0;i<uniqueKey.length;i++){
            const column = entity.property[uniqueKey[i]];
            columns.push(columnTemplate.replace('{name}',metadata.solveName(column.mapping)));
        }
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('addUk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_UK'));
        text =text.replace('{columns}',columns.join(','));
        return alterEntity+' '+text;
    }
    private addFk(schema:SchemaHelper,entity:any,relation:Relation,metadata:SqlDialectMetadata):string
    {
        let column = entity.property[relation.from];
        let fEntity = schema.getEntity(relation.entity);
        let fColumn = fEntity.property[relation.to];

        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('addFk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_'+relation.name+'_FK'));
        text =text.replace('{column}',metadata.solveName(column.mapping));
        text =text.replace('{fTable}',metadata.solveName(fEntity.mapping));
        text =text.replace('{fColumn}',metadata.solveName(fColumn.mapping));
        return alterEntity+' '+text;
    }    
    private dropColumn(entity:any,property:Property,metadata:SqlDialectMetadata):string
    {  
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('dropColumn');
        text =text.replace('{name}',metadata.solveName(property.mapping as string));
        return alterEntity+' '+text;
    }
    private dropPk(entity:any,metadata:SqlDialectMetadata):string
    {  
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('dropPk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_PK'));
        return alterEntity+' '+text;
    }
    private dropUk(entity:any,metadata:SqlDialectMetadata):string
    {  
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('dropUk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_UK'));
        return alterEntity+' '+text;
    }
    private dropFk(entity:any,relation:Relation,metadata:SqlDialectMetadata):string
    {  
        const alterEntity = metadata.ddl('alterTable').replace('{name}',metadata.solveName(entity.mapping));
        let text = metadata.ddl('dropFk');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_'+relation.name+'_FK'));
        return alterEntity+' '+text;
    }
    private dropIndex(entity:any,index:Index,metadata:SqlDialectMetadata):string
    {      
        let text = metadata.ddl('dropIndex');
        text =text.replace('{name}',metadata.solveName(entity.mapping+'_'+index.name));
        text =text.replace('{table}',metadata.solveName(entity.mapping));
        return text;
    }
}