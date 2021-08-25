import {Helper} from '../../helper'
import {Operand,Constant,Variable,Field,KeyValue,List,Obj,Operator,FunctionRef,ArrowFunction,Block,
    Sentence,From,Join,Map,Distinct,Filter,GroupBy,Having,Sort,Page,Insert,Update,Delete,
    SentenceInclude,Query,Include} from './../operands'
import {IQueryBuilder} from './../iQueryBuilder'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlLanguage} from './language'
const SqlString = require('sqlstring');

export class SqlQueryBuilder implements IQueryBuilder
{  
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language;
    }
    public build(sentence:Sentence,dialect:string):Query
    {  
        let metadata = this.language.metadata(dialect);
        return this._build(sentence,metadata);
    }
    public sentence(query:Query):any
    {          
        let mainSentence = query.sentence+';';
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude;
            let includeSentence= this.sentence(include.children[0] as Query);
            mainSentence= mainSentence+'\n'+includeSentence
        }
        return mainSentence;
    }      
    public serialize(operand:Operand):any
    {
        let children = [];    
        if(operand instanceof Query){
            let query = operand as Query;
            for(const k in query.children){
                children.push(this.serialize(query.children[k]));
            }
            return {n:query.name,t:query.constructor.name,c:children,s:query.sentence,f:query.columns,p:query.parameters,e:query.entity,a:query.autoincrement};
        }else if(operand instanceof Include){
            let include = operand as Include;
            for(const k in include.children){
                children.push(this.serialize(include.children[k]));
            }
            return {n:include.name,t:include.constructor.name,c:children,r:include.relation,v:include.variable}; 
        }
    }
    public deserialize(serialized:any):Operand
    {
        throw 'NotImplemented';
    } 
    public _build(sentence:Sentence,metadata:SqlDialectMetadata):Query
    {          
        let children=[];
        let includes = sentence.getIncludes();       
        for(const p in includes){          
            let sentenceInclude =  includes[p];
            let query = this._build(sentenceInclude.children[0] as Sentence,metadata);
            let include = new Include(sentenceInclude.name,[query],sentenceInclude.relation,sentenceInclude.variable); 
            children.push(include);            
        }
        let sqlSentence =this.buildSentence(sentence,metadata as SqlDialectMetadata);
        return new Query(sentence.name,children,metadata.name,sqlSentence,sentence.entity,sentence.autoincrement,sentence.columns,sentence.parameters);
    }   
    private buildOperand(operand:Operand,metadata:SqlDialectMetadata):string
    {
        if(operand instanceof Sentence)
            return this.buildSentence(operand,metadata);
        else if(operand instanceof Insert)
            return this.buildInsert(operand,metadata);
        else if(operand instanceof Update)
            return this.buildUpdate(operand,metadata);
        else if(operand instanceof Delete)
            return this.buildDelete(operand,metadata);
        else if(operand instanceof Page)
            return this.buildPage(operand,metadata);    
        else if(operand instanceof ArrowFunction)
            return this.buildArrowFunction(operand,metadata);
        else if(operand instanceof FunctionRef)
            return this.buildFunctionRef(operand,metadata);
        else if(operand instanceof Operator)
            return this.buildOperator(operand,metadata);
        else if(operand instanceof Block)
            return this.buildBlock(operand,metadata);
        else if(operand instanceof Obj)
            return this.buildObject(operand,metadata);
        else if(operand instanceof List)
            return this.buildList(operand,metadata);
        else if(operand instanceof KeyValue)
            return this.buildKeyValue(operand,metadata);
        else if(operand instanceof Field)
            return this.buildField(operand,metadata);
        else if(operand instanceof Variable)
            return this.buildVariable(operand,metadata);
        else if(operand instanceof Constant)
            return this.buildConstant(operand,metadata);
        else
            throw `Operand ${operand.type} ${operand.name} not supported`;
    }
    private buildSentence(sentence:Sentence,metadata:SqlDialectMetadata):string
    {
        let map =  sentence.children.find(p=> p.name=='map')as Map|undefined;
        let distinct =  sentence.children.find(p=> p.name=='distinct')as Distinct|undefined;
        let select = distinct!=undefined?distinct:map; 
        let insert = sentence.children.find(p=> p instanceof Insert) as Insert|undefined;
        let update = sentence.children.find(p=> p instanceof Update) as Update|undefined;
        let _delete = sentence.children.find(p=> p instanceof Delete) as Delete|undefined;   
        let filter = sentence.children.find(p=> p.name=='filter') as Filter|undefined; 
        let groupBy = sentence.children.find(p=> p.name=='groupBy')as GroupBy|undefined;
        let having = sentence.children.find(p=> p.name=='having')as Having|undefined; 
        let sort = sentence.children.find(p=> p.name=='sort')as Sort|undefined; 
        let page = sentence.children.find(p=> p.name=='page')as Page|undefined; 

        let text = '';
        if(select){
            let from = sentence.children.find(p=> p instanceof From) as Operand;
            let joins = sentence.children.filter(p=> p instanceof Join);
            text = this.buildArrowFunction(select,metadata) + ' ' + this.solveFrom(from,metadata)+ ' ' +  this.solveJoins(joins,metadata);
        }else if(insert)text = this.buildInsert(insert,metadata); 
        else if(update)text = this.buildUpdate(update,metadata);
        else if(_delete)text = this.buildDelete(_delete,metadata); 
        
        if(filter)text = text+ this.buildArrowFunction(filter,metadata)+' ';        
        if(groupBy)text = text+ this.buildArrowFunction(groupBy,metadata)+' ';        
        if(having)text =text + this.buildArrowFunction(having,metadata)+' ';        
        if(sort)text =text + this.buildArrowFunction(sort,metadata)+' ';
        if(page)text =text + this.buildPage(page,metadata)+' ';                 
        return text;
    }
    private solveJoins(joins:Operand[],metadata:SqlDialectMetadata):string
    {
        let list:string[] = [];        
        let template = metadata.other('join');
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            let parts = join.name.split('.');
            let joinText  = template.replace('{name}',metadata.delimiter(parts[0]));         
            joinText =joinText.replace('{alias}',parts[1]);
            joinText =joinText.replace('{relation}', this.buildOperand(join.children[0],metadata)).trim();           
            list.push(joinText);
        }
        return list.join(' ')+' ';
    }
    private solveFrom(from:Operand,metadata:SqlDialectMetadata):string
    {
        let template = metadata.other('from');
        let parts = from.name.split('.');
        template =template.replace('{name}',metadata.delimiter(parts[0])); 
        template =Helper.replace(template,'{alias}',parts[1]);
        return template.trim();
    }
    private buildInsert(operand:Insert,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml(operand.clause);
        let templateColumn = metadata.other('column');
        let fields:string[] = [];
        let values:any[] = [];

        if(operand.children[0] instanceof Object){
            let obj = operand.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p] as KeyValue;                
                fields.push(templateColumn.replace('{name}',metadata.delimiter(keyVal.mapping?keyVal.mapping:keyVal.name)));
                values.push(this.buildOperand(keyVal.children[0],metadata)); 
            }    
        }
        template =template.replace('{name}',metadata.delimiter(operand.name)); 
        template =template.replace('{fields}',fields.join(','));
        template =template.replace('{values}',values.join(','));
        template =template.replace('{autoincrementField}',operand.autoincrement && operand.autoincrement?operand.autoincrement:'0');         
        return template.trim(); 
    }
    private buildUpdate(operand:Update,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml('update');
        let templateColumn = metadata.other('column');
        let templateAssing = metadata.operator('=',2);
        let assings:string[] = [];

        if(operand.children[0] instanceof Object){
            let obj = operand.children[0];
            for(let p in obj.children){
                let keyVal = obj.children[p] as KeyValue;   
                let column = templateColumn.replace('{name}',metadata.delimiter(keyVal.mapping?keyVal.mapping:keyVal.name));
                let value = this.buildOperand(keyVal.children[0],metadata);
                let assing= templateAssing.replace('{0}',column);
                assing= assing.replace('{1}',value);
                assings.push(assing);               
            }    
        }        
        let parts = operand.name.split('.');
        template =template.replace('{name}',metadata.delimiter(parts[0])); 
        template =template.replace('{alias}',parts[1]);
        template =template.replace('{assings}',assings.join(','));      
        return template.trim()+' '; 
    }
    private buildDelete(operand:Delete,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml('delete');               
        let parts = operand.name.split('.');
        template =template.replace('{name}',metadata.delimiter(parts[0])); 
        template =Helper.replace(template,'{alias}',parts[1]);
        return template.trim()+' '; 
    }
    private buildPage(operand:Page,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml('page');               
        let page =  parseInt(operand.children[0].name);
        let records =  parseInt(operand.children[1].name);
        if(page<1)page=1;
        template =template.replace('{offset}',((page-1)*records).toString()); 
        template =Helper.replace(template,'{records}',records.toString());
        return template.trim()+' '; 
    }
    private buildArrowFunction(operand:ArrowFunction,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml(operand.name);
        for(let i=0;i<operand.children.length;i++){
            let text = this.buildOperand(operand.children[i],metadata);
            template =template.replace('{'+i+'}',text);
        }
        return template.trim(); 
    }
    private buildFunctionRef(operand:FunctionRef,metadata:SqlDialectMetadata):string
    {
        let funcData = metadata.function(operand.name);
        if(!funcData) throw 'Function '+operand.name+' not found';        
        let text= '';
        if(funcData.type == 'multiple'){
            let template = funcData.template;
            text = this.buildOperand(operand.children[0],metadata);    
            for(let i=1;i<operand.children.length;i++){
                text =template.replace('{acumulated}',text);
                text = text.replace('{value}',this.buildOperand(operand.children[i],metadata));
            }
        }else{
            text = funcData.template;
            for(let i=0;i<operand.children.length;i++){
                text =text.replace('{'+i+'}',this.buildOperand(operand.children[i],metadata));
            }
        }
        return text;
    }
    private buildOperator(operand:Operator,metadata:SqlDialectMetadata):string
    {
        let text = metadata.operator(operand.name,operand.children.length);
        for(let i=0;i<operand.children.length;i++){
            text = text.replace('{'+i+'}',this.buildOperand(operand.children[i],metadata));
        }
        return text;  
    }
    private buildBlock(operand:Block,metadata:SqlDialectMetadata):string
    {
        let text = ''
        for(let i=0;i<operand.children.length;i++){
            text += (this.buildOperand(operand.children[i],metadata)+';');    
        }
        return text;
    }
    private buildObject(operand:Obj,metadata:SqlDialectMetadata):string
    {
        let text= '';
        let template = metadata.function('as').template;
        for(let i=0;i<operand.children.length;i++){
            let value = this.buildOperand(operand.children[i],metadata);
            let alias =  metadata.delimiter(operand.children[i].name,true);              
            let fieldText = template.replace('{value}',value);
            fieldText = fieldText.replace('{alias}',alias);
            text += (i>0?', ':'')+fieldText;
        }
        return text;
    }
    private buildList(operand:List,metadata:SqlDialectMetadata):string
    {
        let text = ''
        for(let i=0;i<operand.children.length;i++){
            text += (i>0?', ':'')+this.buildOperand(operand.children[i],metadata);              
        }
        return text;
    }
    private buildKeyValue(operand:KeyValue,metadata:SqlDialectMetadata):string
    {
        return this.buildOperand(operand.children[0],metadata);
    }
    private buildField(operand:Field,metadata:SqlDialectMetadata):string
    {
        let parts = operand.mapping.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',metadata.delimiter(name,true));
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let text = metadata.other('field');
            text =text.replace('{entityAlias}',aliasEntity);
            text =text.replace('{name}',metadata.delimiter(name));
            return text;
        } 
    }
    private buildVariable(operand:Variable,metadata:SqlDialectMetadata):string
    {
        let number=operand.number?operand.number:0
        let text = metadata.other('variable');
        text =text.replace('{name}',operand.name);
        text =text.replace('{number}',number.toString());
        return text;
    }
    private buildConstant(operand:Constant,metadata:SqlDialectMetadata):string
    {
        switch (operand.type) {
            case 'string':
                return  SqlString.escape(operand.name);
            case 'boolean':
                return metadata.other(operand.name) 
            case 'number':
                return operand.name;      
            default:
                return SqlString.escape(operand.name);
        }
    }
}