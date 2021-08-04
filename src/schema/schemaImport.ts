import {SchemaDataEntity,SchemaData, SchemaEntityExpression} from './schemaData'
import {SchemaActionDML} from './schemaActionDML'

export class SchemaImport extends SchemaActionDML
{   
    public async execute(data:SchemaData,mapping:any,connection:string):Promise<void>
    {  
        let schemaExpression = this.build(this.schema);
        const entitiesExpression = this.sort(schemaExpression.entities);
        await this.orm.createTransaction(connection,async (transaction)=>{ 
            for(let i =0;i<entitiesExpression.length;i++){
                let entityExpression = entitiesExpression[i];
                let entityData = data.entities.find(p=> p.entity == entityExpression.entity);
                if(entityData){
                    let aux:any={};
                    this.loadExternalIds(entityData.entity,entityData.rows,aux)
                    this.solveInternalsIds(entityData.entity,entityData.rows,mapping);
                    await this.orm.expression(entityExpression.expression).execute(entityData.rows,transaction);
                    this.completeMapping(entityData.entity,entityData.rows,aux,mapping); 
                }               
            }
        }); 
    }
    protected solveInternalsIds(entityName:string,rows:any[],mapping:any):void
    {
        const entity=this.schema.getEntity(entityName);
        for(const p in entity.relation){
            const relation = entity.relation[p];
            if(relation.type == 'oneToOne' || relation.type == 'oneToMany'){
                const relationEntity=this.schema.getEntity(relation.entity);
                if(relationEntity.property[relation.to].autoincrement){
                    for(let i=0;i<rows.length;i++){
                        let row = rows[i];                    
                        let externalId = row[relation.from];
                        row[relation.from] = mapping[relation.entity][relation.to][externalId];
                    }
                }
            }
            else if (relation.type == 'manyToOne'){
                for(let i=0;i<rows.length;i++){
                    let row = rows[i];
                    let childs = row[relation.name];
                    this.solveInternalsIds(relation.entity,childs,mapping);
                }
            }
        }
    }
    protected loadExternalIds(entityName:string,rows:any[],aux:any):void
    {
        const entity=this.schema.getEntity(entityName);
        for(const p in entity.property){
            const property = entity.property[p];
            if(property.autoincrement){
                for(let i=0;i<rows.length;i++){
                    let row = rows[i];                    
                    aux[entityName][property.name][i]=row[property.name];
                }
            }
        }
        for(const p in entity.relation){
            const relation = entity.relation[p];
            if (relation.type == 'manyToOne'){
                for(let i=0;i<rows.length;i++){
                    let row = rows[i];
                    let childs = row[relation.name];
                    this.loadExternalIds(relation.entity,childs,aux);
                }
            }
        }
    }
    protected completeMapping(entityName:string,rows:any[],aux:any,mapping:any):void
    {
        const entity=this.schema.getEntity(entityName);
        for(const p in entity.property){
            const property = entity.property[p];
            if(property.autoincrement){
                for(let i=0;i<rows.length;i++){
                    let row = rows[i];                    
                    let externalId = aux[entityName][property.name][i];
                    mapping[entityName][property.name][externalId]=row[property.name];
                }
            }
        }
        for(const p in entity.relation){
            const relation = entity.relation[p];
            if (relation.type == 'manyToOne'){
                for(let i=0;i<rows.length;i++){
                    let row = rows[i];
                    let childs = row[relation.name];
                    this.completeMapping(relation.entity,childs,aux,mapping);
                }
            }
        }
    }  
    protected sort(entitiesExpression:SchemaEntityExpression[]):SchemaEntityExpression[]
    {  
        let entities = entitiesExpression.map(p=> p.entity);
        entities = this.schema.sortEntities(entities);       
        let result:SchemaEntityExpression[]=[];
        for(let i=0;i<entities.length;i++){
            result.push(entitiesExpression.find(p=> p.entity==entities[i]) as SchemaEntityExpression);
        }
        return result;
    }
    protected createEntityExpression(entity:any):SchemaEntityExpression
    {
        let expression:string=`${entity.name}.bulkInsert()${this.createInclude(entity)}`;        
        return {entity:entity.name,expression:expression}
    } 
}