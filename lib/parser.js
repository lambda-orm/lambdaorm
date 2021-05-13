
module.export = class Parser{
   constructor(model){
        this._model = model 
        this.reAlphanumeric = re.compile('[a-zA-Z0-9_.]+$') 
        this.reInt = re.compile('[0-9]+$')
        this.reFloat = re.compile('(\d+(\.\d*)?|\.\d+)([eE]\d+)?')
        this._tripleOperators = []
        this._doubleOperators = [] 
        this._assigmentOperators = []
        this._arrowFunction = []    
    } 
    get doubleOperators(){
        return this._doubleOperators;
    }   
    get  tripleOperators(){
        return this._tripleOperators;  
    } 
    get  arrowFunction(){
        return this._arrowFunction; 
    }
    refresh(){
        for(const key in this._model.operators.keys()){
            if( len(key)==2) this._doubleOperators.append(key);
            else if(len(key)==3) this._tripleOperators.append(key);

            // operator = this._model.operators[key];
            // if 2 in operator.keys():
            //    if operator[2]['category'] == 'assignment':
            //       this._assigmentOperators.append(key)
        }

        for(const key in this._model.functions.keys()){
            metadata = this._model.functions[key]
            if( metadata['isArrowFunction'])this._arrowFunction.append(key)
        }
    }   
    priority(name,cardinality){
        try{
            metadata = this._model.getOperatorMetadata(name,cardinality)
            return  metadata?metadata["priority"] : -1
        }
        catch(error){
            throw ModelError('error to priority : '+name) 
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
            let _parser = new _Parser(expression);
            node= _parser.parse(); 
            // delete _parser;             
            return node;  
        }catch(error){ 
            throw ExpressionError('expression: '+expression+' error: '+str(error));  
        } 
    }
}

