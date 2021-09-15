import {Node,NodeManager} from '../node/index'

export class NodeExpression
{
    protected mgr:NodeManager 
    public node:Node
    constructor(mgr:NodeManager,node:Node){        
        this.mgr=mgr
        this.node= node
    }       
    public serialize():any
    {
        return this.mgr.serialize(this.node)
    }
}
