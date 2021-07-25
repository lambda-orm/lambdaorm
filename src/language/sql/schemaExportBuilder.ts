import {Property,Relation,Index,Delta} from './../../model'
import {ISchemaBuilder} from '../'
import {SchemaHelper} from '../../schema/schemaHelper'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlLanguage} from './language'

export class SqlSchemaExportBuilder 
{    
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language;
    }
    public create(schema:SchemaHelper):string
    {        
        let sql:string[]=[];

        //Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )
        for(const entityName in schema.entity){
            const entity = schema.entity[entityName];

            let sqlMap:string=`${entity.name}.map(p=>{`;
            for(const propertyName in entity.propery){
                const property = entity.propery[propertyName];

                sqlMap=sqlMap+`${property.name}:p.${property.name}`

            }
            sqlMap=sqlMap+'})';
        }

        let separator = metadata.other('sepatatorSql');
        return sql.join(separator)+separator;
    }
}