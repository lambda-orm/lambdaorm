export class Node
{ 
    public name: any
    public type: string
    public children: Node[]
    public id?:string
    public parent?: Node
    public index?: number
    public level?:number

    constructor(name:any,type:string,children:Node[]=[]){ 
        this.name = name
        this.type = type         
        this.children  = children
        this.parent = undefined
        this.index = undefined
    }    
}