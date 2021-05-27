const {Node,Model,Library} = require("./base.js")

module.exports =  class Parser{
    constructor(model){
         this._model = model;
         this._tripleOperators = [];
         this._doubleOperators = [] ;
         this._assigmentOperators = [];
         this.refresh();     
     }     
     get doubleOperators(){
         return this._doubleOperators;
     }   
     get  tripleOperators(){
         return this._tripleOperators;  
     } 
     refresh(){
         for(const key in this._model.operators){
             if( key.length==2) this._doubleOperators.push(key);
             else if(key.length==3) this._tripleOperators.push(key);

            let operator = this._model.operators[key];
            if(operator[2] && operator[2].category == 'assignment')
                   this._assigmentOperators.push(key);
         }
     }   
     priority(name,cardinality){
         try{
             let metadata = this._model.operators[name][cardinality];
             return  metadata?metadata.priority : -1
         }
         catch(error){
             throw 'error to priority : '+name; 
         }
     }
     isEnum(name){    
         return this._model.isEnum(name); 
     }
     getEnumValue(name,option){
         return this._model.getEnumValue(name,option);
     }
     getEnum(name){
         return this._model.getEnum(name);
     }
     parse(expression){
         try{          
             let _parser = new _Parser(this,expression);
             let node= _parser.parse(); 
             // delete _parser;             
             return node;  
         }catch(error){ 
             throw 'expression: '+expression+' error: '+error.toString();  
         } 
     }
 }
 
 class _Parser{
     constructor(mgr,expression){
         this.mgr = mgr
         this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$') ;
         this.reInt = new RegExp('[0-9]+$');
         this.reFloat = new RegExp('d+(\.\d+)?$');
         this.buffer = [];
         if(typeof expression == 'string') 
            this.buffer =  expression.split('');
         else if (Array.isArray(expression)) 
            this.buffer = expression;
         else
            throw 'expression canot parsed';    
         this.length= this.buffer.length
         this.index=0
     }
     get previous(){
         return this.buffer[this.index-1]; 
     }
     get current(){
         return this.buffer[this.index] ;
     } 
     get next(){
         return this.buffer[this.index+1];
     }
     get end(){
         return this.index >= this.length;   
     }
     char(index){
        return this.buffer[index];
     } 
     parse(){
         let nodes=[]
         while(!this.end){
             let node =this.getExpression(null,null,';')
             if(!node)break;
             nodes.push(node)
         }
         if(nodes.length ==1)
             return nodes[0];
         return new Node('block','block',nodes);        
     }
     getExpression(operand1=null,operator=null,_break=''){
         let expression = null
         let operand2 = null
         let isbreak =  false               
         while(!this.end){
             if(operand1 == null && operator  == null){
                 operand1=  this.getOperand()
                 operator= this.getOperator()
                 if(operator == null || _break.includes(operator)){ 
                     expression = operand1;
                     isbreak= true;
                     break;
                 }
             }        
             operand2=  this.getOperand();
             let nextOperator= this.getOperator();
             if(nextOperator == null || _break.includes(nextOperator)){
                 expression= new Node(operator,'oper',[operand1,operand2]);
                 isbreak= true;
                 break;
             }    
             else if(this.priority(operator)>=this.priority(nextOperator)){
                 operand1=new Node(operator,'oper',[operand1,operand2]);
                 operator=nextOperator;
             }    
             else{
                 operand2 = this.getExpression(operand2,nextOperator,_break)
                 expression= new Node(operator,'oper',[operand1,operand2]);
                 isbreak= true;
                 break;
             }
         }        
         if(!isbreak) expression=new Node(operator,'oper',[operand1,operand2]);
         return expression 
     } 
     getOperand(){     
         let isNegative= false;
         let isNot= false;
         let isBitNot= false;
         let operand=null
         let char = this.current;
         if(char == '-'){
            isNegative=true;
            this.index+=1;
            char = this.current;
         }
         else if( char == '~'){
             isBitNot=true;
            this.index+=1;
            char = this.current;  
         }          
         else if( char == '!'){
            isNot=true;
            this.index+=1;
            char = this.current;   
         }
         if(this.reAlphanumeric.test(char)){    
             let value=  this.getValue();
             if(value=='if' && this.current == '('){
                 this.index+=1;
                 operand = this.getIfBlock();
             }
             else if( value=='while' && this.current == '('){
                 this.index+=1;
                 operand = this.getWhileBlock();    
             }        
             else if(!this.end && this.current == '('){
                 this.index+=1;
                 if(value.includes('.')){
                     let names = value.split('.');
                     let name = names.pop();
                     let variableName= names.join('');
                     let variable = new Node(variableName,'var');
                     operand= this.getChildFunction(name,variable);
                 }
                 else{
                     let args=  this.getArgs(')');
                     operand= new Node(value,'func',args);
                 }                
             }    
             else if(!this.end && this.current == '['){
                 this.index+=1;
                 operand = this.getIndexOperand(value);     
             }         
             else if( this.reInt.test(value)){
                 if(isNegative){
                     value = parseInt(value)* -1;
                     isNegative=  false;
                 } 
                 else if( isBitNot){
                     value = ~ parseInt(value);
                     isBitNot=  false  ;
                 }   
                 else{
                     value =parseInt(value);
                 }
                 operand = new Node(value,'const');
             }
             else if( this.reFloat.test(value)){
                 if(isNegative){
                     value = parseFloat(value)* -1;
                     isNegative=  false;
                 }
                 else if(isBitNot){
                     value = ~ parseFloat(value);
                     isBitNot=  false;    
                 }  
                 else{
                     value =parseFloat(value);
                 }
                 operand = new Node(value,'const');
             }
             else if( value=='true'){               
                 operand = new Node(true,'const');
             }
             else if( value==' false'){                
                 operand = new Node( false,'const')
             }
             else if( this.mgr.isEnum(value)){               
                 operand= this.getEnum(value);
             }
             else{
                 operand = new Node(value,'var');
             }
         }
         else if( char == '\'' || char == '"'){
             this.index+=1;
             let result=  this.getString(char);
             operand= new Node(result,'const');
         }
         else if( char == '('){
             this.index+=1;
             operand=  this.getExpression(null,null,')'); 
         }
         else if( char == '{'){
             this.index+=1;
             operand = this.getObject();  
         }
         else if( char == '['){
             this.index+=1;
             let elements=  this.getArgs(']');
             operand =  new Node('array','array',elements);
         } 
         operand = this.solveChain(operand);
         if(isNegative)operand= new Node('-','oper',[operand])
         if(isNot)operand=new Node('!','oper',[operand])
         if(isBitNot)operand=new Node('~','oper',[operand])  
         return operand;
     }
 
     solveChain(operand){
         if(!this.end &&  this.current=='.'){
             this.index+=1;
             let name=  this.getValue();
             if(this.current == '(') this.index+=1;
             return this.solveChain(this.getChildFunction(name,operand))
         }
         else{  
             return  operand; 
         } 
     } 
     priority(op,cardinality=2){
         return this.mgr.priority(op,cardinality)    
     } 
     getValue(increment=true){
         let buff=[]
         if(increment){
             while(!this.end && this.reAlphanumeric.test(this.current)){
                 buff.push(this.current);
                 this.index+=1;
             }
         }        
         else{
             let index = this.index
             while(!this.end && this.reAlphanumeric.test(this.buffer[index])){
                 buff.push(this.buffer[index]);
                 index+=1;  
             }
         }      
         return buff.join('');
     }
     getOperator(){
         if(this.end)return null; 
         let op=null
         if(this.index+2 < this.length){
             let triple = this.current+this.next+this.buffer[this.index+2]
             if( this.mgr.tripleOperators.includes(triple))op=triple;
         }
         if(op==null &&  this.index+1 < this.length){
             let double = this.current+this.next;
             if(this.mgr.doubleOperators.includes(double))op=double
         }
         if(op == null)op=this.current 
         this.index+= op.length;
         return op;
     }
     getString(char){
         let buff=[]       
         while(!this.end){
             if(this.current == char){
                 if(!((this.index+1 < this.length && this.next == char) || (this.previous == char)))
                     break;
             } 
             buff.push(this.current)
             this.index+=1
         }
         this.index+=1    
         return buff.join('');
     }
     getArgs(end=')'){
         let args= []
         while(true){
             let arg= this.getExpression(null,null,','+end);
             if(arg !=null)args.push(arg);
             if(this.previous==end) break;
         }
         return args
     }
     getObject(){
         let attributes= []
         while(true){
             let name=null
             if(this.current== '"' || this.current == "'"){
                 let char= this.current;
                 this.index+=1;
                 name= this.getString(char);
             }else{    
                 name= this.getValue();
             }
             if(this.current==':')this.index+=1
             else throw 'attribute '+name+' without value';
 
             let value= this.getExpression(null,null,',}');
             let attribute = new Node(name,'keyVal',[value]);
             attributes.push(attribute);
             if(this.previous=='}')break;
         }    
         return  new Node('obj','obj',attributes)
     } 
     getBlock(){
         let lines= [];
         while(true){
             line= this.getExpression(null,null,';}')
             if(line != null)lines.push(line)
             if(this.previous=='}')break; 
         }       
         return new Node('block','block',lines)
     }
     getIfBlock(){
         let block=null;
         let condition= this.getExpression(null,null,')');
         if(this.current == '{'){
             this.index+=1;  
             block= this.getBlock();
         }
         else{
             block= this.getExpression(null,null,';'); 
         }
         let nextValue=this.getValue(false);
         let elseblock=null;
         if(nextValue=='else'){
             this.index+=len(nextValue)
             if(this.current == '{'){
                 this.index+=1;  
                 elseblock= this.getBlock();
             }
             else{
                 elseblock= this.getExpression(null,null,';'); 
             }
         }
         return new Node('if','if',[condition,block,elseblock]) 
     }
     getWhileBlock(){
         let block=null;
         let condition= this.getExpression(null,null,')')
         if(this.current == '{'){
             this.index+=1;  
             block= this.getBlock();
         }
         else{
             block= this.getExpression(null,null,';');
         }
         return new Node('while','while',[condition,block]) 
     }
     getChildFunction(name,parent){ 

        let isArrow = false; 
        let variableName= this.getValue(false);
        if(variableName != '' ){
            let i = this.index + variableName.length;  
            if(this.char(i) == '=' && this.char(i+1) == '>' )isArrow= true;
        }
        if(isArrow){
            this.index+=(variableName.length+2);
            let variable= new Node(variableName,'var');
            let body= this.getExpression(null,null,')');
            return new Node(name,'arrow',[parent,variable,body]);  
        }else{
            let args=  this.getArgs(')');
            args.splice(0,0,parent);
            return  new Node(name,'childFunc',args);
        } 
        // if( this.mgr.arrowFunction.includes(name)){
        //      let variableName= this.getValue();
        //      if(variableName=='' && this.current==')'){
        //          this.index+=1
        //          return new Node(name,'arrow',[parent]) 
        //      }
        //      else{   
        //          if(this.current=='=' && this.next == '>')this.index+=2;
        //          else throw 'map without body';
        //          let variable= new Node(variableName,'var');
        //          let body= this.getExpression(null,null,')');
        //          return new Node(name,'arrow',[parent,variable,body]);  
        //      }      
        //  }else{ 
        //      let args=  this.getArgs(')');
        //      args.splice(0,0,parent);
        //      return  new Node(name,'childFunc',args);
        //  }
     }
     getIndexOperand(name){
         let idx= this.getExpression(null,null,']');
         let operand= new Node(name,'var');
         return new Node('[]','oper',[operand,idx]) 
     }
     getEnum(value){
         if( value.includes('.')  && this.mgr.isEnum(value)){
             let names = value.split('.');
             let enumName = names[0];
             let enumOption = names[1]; 
             let enumValue= this.mgr.getEnumValue(enumName,enumOption);
             return new Node(enumValue,'const');
         }else{
             let values= this.mgr.getEnum(value);
             let attributes= [];
             for( const name in values){
                 let _value = values[name];
                 let attribute = new Node(name,'keyVal',[new Node(_value,'const')]);
                 attributes.push(attribute);
             }
             return new Node('obj','obj',attributes)
         }
     }
 }
 