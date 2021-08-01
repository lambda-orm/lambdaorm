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
                const name = entities[i].entity;
                if(sorted.includes(name))
                    continue;
                const entity=this.schema.getEntity(entities[i].entity);
                if(entity.relation === undefined)
                    sorted.push(entity.name); 
                else{
                    let find = false;
                    for(const p in entity.relation){
                        const relation = entity.relation[p];
                        if(!sorted.includes(relation.entity)){
                            find= true;
                            break;     
                        }
                    }
                    if(!find)
                        sorted.push(entity.name);   
                }               
            } 
        }
        let result:SchemaEntityExpression[]=[];
        for(let i=0;i<sorted.length;i++){
            result.push(entities.find(p=> p.entity==sorted[i]) as SchemaEntityExpression);
        }
        return result;
    }
    

    protected createEntityExpression(entity:any):SchemaEntityExpression
    {
        let expression:string=`${entity.name}.bulkInsert()${this.createInclude(entity)}`;        
        return {entity:entity.name,expression:expression}
    } 
}