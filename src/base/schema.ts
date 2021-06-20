export default class SchemaHelper
{
    private _schema:any
    constructor(schema:any){
        this._schema = schema;
    }
    public propertyMapping(entityName:string,name:string):any
    {
        let entity =this.getEntity(entityName);
        if(!entity)
            throw 'Not exists entity:'+entityName;
        let property= entity.property[name];
        if(!property)
            throw 'Not exists property: '+name+' in entity: '+entityName;
        return property.mapping;     
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
            relationEntity = relationData.to.entity;
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

