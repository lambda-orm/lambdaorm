import {IOrm} from '../model'
import {SchemaHelper} from './schemaHelper'
import {SchemaExpression,SchemaSentence,SchemaData, SchemaEntityExpression} from './schemaData'

export abstract class SchemaActionDML
{    
    protected orm:IOrm 
    protected schema:SchemaHelper
    protected arrowVariables:string[];
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
        this.arrowVariables=['p','q','r','s','t','u','v','w','x','y','z'];
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
                let expression = this.createEntityExpression(entity);
                schemaExpression.entities.push(expression);
            }
        }
        return schemaExpression;
    }
    protected abstract createEntityExpression(entity:any):SchemaEntityExpression;

    protected createInclude(entity:any,level:number=0):string
    {
        // let expression:string='';
        let arrowVariable = this.arrowVariables[level];
        let includes:string[]=[];
        for(const relationName in entity.relation){
            const relation =  entity.relation[relationName];
            if(relation.type == 'manyToOne' ){
                let childEntity = this.schema.getEntity(relation.entity);
                let childInclude = this.createInclude(childEntity,level+1);
                includes.push(`${arrowVariable}.${relation.name}${childInclude}`);
                // expression =expression+`.include(p=>[p.${relation.name}${childInclude}])`;
            }
        }
        return includes.length==0?''
                :`.include(${arrowVariable}=>[${includes.join(',')}])`;
    }
    
}