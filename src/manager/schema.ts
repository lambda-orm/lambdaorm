import * as model from './../model/schema'
import Schema from './../base/schema'

export default class SchemaManager
{
    private schemas:any    
    constructor(){
        this.schemas={}; 
    }
    public apply(value:model.Schema):void
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
    public getInstance(name:string):Schema
    {
        return new Schema(this.schemas[name]);
    }
    private transform(source:model.Schema):any
    {
        let target:any={entity:{},enum:{} };
        target.name = source.name;
        for(const p in source.entities){
            let sourceEntity = source.entities[p];
            let targetEntity:any = { property:{},relation:{}};    
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
                                            , properties:[]
                                            ,relations:[]
                                            };    
            for(const q in sourceEntity.property){
                let sourceProperty = sourceEntity.properties[q];
                let targetProperty:model.Property = {
                    name: sourceProperty.name, 
                    mapping: sourceProperty.mapping,
                    type: sourceProperty.type,
                    length: sourceProperty.length,
                    nullable: sourceProperty.nullable,
                    primaryKey: sourceProperty.primaryKey,
                    autoincrement: sourceProperty.autoincrement                
                }
                targetEntity.properties.push(targetProperty);                 
            }            
            for(const q in sourceEntity.relations){
                let sourceRelation = sourceEntity.relations[q];
                let targetRelationj:model.Relation = {
                    name: sourceRelation.name,
                    type: sourceRelation.type,
                    from: sourceRelation.from,
                    to: { entity: sourceRelation.to.entity ,property: sourceRelation.to.property }
                };
                targetEntity.relations.push(targetRelationj); 
            }
            target.entities.push(targetEntity);
        } 
        return target;
    }
}