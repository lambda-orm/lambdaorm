export default abstract class Operand
{
    public name: string
    public id?: string
    public parent?:Operand
    public index?:number
    public level?:number
    public children:Operand[]

    constructor(name:string,children:Operand[]=[]){
        this.name = name;
        this.children  = children;        
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
