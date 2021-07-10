import {Entity,Property,Operand} from './../../model'
import {Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from '../operands'
import {SqlLanguageVariant} from './variant'

const SqlString = require('sqlstring');

export class SqlConstant extends Constant
{   
    build(metadata:SqlLanguageVariant){ 
        switch (this.type) {
            case 'string':
                return  SqlString.escape(this.name);
            case 'boolean':
                return metadata.other(this.name) 
            case 'number':
                return this.name;      
            default:
                return SqlString.escape(this.name);
        }
    }
}
export class SqlVariable extends Variable
{
    public _number?:number    
    constructor(name:string,children:Operand[]=[]){
        super(name,children);
        this._number  = undefined; 
    }    
    
    build(metadata:any){
        let text = metadata.other('variable');
        text =text.replace('{name}',this.name);
        text =text.replace('{number}',this._number);
        return text;
    }
}
export class SqlField extends Operand
{
    public type:string 
    constructor(name:string,type:string){
        super(name,[]);
        this.type = type; 
    }

    build(metadata:SqlLanguageVariant){ 
        let parts = this.name.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',name);
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let text = metadata.other('field');
            text =text.replace('{entityAlias}',aliasEntity);
            text =text.replace('{name}',name);
            return text;
        }       
    }
}
export class SqlKeyValue extends KeyValue
{
    build(metadata:SqlLanguageVariant):any
    {
        return this.children[0].build(metadata);
    }
}
export class SqlArray extends Array
{
    build(metadata:SqlLanguageVariant){ 
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (i>0?', ':'')+this.children[i].build(metadata);              
        }
        return text;
    } 
}
export class SqlObject extends Obj
{
    build(metadata:SqlLanguageVariant){       
        let text= '';
        let template = metadata.function('as').template;
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].build(metadata);
            let fieldText = template.replace('{value}',value);
            fieldText = fieldText.replace('{alias}',this.children[i].name);
            text += (i>0?', ':'')+fieldText;
        }
        return text;
    }
} 
export class SqlBlock extends Block
{
    build(metadata:SqlLanguageVariant){ 
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (this.children[i].build(metadata)+';');    
        }
        return text;
    } 
}
export class SqlOperator extends Operator
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children);
    }    
    build(metadata:SqlLanguageVariant){ 
        let text = metadata.operator(this.name,this.children.length);
        for(let i=0;i<this.children.length;i++){
            text = text.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return text;  
    }
}                             
export class SqlFunctionRef extends FunctionRef
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
    }    
    build(metadata:SqlLanguageVariant){       
        let funcData = metadata.function(this.name);
        if(!funcData) throw 'Function '+this.name+' not found';        
        let text= '';
        if(funcData.type == 'multiple'){
            let template = funcData.template;
            text = this.children[0].build(metadata);    
            for(let i=1;i<this.children.length;i++){
                text =template.replace('{acumulated}',text);
                text = text.replace('{value}',this.children[i].build(metadata));
            }
        }else{
            text = funcData.template;
            for(let i=0;i<this.children.length;i++){
                text =text.replace('{'+i+'}',this.children[i].build(metadata));
            }
        }
        return text;
    }
}
export class SqlArrowFunction extends ArrowFunction 
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
    }    
    build(metadata:SqlLanguageVariant){       
        let template = metadata.arrow(this.name);
        for(let i=0;i<this.children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template.trim(); 
    }
}
export class SqlSentence extends FunctionRef 
{
    public columns:Property[]
    public variables:string[] //TODO:obtener la lista de nombres de las variables de acuerdo al orden
    public entity:string
     /** Autoincrement primary key */
    public apk:string
    public alias:string
    public clause:string
    

