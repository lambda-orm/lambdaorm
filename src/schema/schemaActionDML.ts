import {IOrm} from '../model'
import {SchemaHelper} from './schemaHelper'
import {SchemaExpression,SchemaSentence,SchemaData, SchemaEntityExpression} from './schemaData'

export abstract class SchemaActionDML
{    
    protected orm:IOrm 
    protected schema:SchemaHelper   
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
    }
    public async sentence(dialect:string):Promise<SchemaSentence>
    {
        let schemaSentence:SchemaSentence={entities:[]};
        let schemaExportExpression = this.build(this.schema);
        for(let i =0;i<schemaExportExpression.entities.length;i++){
            let exportEntityExpression = schemaExportExpression.entities[i];
            let sentence = (await this.orm.expression(exportEntityExpression.expression).compile(dialect,this.schema.name)).sentence();
            schemaSentence.entities.push({entity:exportEntityExpression.entity,sentence:sentence });
        }
        return schemaSentence;        
    }
    protected build(schema:SchemaHelper):SchemaExpression
    {        
        let schemaExpression:SchemaExpression={ entities:[]};        
        for(const entityName in schema.entity){
            if(!schema.isChild(entityName)){
                let entity = schema.entity[entityName];
                let exportEntity = this.createEntityExpression(entity);
                schemaExpression.entities.push(exportEntity);
            }
        }
        return schemaExpression;
    }
    protected abstract createEntityExpression(entity:any):SchemaEntityExpression;

    protected createInclude(entity:any):string
    {
        // let expression:string='';
        let includes:string[]=[];
        for(const relationName in entity.relation){
            const relation =  entity.relation[relationName];
            if(relation.type == 'manyToOne' ){
                let childEntity = this.schema.getEntity(relation.entity);
                let childInclude = this.createInclude(childEntity);
                includes.push(`p.${relation.name}${childInclude}`);
                // expression =expression+`.include(p=>[p.${relation.name}${childInclude}])`;
            }
        }
        return includes.length==0?''
                :`.include(p=>[${includes.join(',')}])`;
    }
    
}