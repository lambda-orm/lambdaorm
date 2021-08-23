import {Node,Model} from '../node/index'
import {Operand,Context,Delta,IOrm} from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'
import {ILanguage} from './iLanguage'
import {Executor}  from '../connection'
import {OperandManager}  from './operandManager'
import {Query,Sentence}  from './operands'

class CompleteExpressionManager
{   
    public completeNode(node:Node,schema:SchemaHelper):Node
    {        
        if(node.type=='var' && node.children.length== 0){
            //Example: Products => Products.map(p=>p)            
            let arrowVariable = new Node('p','var');
            let allFields = new Node('p','var');
            let map=new Node('map','arrow',[node,arrowVariable,allFields]);
            this.completeExpression(map,schema);
            return map;
        }else{
            this.completeExpression(node,schema);
            return node;
        } 
    }
    private completeExpression(node:Node,schema:SchemaHelper):void
    {
        if(node.type == 'arrow' || node.type == 'childFunc' ){
            this.completeSentence(node,schema);
        }
        else if(node.children){
            for(const i in node.children)
                this.completeExpression(node.children[i],schema);
        }
    }
    private getClauses(node:Node):any
    {
        let clauses:any = {};
        let current = node;
        while(current){
            let name =current.type == 'var'?'from':current.name;
            clauses[name] =  current;
            if(current.children.length > 0)
                current = current.children[0]
            else
                break;  
        }
        return clauses; 
    }
    private completeSentence(node:Node,schema:SchemaHelper,entityName?:string):void
    {        
        let compleInclude:any; 
        let clauses:any = this.getClauses(node);       
        let entity = schema.getEntity(entityName?entityName:clauses['from'].name);
        if(clauses['insert']){
            compleInclude = this.completeInsertInclude;
            let node = clauses['insert']
            this.completeInsertNode(entity,node,schema);
        }else if(clauses['bulkInsert'] ){
            compleInclude = this.completeBulkInsertInclude;
            let node = clauses['bulkInsert']
            this.completeInsertNode(entity,node,schema);
        }else if(clauses['update']){
            compleInclude = this.completeUpdateInclude;
            let node = clauses['update']
            this.completeUpdateNode(entity,node,schema);
            if(!clauses['filter'])
                this.createClauseFilter(entity,node,schema);
        }else if(clauses['updateAll'] ){
            compleInclude = this.completeUpdateInclude;
            let node = clauses['updateAll'];
            node.name= 'update';
            //TODO: validar que tenga un objeto definido
            //Example: Orders.update({name:'test'}) 
        }else if(clauses['delete']){
            compleInclude = this.completeDeleteInclude;
            let node = clauses['delete'];
            if(!clauses['filter'])
                this.createClauseFilter(entity,node,schema);
        }else if(clauses['deleteAll'] ){
            compleInclude = this.completeDeleteInclude;
            let node = clauses['deleteAll'];
            node.name= 'delete';           
        }else{
            if(clauses['map'] ){
                compleInclude = this.completeMapInclude;
                let map = clauses['map']
                this.completeMapNode(entity,map,schema);
            }
            else if (clauses['distinct']){
                compleInclude = this.completeDisctintInclude;
                let map = clauses['distinct']
                this.completeMapNode(entity,map,schema); 
             }
            else if (clauses['first']){
                compleInclude = this.completeMapInclude;
                let node = clauses['first'];
                //TODO: add orderby and limit , replace first for map
                //SELECT * FROM Orders ORDER BY OrderId LIMIT 1;
                node.name= 'map'; 
            }
            else if (clauses['last']){
                compleInclude = this.completeMapInclude;
                let node = clauses['last'];
                //TODO: add orderby and limit , replace first for map
                // SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 1;
                node.name= 'map'; 
            }
            else if (clauses['take']){
                compleInclude = this.completeMapInclude;
                let node = clauses['take'];
                //TODO: add limit , replace first for map
                // SELECT * FROM Orders  LIMIT 1;
                node.name= 'map'; 
            }else{
                //Solve expresion without map example: Products.filter(p=> id==1)
                compleInclude = this.completeMapInclude;
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []); 

                node.children[0] = new Node('map','arrow',[node.children[0],varArrow,varAll]);
                clauses['map']=node.children[0];
                this.completeMapNode(entity,node.children[0],schema);
            }
        }
        if(clauses['include']){
            if(compleInclude===undefined)
               throw 'Include not implemented!!!';

            let clauseInclude = clauses['include'];                
            let arrowVar = clauseInclude.children[1].name; 
            let body = clauseInclude.children[2];                
            if (body.type == 'array'){
                for (let i=0; i< body.children.length;i++) {
                    body.children[i]=compleInclude.bind(this)(entity,arrowVar,body.children[i],schema);
                }
            }
            else{
                clauseInclude.children[2]=compleInclude.bind(this)(entity,arrowVar,body,schema);
            }
        } 
    }
    private completeMapNode(entity:any,node:Node,schema:SchemaHelper):void
    {
        if(node.children && node.children.length==3){
            let arrowVar = node.children[1].name;
            let fields = node.children[2];  
            if(fields.children.length==0 && fields.name == arrowVar){
                //Example: Orders.map(p=> p)
                node.children[2]= this.createNodeFields(entity,schema,arrowVar);
            }
        }else{
            let arrowVar = 'p';
            let varArrow = new Node('p', 'var', []);
            let fields = this.createNodeFields(entity,schema,'p');
            node.children.push(varArrow);
            node.children.push(fields);
        }
    }
    private completeInsertNode(entity:any,node:Node,schema:SchemaHelper):void
    {           
        if(node.children.length== 1){
            //example: Orders.insert()
            let fields = this.createNodeFields(entity,schema,undefined,false,true);
            node.children.push(fields);
        }
        else if(node.children.length== 2 && node.children[1].type == 'var'){            
            //example: Orders.insert(entity)
            node.children[1] = this.createNodeFields(entity,schema,node.children[1].name,false,true);
        }
    }
    private completeUpdateNode(entity:any,node:Node,schema:SchemaHelper):void
    {      
        if(node.children.length== 1){
            //Example: Orders.update()
            // In the case that the mapping is not defined, it assumes that the context will be the entity to update
            let fields = this.createNodeFields(entity,schema,undefined,false,true)
            node.children.push(fields);

        }else if(node.children.length== 2 && node.children[1].type == 'var'){
            //Example: Orders.update(entity) 
            // In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
            node.children[1] = this.createNodeFields(entity,schema,node.children[1].name,true);
        }else if(node.children.length== 3 && node.type == 'arrow' && node.children[1].name ==  node.children[2].name ){
            //Example: Orders.update({ name: entity.name }).include(p => p.details.update(p => p))
            node.children[2] = this.createNodeFields(entity,schema,node.children[1].name,true);
        }
    }
    private createNodeFields(entity:any,schema:SchemaHelper,parent?:string,excludePrimaryKey:boolean=false,excludeAutoincrement:boolean=false):any
    {
        let obj = new Node('obj', 'obj', []);
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
    private createClauseFilter(entity:any,node:Node,schema:SchemaHelper):void
    { 
        if(node.children.length== 1 ){
            //Example: Orders.delete() 
            let condition = this.createFilter(entity,schema,'p');                
            let arrowVar = new Node('p', 'var', []);
            node.children[0] = new Node('filter','arrow',[node.children[0],arrowVar,condition]);
        }else if(node.children.length== 2 && node.children[1].type == 'var'){
            //Example Orders.update(entity) ,Orders.delete(entity)
            let condition = this.createFilter(entity,schema,'p',node.children[1].name);
            let arrowVar = new Node('p', 'var', []);
            node.children[0] = new Node('filter','arrow',[node.children[0],arrowVar,condition]);            
        }else if(node.children.length== 2 && node.children[1].type == 'obj'){
            //Example Orders.update({unitPrice:unitPrice,productId:productId) 
            let condition = this.createFilter(entity,schema,'p',node.children[1].name);
            let arrowVar = new Node('p', 'var', []);
            node.children[0] = new Node('filter','arrow',[node.children[0],arrowVar,condition]);
        }else if(node.children.length== 3){
            //Example: Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
            // Aplica al update del include, en el caso del ejemplo seria a: p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })
            let condition = this.createFilter(entity,schema,'p');
            let arrowVar = new Node('p', 'var', []);
            node.children[0] = new Node('filter','arrow',[node.children[0],arrowVar,condition]); 
        }   
    }
    private createFilter(entity:any,schema:SchemaHelper,parent?:string,parentVariable?:string):Node
    {
        let condition = undefined;
        for(let i in entity.primaryKey){ 
            let name = entity.primaryKey[i]; 
            let field = entity.property[name];
            let fieldNode = new Node(parent?parent + '.' + field.name:field.name,'var');
            let variableNode = new Node(parentVariable?parentVariable+'.'+name:name,'var');
            let equal =new Node('==','oper',[fieldNode,variableNode]);
            condition =condition?new Node('&&','oper', [condition,equal]):equal;
        }
        if(condition)
            return condition;
        throw 'Create Filter incorrect!!!';
    }
    private completeMapInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
       return this.completeSelectInclude(entity,arrowVar,node,schema,'map');
    }
    private completeDisctintInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
       return this.completeSelectInclude(entity,arrowVar,node,schema,'distinct');
    }
    private completeSelectInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper,clause:string):Node
    {   
        let map:Node,relation:any;
        if(node.type =='arrow'){
            //resuelve el siguiente caso  .includes(details.map(p=>p))     
            let current = node;
            while (current) {
                if(current.type == 'var'){
                    //p.details
                    let parts = current.name.split('.');
                    let relationName=parts[1];
                    relation = entity.relation[relationName]; 
                    break;
                }
                if (current.children.length > 0)
                    current = current.children[0];
                else
                    break;
            }
            map = node;//new Node(clause,'childFunc',[node]);
            this.completeSentence(map, schema, relation.entity);
        } else if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en .include(p=> p.details.map(p=>p))      
            let varArrowNode = new Node('p', 'var', []);
            let varAll = new Node('p', 'var', []);
            let parts = node.name.split('.');
            let relationName=parts[1];
            relation = entity.relation[relationName];
            map = new Node(clause,'arrow',[node,varArrowNode,varAll]);
            this.completeSentence(map, schema,relation.entity);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        }
        //add filter with parent
        let clauses:any = this.getClauses(map);  
        let childFilter= clauses['filter'];
        let arrowFilterVar = childFilter?childFilter.children[1].name:'p';       
        let fieldRelation = new Node(arrowFilterVar+ '.' + relation.to,'var');   //new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping);
        let varRelation = new Node('list_'+relation.to,'var');
        let filterInclude =new Node('includes','funcRef', [fieldRelation,varRelation]);        
        if(!childFilter){
            let varFilterArrowNode = new Node(arrowFilterVar, 'var', []);
            map.children[0]= new Node('filter','arrow',[map.children[0],varFilterArrowNode,filterInclude]);
        }else{
            childFilter.children[0] =new Node('&&','oper',[childFilter.children[0],filterInclude]);
        }
        return map;
    }    
    private completeBulkInsertInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
       return this.completeInclude(entity,arrowVar,node,schema,'bulkInsert');
    }
    private completeInsertInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
       return this.completeInclude(entity,arrowVar,node,schema,'insert');
    }
    private completeUpdateInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
        return this.completeInclude(entity,arrowVar,node,schema,'update');
    }
    private completeDeleteInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper):Node
    {   
        return this.completeInclude(entity,arrowVar,node,schema,'delete');
    }
    private completeInclude(entity:any,arrowVar:string,node:Node,schema:SchemaHelper,clause:string):Node
    {   
        let clauseNode:Node,relation:any;
        if(node.type =='arrow'){
            //resuelve el siguiente caso  .includes(details.insert())     
            let current = node;
            while (current) {
                if(current.type == 'var'){
                    //p.details
                    let parts = current.name.split('.');
                    let relationName=parts[1];
                    relation = entity.relation[relationName]; 
                    break;
                }
                if (current.children.length > 0)
                    current = current.children[0];
                else
                    break;
            }
            let clauses:any = this.getClauses(node);  
            clauseNode = clauses[clause]?clauses[clause]:new Node(clause,'childFunc',[node]);
            this.completeSentence(clauseNode, schema,relation.entity);
        }else if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en Details.insert()      
            
            let parts = node.name.split('.');
            let relationName=parts[1];
            relation = entity.relation[relationName];
            clauseNode = new Node(clause,'childFunc',[node]);
            this.completeSentence(clauseNode, schema, relation.entity);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        }
        return clauseNode; 
    } 
}


