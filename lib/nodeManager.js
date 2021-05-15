const {Node,Model,Library} = require("./base.js")

module.exports = class NodeManager
{
    constructor(model){
        this._model = model;  
    }
    serialize(node){
        let children = []                
        for(const p in node.children)
            children.push(this.serialize(node.children[p]));
        if(children.length == 0) return {'n':node.name,'t':node.type};     
        return {'n':node.name,'t':node.type,'c':children}; 
    }
    deserialize(serialized){
        let node = this._deserialize(serialized)
        return this.setParent(node);
    }
    _deserialize(serialized){
        let children = []
        if(serialized.c)
            for(const p in serialized.c)
                children.push(this._deserialize(p));
        return Node(serialized['n'],serialized['t'],children);
    }
    setParent(node,parent=null,index=0){
        try{
            if(parent){
                node.id = parent.id +'.'+index.toString();
                node.parent = parent;
                node.index = index;
                node.level = parent.level +1;
            }  
            else{
                node.id = '0';
                node.parent = null;
                node.index = 0;
                node.level = 0 ;
            } 
            if(node.children.length>0)           
                for(let i=0;i<node.children.length;i++)
                    this.setParent(node.children[i],node,i); 
        }
        catch(error){
            throw 'set parent: '+node.name+' error: '+error.toString();
        }       
        return node; 
    }   
}