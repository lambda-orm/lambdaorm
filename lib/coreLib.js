const {Library} = require("./base.js")

module.exports = class CoreLib extends Library
{
    constructor(){
       super('core'); 
       this.initOperators(); 
    } 

    initOperators(){      

        this.addOperator('+','arithmetic',Operators.addition,4)
        this.addOperator('-','arithmetic',Operators.subtraction,4)
        this.addOperator('-','arithmetic',Operators.negative,8)
    }    
}
class Operators{
      
    static addition(a,b) {return a+b;}
    static subtraction(a,b) {return a-b;}
    static negative(a) {return a*-1;}
}