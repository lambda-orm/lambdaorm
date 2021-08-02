import {SchemaData, SchemaEntityExpression} from './schemaData'
import {SchemaActionDML} from './schemaActionDML'

export class SchemaExport extends SchemaActionDML
{   
    public async execute(connection:string):Promise<SchemaData>
    {  
        let schemaExport:SchemaData={entities:[]};
        let schemaExportExpression = this.build(this.schema);
        let context={};
        await this.orm.createTransaction(connection,async (transaction)=>{ 
            for(let i =0;i<schemaExportExpression.entities.length;i++){
                let exportEntityExpression = schemaExportExpression.entities[i];
                let rows = await this.orm.expression(exportEntityExpression.expression).execute(context,transaction);
                schemaExport.entities.push({entity:exportEntityExpression.entity,rows:rows });
            }
        });        
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