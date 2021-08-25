import {Node} from '../node/index'
import {SchemaHelper}  from '../schema/schemaHelper'

export class QueryCompleter
{   
    public complete(node:Node,schema:SchemaHelper):Node
    {        
        if(node.type=='var' && node.children.length== 0){
            //Example: Products => Products.map(p=>p)            
            let arrowVariable = new Node('p','var');
            let allFields = new Node('p','var');
            let map=new Node('map','arrow',[node,arrowVariable,allFields]);
            this.completeNode(map,schema);
            return map;
        }else{
            this.completeNode(node,schema);
            return node;
        } 
    }
    private completeNode(node:Node,schema:SchemaHelper):void
    {
        if(node.type == 'arrow' || node.type == 'childFunc' ){
            this.completeSentence(node,schema);
        }
        else if(node.children){
            for(const i in node.children)
                this.completeNode(node.children[i],schema);
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
    private completeSentence(mainNode:Node,schema:SchemaHelper,entityName?:string):void
    {        
        let compleInclude:any; 
        let clauses:any = this.getClauses(mainNode);       
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
                //Add orderby and limit , replace first for map
                //example: SELECT * FROM Orders ORDER BY OrderId LIMIT 0,1;
                compleInclude = this.completeMapInclude;
                let node = clauses['first'];
                node.name= 'map';
                this.completeMapNode(entity,node,schema); 
                if(!clauses['sort']){
                    const autoincrement= schema.getAutoincrement(entity.name);
                    if(autoincrement!= undefined){
                        let varArrow = new Node('p', 'var', []);
                        let varSort = new Node('p.'+autoincrement.name, 'var', []);
                        mainNode.children[0] = new Node('sort','arrow',[mainNode.children[0],varArrow,varSort]);   
                    }                    
                }
                if(!clauses['page']){
                    let constPage = new Node('1', 'const', []);
                    let constRecords = new Node('1', 'const', []);
                    mainNode.children[0] = new Node('page','childFunc',[mainNode.children[0],constPage,constRecords]);
                }                
            }
            else if (clauses['last']){
                //Add orderby desc and limit, replace last for map
                //example: SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 0,1;
                compleInclude = this.completeMapInclude;
                let node = clauses['last'];
                node.name= 'map';
                this.completeMapNode(entity,node,schema);                
                if(!clauses['sort']){
                    const autoincrement= schema.getAutoincrement(entity.name);
                    if(autoincrement!= undefined){
                        let varArrow = new Node('p', 'var', []);
                        let varSort = new Node('p.'+autoincrement.name, 'var', []);
                        let funcDesc = new Node('desc', 'funcRef', [varSort]);                        
                        mainNode.children[0] = new Node('sort','arrow',[mainNode.children[0],varArrow,funcDesc]);   
                    }                    
                }
                if(!clauses['page']){
                    let constPage = new Node('1', 'const', []);
                    let constRecords = new Node('1', 'const', []);
                    mainNode.children[0] = new Node('page','childFunc',[mainNode.children[0],constPage,constRecords]);
                }  
            }
            else if (clauses['take']){
                //Add limit , replace take for map
                //example: SELECT * FROM Orders  LIMIT 0,1;
                compleInclude = this.completeMapInclude;
                let node = clauses['take'];
                node.name= 'map';
                if(!clauses['page']){
                    let constPage = new Node('1', 'const', []);
                    let constRecords = new Node('1', 'const', []);
                    mainNode.children[0] = new Node('page','childFunc',[mainNode.children[0],constPage,constRecords]);
                }  
            }else{
                //Solve expresion without map example: Products.filter(p=> id==1)
                compleInclude = this.completeMapInclude;
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []); 

                mainNode.children[0] = new Node('map','arrow',[mainNode.children[0],varArrow,varAll]);
                clauses['map']=mainNode.children[0];
                this.completeMapNode(entity,mainNode.children[0],schema);
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
