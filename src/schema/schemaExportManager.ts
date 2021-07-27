import {IOrm} from './../model'
import {SchemaHelper} from './schemaHelper'
// import {ITransaction,ConnectionConfig} from './../connection'
import {SchemaExportExpression,SchemaExportSentence,SchemaExport, SchemaExportEntityExpression} from './schemaExport'


export class SchemaExportManager
{
    private orm:IOrm
    private schema:SchemaHelper    

    constructor(orm:IOrm,schema:SchemaHelper)
    {     
        this.orm =  orm; 
        this.schema= schema;
    }    
    public async sentence(dialect:string):Promise<SchemaExportSentence>
    {
        let exportSentence:SchemaExportSentence={entities:[]};
        let schemaExportExpression = this.build(this.schema);
        for(let i =0;i<schemaExportExpression.entities.length;i++){
            let exportEntityExpression = schemaExportExpression.entities[i];
            let sentence = (await this.orm.expression(exportEntityExpression.expression).compile(dialect,this.schema.name)).sql();
            exportSentence.entities.push({entity:exportEntityExpression.entity,sentence:sentence });
        }
        return exportSentence;        
    }
    public async execute(connection:string):Promise<SchemaExport>
    {  
        let schemaExport:SchemaExport={entities:[]};
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
    
    
    private build(schema:SchemaHelper):SchemaExportExpression
    {        
        let schemaExport:SchemaExportExpression={ entities:[]};        
        for(const entityName in schema.entity){
            if(!schema.isChild(entityName)){
                let entity = schema.entity[entityName];
                let exportEntity = this.createExportEntity(entity);
                schemaExport.entities.push(exportEntity);
            }
        }
        return schemaExport;
    }

    private createExportEntity(entity:any):SchemaExportEntityExpression
    {
        let expression:string=`${entity.name}.map(p=>{`;
        let first:boolean=true;
        for(const propertyName in entity.property){
            const property = entity.property[propertyName];            
            expression=expression+(first?'':',')+`${property.name}:p.${property.name}`;
            first=false;
        }
        expression=expression+'})'+this.createExportInclude(entity);
        return {entity:entity.name,expression:expression}
    }

    //Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
    private createExportInclude(entity:any):string
    {
        // let expression:string='';
        let includes:string[]=[];
        for(const relationName in entity.relation){
            const relation =  entity.relation[relationName];
            if(relation.type == 'manyToOne' ){
                let childEntity = this.schema.getEntity(relation.entity);
                let childInclude = this.createExportInclude(childEntity);
                includes.push(`p.${relation.name}${childInclude}`);
                // expression =expression+`.include(p=>[p.${relation.name}${childInclude}])`;
            }
        }
        return includes.length==0?''
                :`.include(p=>[${includes.join(',')}])`;
    }
    
}


