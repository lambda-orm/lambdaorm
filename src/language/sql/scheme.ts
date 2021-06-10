

export default class SqlScheme
{
    private _scheme:any

    constructor(scheme:any){
        this._scheme = scheme;
    }
    public field(entityName:string,name:string):any
    {
        let entity =this.getEntity(entityName);
        if(!entity)return null;
        return entity.property[name].field;
    }
    public table(entityName:string):string
    {
        let entity =this.getEntity(entityName);
        return entity?entity.table:null;
    }
    public getEntity(name:string):any
    {
        if(!this._scheme)return null;
        return this._scheme.entity[name];
    }
    public getRelation(entity:string,relation:string):any
    {
        let previousEntity,previousScheme,relationData,relationEntity,relationScheme;
        let parts = relation.split('.');   
        for(let i=0;i<parts.length;i++){
            let part = parts[i];
            if(i==0){
                previousEntity = entity;
                previousScheme =this.getEntity(previousEntity);
            }else{
                previousEntity = relationEntity;
                previousScheme =relationScheme
            }                      
            relationData= previousScheme.relation[part];
            if(!relationData)
                throw 'relation '+part+' not found in '+previousScheme.name;
            relationEntity = relationData.to.entity;
            relationScheme = this.getEntity(relationEntity);
        }
        return {
            previousRelation: parts.length>1?parts.slice(0,parts.length-1).join('.'):'',
            previousScheme: previousScheme,
            relationScheme: relationScheme,
            relationData: relationData
        };
    }
}

