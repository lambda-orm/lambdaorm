import {SchemaHelper} from '../language/index'
import {Helper} from '../helper'
import  * as model from './../model/index'

export class SchemaManager
{
    private schemas:any    
    constructor(){
        this.schemas={}; 
    }
    public add(value:model.Schema):void
    {
        this.schemas[value.name] = this.transform(value);     
    }
    public delete(name:string):void
    {
        delete this.schemas[name];     
    }         
    public get(name:string):model.Schema | undefined
    {
        let source = this.schemas[name];
        return source?this.untransform(source):undefined; 
    }
    public list():model.Schema[]
    {   
        let result:model.Schema[]=[]; 
        for(const p in this.schemas){
            result.push(this.untransform(this.schemas[p]));
        }
        return result;        
    }
    public getInstance(name:string):SchemaHelper
    {
        return new SchemaHelper(this.schemas[name]);
    }
    public delta(current:model.Schema,old?:model.Schema)
    {
        let _current = this.transform(current);
        let _old = old?this.transform(old):null;
        return Helper.deltaWithSimpleArrays(_current,_old);
    }
    private transform(source:model.Schema):any
    {
        let target:any={entity:{},enum:{} };
        target.name = source.name;
        for(const p in source.entities){
            let sourceEntity = source.entities[p];
            let targetEntity:any= {name: sourceEntity.name,
                                   mapping:sourceEntity.mapping,
                                   primaryKey:sourceEntity.primaryKey,
                                   uniqueKey:sourceEntity.uniqueKey?sourceEntity.uniqueKey:[],
                                   property:{}
                                   ,relation:{}
                                  };    
            for(const q in sourceEntity.properties){
                let sourceProperty = sourceEntity.properties[q];
                targetEntity.property[sourceProperty.name] = sourceProperty;
            }            
            for(const q in sourceEntity.relations){
                let sourceRelation = sourceEntity.relations[q];
                targetEntity.relation[sourceRelation.name] = sourceRelation;
            }
            target.entity[sourceEntity.name] = targetEntity
        } 
        return target;
    }
    private untransform(source:any):model.Schema
    {
        let target:model.Schema={name:source.name as string,entities:[],enums:[]};
        for(const p in source.entity){
            let sourceEntity = source.entity[p];
            let targetEntity:model.Entity = { name:sourceEntity.name as string
                                            , mapping:sourceEntity.mapping as string 
                                            , primaryKey:sourceEntity.primaryKey
                                            , uniqueKey:sourceEntity.uniqueKey?sourceEntity.uniqueKey:[]
                                            , properties:[]
                                            ,relations:[]
                                            };    
            for(const q in sourceEntity.property){
                let sourceProperty = sourceEntity.property[q];
                let targetProperty:model.Property = {
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
                let targetRelationj:model.Relation = {
                    name: sourceRelation.name,
                    type: sourceRelation.type,
                    from: sourceRelation.from,
                    entity: sourceRelation.entity, 
                    to: sourceRelation.to                 
                };
                targetEntity.relations.push(targetRelationj); 
            }
            target.entities.push(targetEntity);
        } 
        return target;
    }

}