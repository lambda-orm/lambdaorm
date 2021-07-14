import {Node,Parser} from './../parser/index'

export class NodeExpression
{
    protected parser:Parser 
    public node:Node

    constructor(parser:Parser,node:Node){        
        this.parser=parser
        this.node= node
    }       
    public serialize():any
    {
        return this.parser.serialize(this.node);
    }
}