export class LanguageManager
{   
    private languages:any
    public dialects:any
    private orm:IOrm    
    private completeExpression:CompleteExpressionManager
    private operandManager:OperandManager
    constructor(orm:IOrm,languageModel:Model){
        this.orm=orm;
        this.completeExpression= new CompleteExpressionManager();
        this.operandManager= new OperandManager(languageModel);
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
    public hadQuery(dialect:string){
        return this.get(dialect).hadQuery; 
    }
    public build(node:Node,schema:SchemaHelper): Operand
    {
        let _node = this.complete(node,schema);
        return this.operandManager.build(_node,schema);
    }
    public complete(node:Node,schema:SchemaHelper): Node
    {
        let completeNode= this.completeExpression.completeNode(node,schema);
        this.orm.node.setParent(completeNode);
        return completeNode; 
    }
    public model(sentence:Sentence):any
    {
        return this.operandManager.model(sentence);
    }
    public query(dialect:string,sentence:Sentence): Query
    {       
        return this.get(dialect).query.build(sentence,dialect);
    }
    public sentence(dialect:string,operand:Query):any
    {
        return this.get(dialect).query.sentence(operand);
    }
    public serialize(operand:Operand):any
    {
        return this.operandManager.serialize(operand);
    }
    public deserialize(serialized:any)
    {
        return this.operandManager.deserialize(serialized);
    }
    public serializeQuery(dialect:string,operand:Operand):any
    {
        return this.get(dialect).query.serialize(operand);
    }
    public deserializeQuery(dialect:string,serialized:any)
    {
        return this.get(dialect).query.deserialize(serialized);
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
}