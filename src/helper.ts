

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

class Delta
{
    public new:NewValue[]
    public changed:ChangedValue[]
    public unchanged:UnchangedValue[]
    public remove:RemovedValue[]
    constructor(){
        this.new = []
        this.changed = []
        this.unchanged = []
        this.remove = []
    }
}

export class Helper {
    public static replaceAll(str:string, find:string, replace:string) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    public static isObject(obj:any) {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    }

    public static delta(source:any,target:any):Delta
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
                if(targetValue.length==0 && sourceValue.length==0){
                    delta.unchanged.push({name:name,value:sourceValue});   
                }
                //TODO: 
            } 
            else if(Helper.isObject(targetValue)){
                let child = Helper.delta(sourceValue,targetValue);
                if(child.changed.length + child.remove.length + child.new.length > 0)
                   delta.changed.push({name:name,new:targetValue,old:sourceValue});
                else    
                   delta.unchanged.push({name:name,value:sourceValue});                
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