import {LanguageManager} from './languageManager'
import {Node} from './../parser'

export class NodeExpression
{
    protected mgr:LanguageManager 
    public node:Node

    constructor(mgr:LanguageManager,node:Node){        
        this.mgr=mgr
        this.node= node
    }       
    public serialize():any
    {
        return this.mgr.nodeSerialize(this.node);
    }
}