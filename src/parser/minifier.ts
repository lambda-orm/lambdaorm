
export default class Minifier
{
    private reAlphanumeric:RegExp

    constructor(){
        this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$');
    }
    public minify(expression:string):string[]
    {
        let isString=false;
        let quotes='';
        let buffer = expression.split('');
        let length=buffer.length;
        let result =[];
        let i=0;
        while( i < length){
            const p =buffer[i]        
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
                if(i+1 < length && i-1 >= 0 && this.reAlphanumeric.test(buffer[i-1]) && this.reAlphanumeric.test(buffer[i+1]))
                    result.push(p);
            }                        
            else if (p!='\n' && p!='\r' && p!='\t' )
                result.push(p);
            i+=1;
        }   
        return result;
    }
}
