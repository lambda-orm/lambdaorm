import {Entity,Property,Operand,Parameter} from './../../model/index'
import {Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from './../index'
import {SqlDialectMetadata} from './dialectMetadata'
import {Helper} from './../../helper'
const SqlString = require('sqlstring');

export class SqlConstant extends Constant
{   
    build(metadata:SqlDialectMetadata){ 
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
    constructor(name:string,type:string='any'){
        super(name,type);
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
    public entity:string
    public mapping:string 
    constructor(entity:string,name:string,type:string,mapping:string){
        super(name,[],type);
        this.entity = entity;
        this.mapping  = mapping;  
    }
    build(metadata:SqlDialectMetadata){ 
        let parts = this.mapping.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',metadata.solveName(name));
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let text = metadata.other('field');
            text =text.replace('{entityAlias}',aliasEntity);
            text =text.replace('{name}',metadata.solveName(name));
            return text;
        }       
    }
}
export class SqlKeyValue extends KeyValue
{
    public field?:SqlField 
    build(metadata:SqlDialectMetadata):any
    {
        return this.children[0].build(metadata);
    }
}
export class SqlArray extends Array
{
    build(metadata:SqlDialectMetadata){ 
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (i>0?', ':'')+this.children[i].build(metadata);              
        }
        return text;
    } 
}
export class SqlObject extends Obj
{
    build(metadata:SqlDialectMetadata){       
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
    build(metadata:SqlDialectMetadata){ 
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
    build(metadata:SqlDialectMetadata){ 
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
    build(metadata:SqlDialectMetadata){       
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
    build(metadata:SqlDialectMetadata){       
        let template = metadata.dml(this.name);
        for(let i=0;i<this.children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template.trim(); 
    }
}
export class SqlSentence extends FunctionRef 
{
    public columns:Property[]
    public parameters:Parameter[]
    public entity:string
    public autoincrement?:Property
    public alias:string
    public clause:string
    constructor(name:string,children:Operand[]=[],entity:string,alias:string,autoincrement?:Property,columns:Property[]=[],parameters:Parameter[]=[]){
        super(name,children);
        this.entity=entity;
        this.autoincrement=autoincrement;
        this.alias=alias;
        this.columns=columns;
        this.parameters=parameters;
        this.clause='';
    }
    public getIncludes():Operand[]
    {
        return this.children.filter(p=> p instanceof SqlSentenceInclude);
    } 
    public build(metadata:SqlDialectMetadata){
        let map =  this.children.find(p=> p.name=='map');   
        let first = this.children.find(p=> p.name=='first');
        let select = (first?first:map) as Operand; 
        let filter = this.children.find(p=> p.name=='filter'); 
        let groupBy = this.children.find(p=> p.name=='groupBy');
        let having = this.children.find(p=> p.name=='having'); 
        let sort = this.children.find(p=> p.name=='sort'); 
        let insert = this.children.find(p=> p instanceof SqlInsert) as SqlInsert|undefined;
        let update = this.children.find(p=> p instanceof SqlUpdate) as SqlUpdate|undefined;
        let _delete = this.children.find(p=> p instanceof SqlDelete) as SqlDelete|undefined;

        let variables:SqlVariable[]=[];
        if(select)this.loadVariables(select,variables);
        if(insert)this.loadVariables(insert,variables);
        if(update)this.loadVariables(update,variables);
        if(_delete)this.loadVariables(_delete,variables);
        if(filter)this.loadVariables(filter,variables);
        if(groupBy)this.loadVariables(groupBy,variables);
        if(having)this.loadVariables(having,variables);
        if(sort)this.loadVariables(sort,variables);
        for(let i=0;i<variables.length;i++ ){
            let variable:SqlVariable = variables[i];
            variable._number = i+1;
        }

        let text = '';
        if(map || first){
            this.clause='select';
            let from = this.children.find(p=> p instanceof SqlFrom) as Operand;
            let joins = this.children.filter(p=> p instanceof SqlJoin).sort((a,b)=> a.name>b.name?1:a.name==b.name?0:-1);
            // let select = (first?first:map) as Operand;
            text = select.build(metadata) + ' ' + this.solveFrom(from,metadata)+ ' ' +  this.solveJoins(joins,metadata);
        }else if(update){
            this.clause='update';
            text = update.build(metadata);
        }else if(_delete){
            this.clause='delete';           
            text = _delete.build(metadata)                       
        }else if(insert){
            this.clause='insert';
            text = insert.build(metadata);          
        }
        if(filter)text = text + filter.build(metadata)+' ';        
        if(groupBy)text = text + groupBy.build(metadata)+' ';        
        if(having)text = text + having.build(metadata)+' ';        
        if(sort)text = text + sort.build(metadata)+' ';               
        return text;
    }
    protected solveJoins(joins:Operand[],metadata:SqlDialectMetadata)
    {
        let text = '';        
        let template = metadata.other('join');
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            let parts = join.name.split('.');
            let joinText  = template.replace('{name}',metadata.solveName(parts[0]));         
            joinText =joinText.replace('{alias}',parts[1]);
            joinText =joinText.replace('{relation}',join.children[0].build(metadata)).trim();           
            text= text + joinText+' ';
        }
        return text;
    }
    protected solveFrom(from:Operand,metadata:SqlDialectMetadata)
    {
        let template = metadata.other('from');
        let parts = from.name.split('.');
        template =template.replace('{name}',metadata.solveName(parts[0])); 
        template =Helper.replaceAll(template,'{alias}',parts[1]);
        return template.trim();
    } 
    protected loadVariables(operand:Operand,variables:SqlVariable[])
    {        
        if(operand instanceof SqlVariable)
            variables.push(operand);
        for(let i=0;i<operand.children.length;i++ )
            this.loadVariables(operand.children[i],variables);
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
    public autoincrement?:Property
    public clause:string
    constructor(name:string,children:Operand[]=[],clause:string,autoincrement?:Property){
        super(name,children);
        this.autoincrement = autoincrement;
        this.clause=clause;
    }
    build(metadata:SqlDialectMetadata){       
        let template = metadata.dml(this.clause);
        let templateColumn = metadata.other('column');
        let fields:string[] = [];
        let values:any[] = [];

        if(this.children[0] instanceof SqlObject){
            let obj = this.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p] as SqlKeyValue;                
                fields.push(templateColumn.replace('{name}',metadata.solveName(keyVal.field?keyVal.field.mapping:keyVal.name)));
                values.push(keyVal.children[0].build(metadata)); 
            }    
        }
        template =template.replace('{name}',metadata.solveName(this.name)); 
        template =template.replace('{fields}',fields.join(','));
        template =template.replace('{values}',values.join(','));
        template =template.replace('{autoincrementField}',this.autoincrement && this.autoincrement.mapping?this.autoincrement.mapping:'0');         
        return template.trim(); 
    }
}
export  class SqlUpdate extends SqlArrowFunction
{
    build(metadata:SqlDialectMetadata){       
        let template = metadata.dml('update');
        let templateColumn = metadata.other('column');
        let templateAssing = metadata.operator('=',2);
        let assings:string[] = [];

        if(this.children[0] instanceof SqlObject){
            let obj = this.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p] as SqlKeyValue;   
                let column = templateColumn.replace('{name}',metadata.solveName(keyVal.field?keyVal.field.mapping:keyVal.name));
                let value = keyVal.children[0].build(metadata);
                let assing= templateAssing.replace('{0}',column);
                assing= assing.replace('{1}',value);
                assings.push(assing);               
            }    
        }        
        let parts = this.name.split('.');
        template =template.replace('{name}',metadata.solveName(parts[0])); 
        template =template.replace('{alias}',parts[1]);
        template =template.replace('{assings}',assings.join(','));      
        return template.trim()+' '; 
    }
}
export class SqlDelete extends SqlArrowFunction {
    build(metadata:SqlDialectMetadata){       
        let template = metadata.dml('delete');               
        let parts = this.name.split('.');
        template =template.replace('{name}',metadata.solveName(parts[0])); 
        template =Helper.replaceAll(template,'{alias}',parts[1]);
        return template.trim()+' '; 
    }
}
export class SqlQuery extends Operand
{
    public sentence:string
    public dialect:string
    public entity:string
    public autoincrement?:Property
    public columns:Property[]
    public parameters:Parameter[]
    constructor(name:string,children:Operand[]=[],dialect:string,sentence:string,entity:string,autoincrement?:Property,columns:Property[]=[],parameters:Parameter[]=[]){
        super(name,children);
        this.dialect=dialect;
        this.sentence=sentence;
        this.entity=entity;
        this.autoincrement=autoincrement;
        this.columns=columns;
        this.parameters=parameters;
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