    constructor(name:string,children:Operand[]=[],entity:string,apk:string,alias:string,columns:Property[]){
        super(name,children);
        this.entity=entity;
        this.apk=apk;
        this.alias=alias;
        this.columns=columns;
        this.variables=[];
        this.clause='';
    }
    public getIncludes():Operand[]
    {
        return this.children.filter(p=> p instanceof SqlSentenceInclude);
    } 
    public build(metadata:SqlLanguageVariant){

        let map =  this.children.find(p=> p.name=='map');   
        let first = this.children.find(p=> p.name=='first'); 
        let filter = this.children.find(p=> p.name=='filter'); 
        let groupBy = this.children.find(p=> p.name=='groupBy');
        let having = this.children.find(p=> p.name=='having'); 
        let sort = this.children.find(p=> p.name=='sort'); 
        let insert = this.children.find(p=> p instanceof SqlInsert) as SqlInsert|undefined;//this.children.find(p=> p.name=='insert');
        let update = this.children.find(p=> p instanceof SqlUpdate) as SqlUpdate|undefined;// this.children.find(p=> p.name=='update');
        let _delete = this.children.find(p=> p.name=='delete');
        
        let text = '';
        if(map || first){
            this.clause='select';
            let from = this.children.find(p=> p instanceof SqlFrom) as Operand;
            let joins = this.children.filter(p=> p instanceof SqlJoin).sort((a,b)=> a.name>b.name?1:a.name==b.name?0:-1);

            let select = (first?first:map) as Operand;
            text = select.build(metadata) + ' ' + this.solveFrom(from,metadata)+ ' ' +  this.solveJoins(joins,metadata);
            this.loadVariables(select,this.variables);
          
        }else if(update){
            this.clause='update';
            text = update.build(metadata);
            this.loadVariables(update,this.variables);
        }else if(_delete){
            this.clause='delete';
            let from = this.children.find(p=> p instanceof SqlFrom) as Operand;
            text = _delete.build(metadata) + ' ' + this.solveFrom(from,metadata)+' ';            
            this.loadVariables(_delete,this.variables);            
        }else if(insert){
            this.clause='insert';
            text = insert.build(metadata);
            this.loadVariables(insert,this.variables);            
        }
        if(filter){
            text = text + filter.build(metadata)+' ';
            this.loadVariables(filter,this.variables);
        }
        if(groupBy){
            text = text + groupBy.build(metadata)+' ';
            this.loadVariables(groupBy,this.variables);
        }
        if(having){
            text = text + having.build(metadata)+' ';
            this.loadVariables(having,this.variables);
        }
        if(sort){
            text = text + sort.build(metadata)+' ';
            this.loadVariables(sort,this.variables);
        }        
        return text;
    }
    protected solveJoins(joins:Operand[],metadata:SqlLanguageVariant)
    {
        let text = '';
        
        let template = metadata.other('join');
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            let parts = join.name.split('.');
            let joinText  = template.replace('{name}',parts[0]);         
            joinText =joinText.replace('{alias}',parts[1]);
            joinText =joinText.replace('{relation}',join.children[0].build(metadata)).trim();           
            text= text + joinText+' ';
        }
        return text;
    }
    protected solveFrom(from:Operand,metadata:SqlLanguageVariant)
    {
        let template = metadata.other('from');
        let parts = from.name.split('.');
        template =template.replace('{name}',parts[0]); 
        template =template.replace('{alias}',parts[1]);
        return template.trim();
    }
    protected loadVariables(operand:Operand,variables:string[])
    {        
        if(operand instanceof Variable){
            variables.push(operand.name);
        }       
        for(const k in operand.children){
            const p = operand.children[k];
            this.loadVariables(p,variables);
        } 
    }   
}
export class SqlSentenceInclude extends Operand
{
    public relation:any
    public variable:string

    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children);
        this.relation=relation;
        this.variable=variable;
    }
}
export class SqlFrom extends Operand
{}
export class SqlJoin extends Operand
{}
export class SqlMap extends SqlArrowFunction {}
export class SqlFilter extends SqlArrowFunction {}
export class SqlGroupBy extends SqlArrowFunction {}
export class SqlHaving extends SqlArrowFunction {}
export class SqlSort extends SqlArrowFunction {}
export class SqlInsert extends SqlArrowFunction 
{
    build(metadata:SqlLanguageVariant){       
        let template = metadata.arrow('insert');
        let templateColumn = metadata.other('column');
        let fields:string[] = [];
        let values:any[] = [];

        if(this.children[0] instanceof SqlObject){
            let obj = this.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p];                
                fields.push(templateColumn.replace('{name}',keyVal.name));
                values.push(keyVal.children[0].build(metadata)); 
            }    
        }
        template =template.replace('{name}',this.name);
        template =template.replace('{fields}',fields.join(','));
        template =template.replace('{values}',values.join(','));        
        return template.trim(); 
    }
}
// class SqlInsertFrom extends SqlArrowFunction {}
export  class SqlUpdate extends SqlArrowFunction
{
    build(metadata:SqlLanguageVariant){       
        let template = metadata.arrow('update');
        let templateColumn = metadata.other('column');
        let templateAssing = metadata.operator('=',2);
        let assings:string[] = [];

        if(this.children[0] instanceof SqlObject){
            let obj = this.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p];
                let column = templateColumn.replace('{name}',keyVal.name);
                let value = keyVal.children[0].build(metadata);
                let assing= templateAssing.replace('{0}',column);
                assing= assing.replace('{1}',value);
                assings.push(assing);               
            }    
        }        
        let parts = this.name.split('.');
        template =template.replace('{name}',parts[0]); 
        template =template.replace('{alias}',parts[1]);
        template =template.replace('{assings}',assings.join(','));      
        return template.trim()+' '; 
    }
}
// class SqlUpdateFrom extends SqlArrowFunction {}
export class SqlDelete extends SqlArrowFunction {}

export class SqlQuery extends Operand
{
    public sentence:string
    public entity:string
    /** Autoincrement primary key */
    public apk:string
    public columns:Property[]
    public variables:string[]
    
    constructor(name:string,children:Operand[]=[],sentence:string,entity:string,apk:string,columns:Property[],variables:string[]){
        super(name,children);
        this.sentence=sentence;
        this.entity=entity;
        this.apk=apk;
        this.columns=columns;
        this.variables=variables;
    }
}
export class SqlInclude extends Operand
{
    public relation:any
    public variable:string

    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children);
        this.relation=relation;
        this.variable=variable;
    }
}




