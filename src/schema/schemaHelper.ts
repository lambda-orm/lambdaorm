import {Property} from '../model/index'

export class SchemaHelper
{
    private _schema:any
    constructor(schema:any){
        this._schema = schema;
    }
    public get name(){
        return this._schema.name;
    }
    public get entity(){
        return this._schema.entity;
    }
    public isChild(entityName:string):boolean
    {
        for(const _entityName in this._schema.entity){
            const entity = this._schema.entity[_entityName];
            for(const relationName in entity.relation){
                const relation =  entity.relation[relationName];
                if(relation.type == 'manyToOne' && relation.entity==entityName)return true;
            }
        }
        return false;
    }
    public existsProperty(entityName:string,name:string):boolean
    {
        let entity =this.getEntity(entityName);
        if(!entity)
            throw 'Not exists entity:'+entityName;
        let property= entity.property[name];
        return property != undefined    
    }
    public getProperty(entityName:string,name:string):Property
    {
        let entity =this.getEntity(entityName);
        if(!entity)
            throw 'Not exists entity:'+entityName;
        let property= entity.property[name];
        if(!property)
            throw 'Not exists property: '+name+' in entity: '+entityName;
        return property;     
    }    
    public entityMapping(entityName:string):string
    {
        let entity =this.getEntity(entityName);
        return entity?entity.mapping:null;
    }
    public getEntity(name:string):any
    {
        return this._schema.entity[name];
    }
    public getAutoincrement(entityName:string):Property | undefined
    {
        let entity =this.getEntity(entityName);
        if(!entity)
            throw 'Not exists entity:'+entityName;
        for(const name in entity.property){
            const property = entity.property[name] as Property;
            if(property.autoincrement)
              return property;
        }
        return undefined;     
    }
    public getRelation(entity:string,relation:string):any
    {
        let previousEntity,previousSchema,relationData,relationEntity,relationSchema;
        let parts = relation.split('.');   
        for(let i=0;i<parts.length;i++){
            let part = parts[i];
            if(i==0){
                previousEntity = entity;
                previousSchema =this.getEntity(previousEntity);
            }else{
                previousEntity = relationEntity;
                previousSchema =relationSchema
            }                      
            relationData= previousSchema.relation[part];
            if(!relationData)
                throw 'relation '+part+' not found in '+previousSchema.name;
            relationEntity = relationData.entity;
            relationSchema = this.getEntity(relationEntity);
        }
        return {
            previousRelation: parts.length>1?parts.slice(0,parts.length-1).join('.'):'',
            previousSchema: previousSchema,
            relationSchema: relationSchema,
            relationData: relationData
        };
    }
}