class _Parser{
    constructor(mgr,expression){
        this.mgr = mgr 
        this.buffer = expression.split('')
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
    parse(){
        nodes=[]
        while(!this.end){
            node =this.getExpression(_break=';')
            if(!node)break;
            nodes.append(node)
        }
        if(nodes.length ==1)
            return nodes[0];
        return Node('block','block',nodes);        
    }
    getExpression(operand1=null,operator=null,_break=''){
        let expression = null
        let operand2 = null
        let isbreak =  false               
        while(!this.end){
            if(operand1 == null && operator  == null){
                operand1=  this.getOperand()
                operator= this.getOperator()
                if(operator == null || operator.includes(_break)){ 
                    expression = operand1;
                    isbreak= true;
                    break;
                }
            }        
            operand2=  this.getOperand();
            nextOperator= this.getOperator();
            if(nextOperator == null || nextOperator.includes(_break)){
                expression= Node(operator,'operator',[operand1,operand2]);
                isbreak= true;
                break;
            }    
            else if(this.priority(operator)>=this.priority(nextOperator)){
                operand1=Node(operator,'operator',[operand1,operand2]);
                operator=nextOperator;
            }    
            else{
                operand2 = this.getExpression(operand1=operand2,operator=nextOperator,_break=_break)
                expression= Node(operator,'operator',[operand1,operand2]);
                isbreak= true;
                break;
            }
        }        
        if(!isbreak) expression=Node(operator,'operator',[operand1,operand2]);
        return expression 
    } 
    getOperand(){     
        let isNegative= false;
        let isNot= false;
        let isBitNot= false;
        operand=null
        char = this.current;
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
        if(char.isalnum()){    
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
                    names = value.split('.');
                    name = names.pop();
                    variableName= '.'.join(names);
                    variable = Node(variableName,'variable');
                    operand= this.getChildFunction(name,variable);
                }
                else{
                    args=  this.getArgs(end=')');
                    operand= Node(value,'function',args);
                }                
            }    
            else if(!this.end && this.current == '['){
                this.index+=1;
                operand = this.getIndexOperand(value);     
            }         
            else if( this.mgr.reInt.match(value)){
                if(isNegative){
                    value = int(value)* -1;
                    isNegative=  false;
                } 
                else if( isBitNot){
                    value = ~ int(value);
                    isBitNot=  false  ;
                }   
                else{
                    value =int(value);
                }
                operand = Node(value,'constant');
            }
            else if( this.mgr.reFloat.match(value)){
                if(isNegative){
                    value = float(value)* -1;
                    isNegative=  false;
                }
                else if( isBitNot){
                    value = ~float(value);
                    isBitNot=  false;    
                }  
                else{
                    value =float(value);
                }
                operand = Node(value,'constant');
            }
            else if( value=='true'){               
                operand = Node(true,'constant');
            }
            else if( value==' false'){                
                operand = Node( false,'constant')
            }
            else if( this.mgr.isEnum(value)){               
                operand= this.getEnum(value);
            }
            else{
                operand = Node(value,'variable');
            }
        }
        else if( char == '\'' || char == '"'){
            this.index+=1;
            result=  this.getString(char);
            operand= Node(result,'constant');
        }
        else if( char == '('){
            this.index+=1;
            operand=  this.getExpression(_break=')'); 
        }
        else if( char == '{'){
            this.index+=1;
            operand = this.getObject();  
        }
        else if( char == '['){
            this.index+=1;
            elements=  this.getArgs(end=']');
            operand =  Node('array','array',elements);
        } 
        operand = this.solveChain(operand);
        if(isNegative)operand= Node('-','operator',[operand])
        if(isNot)operand=Node('!','operator',[operand])
        if(isBitNot)operand=Node('~','operator',[operand])  
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
            while(!this.end && this.mgr.reAlphanumeric.match(this.current)){
                buff.append(this.current);
                this.index+=1;
            }
        }        
        else{
            index = this.index
            while(!this.end && this.mgr.reAlphanumeric.match(this.buffer[index])){
                buff.append(this.buffer[index]);
                index+=1;  
            }
        }      
        return ''.join(buff);
    }
    getOperator(){
        if(this.end)return null; 
        let op=null
        if(this.index+2 < this.length){
            triple = this.current+this.next+this.buffer[this.index+2]
            if( this.mgr.tripleOperators.includes(triple))op=triple;
        }
        if(op==null &&  this.index+1 < this.length){
            double = this.current+this.next;
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
            buff.append(this.current)
            this.index+=1
        }
        this.index+=1    
        return ''.join(buff);
    }
    getArgs(end=')'){
        let args= []
        while(true){
            let arg= this.getExpression(_break=','+end);
            if(arg !=null)args.append(arg);
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
            else throw ExpressionError('attribute '+name+' without value');

            let value= this.getExpression(_break=',}');
            let attribute = Node(name,'keyValue',[value]);
            attributes.append(attribute);
            if(this.previous=='}')break;
        }    
        return  Node('object','object',attributes)
    } 
    getBlock(){
        let lines= [];
        while(true){
            line= this.getExpression(_break=';}')
            if(line != null)lines.append(line)
            if(this.previous=='}')break; 
        }       
        return Node('block','block',lines)
    }
    getIfBlock(){
        let block=null;
        let condition= this.getExpression(_break=')');
        if(this.current == '{'){
            this.index+=1;  
            block= this.getBlock();
        }
        else{
            block= this.getExpression(_break=';'); 
        }
        let nextValue=this.getValue(increment= false);
        let elseblock=null;
        if(nextValue=='else'){
            this.index+=len(nextValue)
            if(this.current == '{'){
                this.index+=1;  
                elseblock= this.getBlock();
            }
            else{
                elseblock= this.getExpression(_break=';'); 
            }
        }
        return Node('if','if',[condition,block,elseblock]) 
    }
    getWhileBlock(){
        let block=null;
        let condition= this.getExpression(_break=')')
        if(this.current == '{'){
            this.index+=1;  
            block= this.getBlock();
        }
        else{
            block= this.getExpression(_break=';');
        }
        return Node('while','while',[condition,block]) 
    }
    getChildFunction(name,parent){    
        if( this.mgr.arrowFunction.includes(name)){
            variableName= this.getValue()
            if(variableName=='' && this.current==')'){
                this.index+=1
                return Node(name,'arrowFunction',[parent]) 
            }
            else{   
                if(this.current=='=' && this.next == '>')this.index+=2;
                else throw ExpressionError('map without body');
                variable= Node(variableName,'variable');
                body= this.getExpression(_break=')');
                return Node(name,'arrowFunction',[parent,variable,body]);  
            }      
        }else{ 
            args=  this.getArgs(end=')');
            args.insert(0,parent);
            return  Node(name,'childFunction',args);
        }
    }
    getIndexOperand(name){
        let idx= this.getExpression(_break=']');
        let operand= Node(name,'variable');
        return Node('[]','operator',[operand,idx]) 
    }
    getEnum(value){
        if( value.includes('.')  && this.mgr.isEnum(value)){
            names = value.split('.');
            enumName = names[0];
            enumOption = names[1]; 
            enumValue= this.mgr.getEnumValue(enumName,enumOption);
            return Node(enumValue,'constant');
        }else{
            values= this.mgr.getEnum(value);
            attributes= [];
            for( const name in values){
                _value = values[name];
                attribute = Node(name,'keyValue',[Node(_value,'constant')]);
                attributes.append(attribute);
            }
            return Node('object','object',attributes)
        }
    }
}

                        