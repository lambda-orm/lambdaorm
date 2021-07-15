

interface NewValue
{
    name:string
    new:any
}
interface ChangedValue
{
    name:string
    new:any
    old:any
}
interface UnchangedValue
{
    name:string
    value:any
}
interface RemovedValue
{
    name:string
    old:any
}

interface ChildDelta
{
    name:string
    type:string
    change:boolean
    delta:Delta
    
}

class Delta
{
    
    public new:NewValue[]
    public changed:ChangedValue[]
    public unchanged:UnchangedValue[]
    public remove:RemovedValue[]
    public children:ChildDelta[]
    constructor(){
        this.new = []
        this.changed = []
        this.unchanged = []
        this.remove = []
        this.children = []
    }
}

export class Helper {
    public static replaceAll(str:string, find:string, replace:string) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    public static isObject(obj:any) {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    }

    public static deltaWithSimpleArrays(source:any,target:any):Delta
    {
        let delta = new Delta();
        for(let name in target){
            let sourceValue = source[name];
            let targetValue = target[name];

            if(sourceValue===undefined){
               delta.new.push({name:name,new:targetValue});
            }
            else if(sourceValue===null && targetValue===null ){
                delta.unchanged.push({name:name,value:sourceValue});                
            }
            else if((sourceValue!==null && targetValue===null)|| (sourceValue===null && targetValue!==null) ){
                delta.changed.push({name:name,new:targetValue,old:sourceValue});                
            }
            else if(Array.isArray(targetValue)){
                if(!Array.isArray(sourceValue))
                   throw `target value in ${name} is array by source no`
                if(targetValue.length==0 && sourceValue.length==0){
                   delta.unchanged.push({name:name,value:sourceValue});   
                }
                let arrayDelta = new Delta(); 
                const news = targetValue.filter(p => sourceValue.indexOf(p) === -1);
                const unchangeds = targetValue.filter(p => sourceValue.indexOf(p) !== -1);
                const removes = sourceValue.filter(p => targetValue.indexOf(p) === -1);
                const change = news.length + removes.length > 0;
                for(const p in news)arrayDelta.new.push({name:p,new:p});
                for(const p in removes)arrayDelta.remove.push({name:p,old:p}); 
                for(const p in unchangeds)arrayDelta.unchanged.push({name:p,value:p});
                delta.children.push({name:name,type:'array',change:change,delta:arrayDelta});
            } 
            else if(Helper.isObject(targetValue)){                                
                const objectDelta = Helper.deltaWithSimpleArrays(sourceValue,targetValue);
                const change = objectDelta.changed.length + objectDelta.remove.length + objectDelta.new.length > 0;
                delta.children.push({name:name,type:'object',change:change,delta:objectDelta});
            }else if(sourceValue!==targetValue){
                delta.changed.push({name:name,new:targetValue,old:sourceValue});  
            }else{
                delta.unchanged.push({name:name,value:sourceValue}); 
            } 
        }
        for(let name in source){
            if(target[name]=== undefined){
                delta.remove.push({name:name,old:source[name]}); 
            }
        }
        return delta;
    }
}