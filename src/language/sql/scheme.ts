

class SqlScheme
{
    private _scheme:any

    constructor(scheme:any){
        this._scheme = scheme;
    }
    field(entityName,name){
        let entity =this.getEntity(entityName);
        if(!entity)return null;
        return entity.properties[name].field;
    }
    table(entityName){
        let entity =this.getEntity(entityName);
        return entity?entity.table:null;
    }
    getEntity(name){
        if(!this._scheme)return null;
        return this._scheme.entity[name];
    }
    getRelation(entity,relation){
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
            relationData= previousScheme.relations[part];
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

