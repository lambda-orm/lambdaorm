import {SchemaData, SchemaEntityExpression} from './schemaData'
import {SchemaActionDML} from './schemaActionDML'
import {ITransaction} from '../connection'

export class SchemaExport extends SchemaActionDML
{   
    public async execute(namespace:string,transaction?:ITransaction):Promise<SchemaData>
    {          
        let schemaExpression = this.build(this.schema);
        let context={};
        if(transaction){
            return await this.executeEntitiesExpression(schemaExpression.entities,context,namespace,transaction);
        }else{
            let schemaExport:SchemaData={entities:[]};
            let _namespace= this.orm.database.get(namespace);
            await this.orm.createTransaction(_namespace.name,async (transaction)=>{ 
                schemaExport=await this.executeEntitiesExpression(schemaExpression.entities,context,namespace,transaction);
            });
            return schemaExport;
        } 
    }
    protected async executeEntitiesExpression(entitiesExpression:SchemaEntityExpression[],context:any,namespace:string,transaction:ITransaction)
    {
        let schemaExport:SchemaData={entities:[]};
        for(let i =0;i<entitiesExpression.length;i++){
            let entityExpression = entitiesExpression[i];
            let rows = await this.orm.expression(entityExpression.expression).execute(context,namespace,transaction);
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