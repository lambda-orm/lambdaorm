
module.exports =class Minifier
{
    constructor(){
        this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$');
    }
    minify(expression){
        let isString=false;
        quotes=null;
        buffer = list(expression);
        length=len(buffer);
        result =[];
        i=0;
        while( i < length){
            p =buffer[i]        
            if(isString && p == quotes)isString=false 
            else if(!isString && (p == '\'' || p=='"')){
                isString=true;
                quotes=p;
            }
            if(isString)
                result.push(p);
            else if(p == ' '){
                //solo deberia dejar los espacios cuando es entre caracteres alfanumericos. 
                //por ejemplo en el caso de "} if" no deberia quedar un espacio 
                if(i+1 < length && this.reAlphanumeric.match(buffer[i-1]) && this.reAlphanumeric.match(buffer[i+1]))
                    result.push(p);
            }                        
            else if (p!='\n' && p!='\r' && p!='\t' )
                result.push(p);
            i+=1;
        }   
        return result;
    }
}
