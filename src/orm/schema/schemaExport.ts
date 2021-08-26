import {SchemaData, SchemaEntityExpression} from './schemaData'
import {SchemaActionDML} from './schemaActionDML'
import {Transaction} from '../connection'

export class SchemaExport extends SchemaActionDML
{   
    public async execute(database:string,transaction?:Transaction):Promise<SchemaData>
    {          
        let schemaExpression = this.build(this.schema);
        let context={};
        if(transaction){
            return await this.executeEntitiesExpression(schemaExpression.entities,context,database,transaction);
        }else{
            let schemaExport:SchemaData={entities:[]};
            let _database= this.orm.database.get(database);
            await this.orm.internalTransaction(_database.name,async (transaction)=>{ 
                schemaExport=await this.executeEntitiesExpression(schemaExpression.entities,context,database,transaction);
            });
            return schemaExport;
        } 
    }
    protected async executeEntitiesExpression(entitiesExpression:SchemaEntityExpression[],context:any,database:string,transaction:Transaction)
    {
        let schemaExport:SchemaData={entities:[]};
        for(let i =0;i<entitiesExpression.length;i++){
            let entityExpression = entitiesExpression[i];
            let rows = await this.orm.expression(entityExpression.expression).execute(context,database,transaction);
            schemaExport.entities.push({entity:entityExpression.entity,rows:rows });
        }
        return schemaExport;
    } 
    protected createEntityExpression(entity:any):SchemaEntityExpression
    {
        let expression:string=`${entity.name}.map(p=>{`;
        let first:boolean=true;
        for(const propertyName in entity.property){
            const property = entity.property[propertyName];            
            expression=expression+(first?'':',')+`${property.name}:p.${property.name}`;
            first=false;
        }
        expression=expression+'})'+this.createInclude(entity);
        return {entity:entity.name,expression:expression}
    } 
}