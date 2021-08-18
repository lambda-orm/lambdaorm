import {Node} from './../parser/node'
import {Operand,Context,Delta  } from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'
import {ILanguage} from './iLanguage'
import {Executor}  from '../connection'

export class LanguageManager
{   
    private languages:any
    public dialects:any
    constructor(){
        this.languages={};
        this.dialects={};
    } 
    public add(language:ILanguage){
        this.languages[language.name] =language;
        for(const name in language.dialects)
            this.dialects[name]= {name:name,language:language.name};         
    }
    public get(dialect:string):ILanguage 
    {
        let info =  this.dialects[dialect];
        return this.languages[info.language] as ILanguage
    }
    public build(dialect:string,node:Node,schema:SchemaHelper): Operand
    {
        let _node = this.solveSimplification(node,schema); 
        return this.get(dialect).operand.build(_node,dialect,schema);
    }
    public sentence(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.sentence(operand);
    }
    public model(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.model(operand);
    }
    public deserialize(dialect:string,serialized:any)
    {
        return this.get(dialect).operand.deserialize(serialized);
    }
    public serialize(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.serialize(operand);
    }
    public async execute(dialect:string,operand:Operand,context:Context,executor:Executor):Promise<any>
    {
        return await this.get(dialect).executor.execute(operand,context,executor);
    }
    public sync(dialect:string,delta:Delta,schema:SchemaHelper):any[]
    {       
       return this.get(dialect).schema.sync(delta,dialect,schema);
    }
    public drop(dialect:string,schema:SchemaHelper):string[]
    {
        return this.get(dialect).schema.drop(dialect,schema);
    }
    public truncate(dialect:string,schema:SchemaHelper):string[]
    {
        return this.get(dialect).schema.truncate(dialect,schema);
    }    
    protected solveSimplification(node:Node,schema:SchemaHelper):Node
    {        
        if(node.type=='var' && node.children.length== 0){
            //Example: Products => Products.map(p=>p)            
            let arrowVariable = new Node('p','var');
            let allFields = new Node('p','var');
            return new Node('map','arrow',[node,arrowVariable,allFields]);
        } 
        return this.completeExpression(node,schema);
    }
    protected completeExpression(node:Node,schema:SchemaHelper):Node
    {
        if(node.type == 'arrow' || node.type == 'childFunc' ){
            return this.completeSentence(node,schema);
        }
        else if(node.children){
            for(const i in node.children)
                node.children[i]=this.completeExpression(node.children[i],schema);
        }
        return node
    }
    protected completeSentence(node:Node,schema:SchemaHelper):Node
    {
        let sentence:any = {}; 
        let current = node;
        while(current){
            let name =current.type == 'var'?'from':current.name;
            sentence[name] =  current;
            if(current.children.length > 0)
                current = current.children[0]
            else
                break;  
        }
        let entity=sentence['from'].name;

        if(sentence['deleteAll'] || sentence['delete'] || sentence['insert']|| sentence['bulkInsert'] || sentence['updateAll'] || sentence['update']  ){
            //TODO:solve this cases
            //Se debe resolver aqui el delete y update sin filtro para agregar el filtro por el pk
            return node;
        }
        else 
        {
            if(sentence['map'] ){
                let map = sentence['map']
                return this.completeNodeMap(entity,map,schema);
            }
            else if (sentence['distinct']){
                let map = sentence['distinct']
                return this.completeNodeMap(entity,map,schema); 
             }
            else if (sentence['first']){
               //TODO: add orderby and limit , replace first for map
               //SELECT * FROM Orders ORDER BY OrderId LIMIT 1;
               return node;   
            }
            else if (sentence['last']){
                //TODO: add orderby and limit , replace first for map
                // SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 1;
                return node;
            }
            else if (sentence['take']){
                //TODO: add limit , replace first for map
                // SELECT * FROM Orders  LIMIT 1;
                return node;
            }else{
                //Solve expresion without map example: Products.filter(p=> id==1)
                //let varEntity = new Node(sentence['from'].name, 'var', []);
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []);               
                let map = new Node('map','arrow',[node,varArrow,varAll]);
                return this.completeNodeMap(entity,map,schema);
            }
        } 
    }
    protected completeNodeMap(entity:string,node:Node,schema:SchemaHelper):Node
    {
        if(node.children && node.children.length==3){
            let arrowVar = node.children[1].name;
            let fields = node.children[2];  
            if(fields.children.length==0 && fields.name == arrowVar){
                //Example: Orders.map(p=> p)
                let fields = this.createNodeFields(entity,schema,arrowVar);
                node.children[2]= fields;  
            }
        }else{
            let arrowVar = 'p';
            let varArrow = new Node('p', 'var', []);
            let fields = this.createNodeFields(entity,schema,'p');
            node.children.push(varArrow);
            node.children.push(fields);
        }
        return node; 
    }
    protected createNodeFields(entityName:string,schema:SchemaHelper,parent?:string,excludePrimaryKey:boolean=false,excludeAutoincrement:boolean=false):any
    {
        let obj = new Node('obj', 'obj', []);
        let entity=schema.getEntity(entityName);
        for(let name in entity.property){
            let property = entity.property[name];
            if((!property.autoincrement || !excludeAutoincrement) && (!entity.primaryKey.includes(property.name) || !excludePrimaryKey) ){
                let field = new Node(parent?parent+'.'+name:name, 'var', []);
                let keyVal = new Node(name, 'keyVal', [field])
                obj.children.push(keyVal);
            }
        }
        return obj;
    } 
}