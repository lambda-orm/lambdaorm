

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
    public static deltaWithSimpleArrays(current:any,old?:any):Delta
    {
        let delta = new Delta();
        if(current=== undefined || current===null)
           throw `current value can't empty`; 
        for(let name in current){
            const currentValue = current[name];
            if(old=== undefined || old===null) 
              delta.new.push({name:name,new:currentValue});

            const oldValue = old[name];
            if(oldValue===undefined){
               delta.new.push({name:name,new:currentValue});
            }
            else if(oldValue===null && currentValue===null ){
                delta.unchanged.push({name:name,value:oldValue});                
            }
            else if((oldValue!==null && currentValue===null)|| (oldValue===null && currentValue!==null) ){
                delta.changed.push({name:name,new:currentValue,old:oldValue});                
            }
            else if(Array.isArray(currentValue)){
                if(!Array.isArray(oldValue))
                   throw `current value in ${name} is array by old no`
                if(currentValue.length==0 && oldValue.length==0){
                   delta.unchanged.push({name:name,value:oldValue});   
                }
                let arrayDelta = new Delta(); 
                const news = currentValue.filter(p => oldValue.indexOf(p) === -1);
                const unchangeds = currentValue.filter(p => oldValue.indexOf(p) !== -1);
                const removes = oldValue.filter(p => currentValue.indexOf(p) === -1);
                const change = news.length + removes.length > 0;
                for(const p in news)arrayDelta.new.push({name:p,new:p});
                for(const p in removes)arrayDelta.remove.push({name:p,old:p}); 
                for(const p in unchangeds)arrayDelta.unchanged.push({name:p,value:p});
                delta.children.push({name:name,type:'array',change:change,delta:arrayDelta});
            } 
            else if(Helper.isObject(currentValue)){                                
                const objectDelta = Helper.deltaWithSimpleArrays(currentValue,oldValue);
                const change = objectDelta.changed.length + objectDelta.remove.length + objectDelta.new.length > 0;
                delta.children.push({name:name,type:'object',change:change,delta:objectDelta});
            }else if(oldValue!==currentValue){
                delta.changed.push({name:name,new:currentValue,old:oldValue});  
            }else{
                delta.unchanged.push({name:name,value:oldValue}); 
            } 
        }
        for(let name in old){
            if(current[name]=== undefined){
                delta.remove.push({name:name,old:old[name]}); 
            }
        }
        return delta;
    }
}