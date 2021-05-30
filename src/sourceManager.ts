import {Context, Node,Operand} from './base'

export default class SourceManager
{
    public languages:any
    public schemes:any

    constructor(){
        this.languages={};
        this.schemes={};
    }
   
    addLanguage(value:any){
        this.languages[value.name] =value;
    }
    addLibrary(value:any){
        this.languages[value.language].addLibrary(value);        
    }
    addScheme(value:any){
        this.schemes[value.name] =value;
    }
    serialize(operand:Operand){
        let children = []                
        for(const k in operand.children){
            children.push(this.serialize(operand.children[k]));
        }
        if(children.length == 0) return {'n':operand.name,'t':operand.constructor.name};     
        return {'n':operand.name,'t':operand.constructor.name,'c':children}; 
    }
    deserialize(serialized,language:string){
        let operand = this._deserialize(serialized,language);
        return operand
        //TODO
        // return this.setParent(operand);
    }
    _deserialize(serialized:any,language:string):Operand
    {
        let children = []
        if(serialized.c)
            for(const k in serialized.c){
                const p = serialized.c[k];
                children.push(this._deserialize(p,language));
            }
        return this.languages[language].createOperand(serialized['n'],serialized['t'],children)
    }
    compile(node:Node,scheme:string,language:string):Operand
    {
        let _scheme =  this.schemes[scheme];
        return this.languages[language].compile(node,_scheme);
    }
    sentence(operand:Operand,language:string,variant:string){
        return this.languages[language].sentence(operand,variant);
    } 
    run(cnx:any,operand:Operand,context:Context){
        try{
            let scheme =  this.schemes[cnx.scheme];
            return this.languages[cnx.language].run(operand,context,scheme,cnx);
        }catch(error){
            throw 'eval: '+Operand.name+' error: '+error.toString(); 
        }
    }
}       
