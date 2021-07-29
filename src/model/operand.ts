export abstract class Operand
{
    public name: string
    public type:string
    public id?: string
    public parent?:Operand
    public index?:number
    public level?:number
    public children:Operand[] 
    constructor(name:string,children:Operand[]=[],type:string='any'){
        this.name = name;
        this.children  = children;
        this.type  = type;
        this.id = undefined;
        this.parent = undefined;
        this.index = 0;
        this.level = 0;
    }    
    eval():any{
        throw 'Not implemented';
    }
    set(value:any){}
    build(metadata:any):any{}
}
