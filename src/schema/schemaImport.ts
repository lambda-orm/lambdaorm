import {SchemaDataEntity,SchemaData, SchemaEntityExpression} from './schemaData'
import {SchemaActionDML} from './schemaActionDML'

export class SchemaImport extends SchemaActionDML
{   
    public async execute(data:SchemaData,connection:string):Promise<void>
    {  
        let schemaExpression = this.build(this.schema);
        const entitiesExpression = this.sort(schemaExpression.entities)
        await this.orm.createTransaction(connection,async (transaction)=>{ 
            for(let i =0;i<entitiesExpression.length;i++){
                let entityExpression = entitiesExpression[i];
                let entityData = data.entities.find(p=> p.entity == entityExpression.entity);
                if(entityData)
                    await this.orm.expression(entityExpression.expression).execute(entityData.rows,transaction);                
            }
        }); 
    } 
    protected sort(entities:SchemaEntityExpression[]):SchemaEntityExpression[]
    {  
        let sorted:string[]=[];
        while(sorted.length < entities.length ){
            for(let i=0;i<entities.length;i++){
                const entityName = entities[i].entity;
                if(sorted.includes(entityName))
                    continue;
                if(this.solvedEntity(entityName,sorted))
                   break;      
            } 
        }
        let result:SchemaEntityExpression[]=[];
        for(let i=0;i<sorted.length;i++){
            result.push(entities.find(p=> p.entity==sorted[i]) as SchemaEntityExpression);
        }
        return result;
    }
    protected solvedEntity(entityName:string,sorted:string[]):boolean
    {       
        const entity=this.schema.getEntity(entityName);
        if(entity.relation === undefined){
            sorted.push(entity.name);
            return true;
        } 
        else{
            let unsolved = false;
            for(const p in entity.relation){
                const relation = entity.relation[p];
                if(relation.type == 'oneToOne' || relation.type == 'oneToMany'){
                    if(!sorted.includes(relation.entity)){
                        unsolved= true;
                        break;     
                    }
                }else if (relation.type == 'manyToOne'){
                    if(!this.solvedEntity(relation.entity,sorted)){
                        unsolved= true;
                        break;  
                    }
                }
            }
            if(!unsolved){
                sorted.push(entity.name);
                return true;
            }
        }
        return false; 
    }
    protected createEntityExpression(entity:any):SchemaEntityExpression
    {
        let expression:string=`${entity.name}.bulkInsert()${this.createInclude(entity)}`;        
        return {entity:entity.name,expression:expression}
    } 
}