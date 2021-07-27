import {SchemaHelper} from './schemaHelper'
import {Helper} from '../helper'
import {Schema,Entity,Property,Relation,Index,Delta,IOrm} from '../model/index'
import {SchemaDelta } from './schemaDelta'
import {SchemaExportManager} from './schemaExportManager'
 
export class SchemaManager
{
    public schemas:any
    private orm:IOrm 
    constructor(orm:IOrm){
        this.orm=orm;
        this.schemas={}; 
    }
    public add(value:Schema):void
    {
        this.schemas[value.name] = this.transform(value);     
    }
    public delete(name:string):void
    {
        delete this.schemas[name];     
    }         
    public get(name:string):Schema | undefined
    {
        let source = this.schemas[name];
        return source?this.untransform(source):undefined; 
    }
    public list():Schema[]
    {   
        let result:Schema[]=[]; 
        for(const p in this.schemas){
            result.push(this.untransform(this.schemas[p]));
        }
        return result;        
    }
    public getInstance(name:string):SchemaHelper
    {
        return new SchemaHelper(this.schemas[name]);
    }
    public delta(current:Schema,old?:Schema):SchemaDelta
    {   
        let schema = this.transform(current);
        let schemaHelper =new SchemaHelper(schema);
        let _current = schema.entity;
        let _old = old?this.transform(old).entity:null;
        let delta= Helper.deltaWithSimpleArrays(_current,_old); 
        return new SchemaDelta(this.orm,schemaHelper,delta);        
    }
    public export(name:string):SchemaExportManager
    {
        let schema=this.getInstance(name);
        return new SchemaExportManager(this.orm,schema);

    }
    public transform(source:Schema):any
    {
        let target:any={entity:{},enum:{} };
        target.name = source.name;
        for(const p in source.entities){
            let sourceEntity = source.entities[p];
            let targetEntity:any= {name: sourceEntity.name,
                                   mapping:sourceEntity.mapping,
                                   primaryKey:sourceEntity.primaryKey,
                                   uniqueKey:sourceEntity.uniqueKey?sourceEntity.uniqueKey:[],
                                   property:{},
                                   relation:{},
                                   index:{}
                                  };    
            for(const q in sourceEntity.properties){
                let sourceProperty = sourceEntity.properties[q];
                targetEntity.property[sourceProperty.name] = sourceProperty;
            }            
            for(const q in sourceEntity.relations){
                let sourceRelation = sourceEntity.relations[q];
                targetEntity.relation[sourceRelation.name] = sourceRelation;
            }
            if(sourceEntity.indexes)
                for(const q in sourceEntity.indexes){
                    let index = sourceEntity.indexes[q];
                    targetEntity.index[index.name] = index;
                }
            target.entity[sourceEntity.name] = targetEntity
        } 
        return target;
    }
    private untransform(source:any):Schema
    {
        let target:Schema={name:source.name as string,entities:[],enums:[]};
        for(const p in source.entity){
            let sourceEntity = source.entity[p];
            let targetEntity:Entity = { name:sourceEntity.name as string
                                            , mapping:sourceEntity.mapping as string 
                                            , primaryKey:sourceEntity.primaryKey
                                            , uniqueKey:sourceEntity.uniqueKey?sourceEntity.uniqueKey:[]
                                            , properties:[]
                                            , relations:[]
                                            , indexes:[]
                                            };    
            for(const q in sourceEntity.property){
                let sourceProperty = sourceEntity.property[q];
                let targetProperty:Property = {
                    name: sourceProperty.name, 
                    mapping: sourceProperty.mapping,
                    type: sourceProperty.type,
                    length: sourceProperty.length,
                    nullable: sourceProperty.nullable,
                    autoincrement: sourceProperty.autoincrement                
                }
                targetEntity.properties.push(targetProperty);                 
            }            
            for(const q in sourceEntity.relations){
                let sourceRelation = sourceEntity.relation[q];
                let targetRelation:Relation = {
                    name: sourceRelation.name,
                    type: sourceRelation.type,
                    from: sourceRelation.from,
                    entity: sourceRelation.entity, 
                    to: sourceRelation.to                 
                };
                targetEntity.relations.push(targetRelation); 
            }
            for(const q in sourceEntity.indexes){
                let sourceIndex= sourceEntity.indexes[q];
                let targetIndex:Index = {
                    name: sourceIndex.name,
                    fields: sourceIndex.fields                
                };
                targetEntity.indexes?.push(targetIndex); 
            }
            target.entities.push(targetEntity);
        } 
        return target;
    }

}