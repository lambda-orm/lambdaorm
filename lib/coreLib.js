const {Node,Model,Library,Context,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("./base.js");

module.exports = class CoreLib extends Library
{
    constructor(){
       super('core'); 
       this.initOperators();
       this.initArrowFunctions();  
    } 

    initOperators(){  
       this.addOperator('+','arithmetic',Operators.addition,4);
       this.addOperator('-','arithmetic',Operators.subtraction,4);
       this.addOperator('-','arithmetic',Operators.negative,8);
       this.addOperator('*','arithmetic',Operators.multiplication,5);
       this.addOperator('/','arithmetic',Operators.division,5);
       this.addOperator('**','arithmetic',Operators.exponentiation,6);
       this.addOperator('//','arithmetic',Operators.floorDivision,6);
       this.addOperator('%','arithmetic',Operators.mod,7); 

       this.addOperator('&','bitwise',Operators.bitAnd,4);
       this.addOperator('|','bitwise',Operators.bitOr,4);
       this.addOperator('^','bitwise',Operators.bitXor,4);
       this.addOperator('~','bitwise',Operators.bitNot,4);
       this.addOperator('<<','bitwise',Operators.leftShift,4);
       this.addOperator('>>','bitwise',Operators.rightShift,4);

       this.addOperator('==','comparison',Operators.equal,3);
       this.addOperator('!=','comparison',Operators.notEqual,3);
       this.addOperator('>','comparison',Operators.greaterThan,3);
       this.addOperator('<','comparison',Operators.lessThan,3);
       this.addOperator('>=','comparison',Operators.greaterThanOrEqual,3);
       this.addOperator('<=','comparison',Operators.lessThanOrEqual,3);

       this.addOperator('&&','logical',Operators.and,2,And);
       this.addOperator('||','logical',Operators.or,2,Or);
       this.addOperator('!','logical',Operators.not,4);

       this.addOperator('[]','list',Operators.item,8);
    }
    
    initArrowFunctions(){ 
        this.addFunction('select',ArrowFunctions.select ,Select,true);
        this.addFunction('where',ArrowFunctions.where ,Where,true);
        this.addFunction('sort',ArrowFunctions.sort ,Sort,true);
    }
}
class Operators{      
    static addition(a,b) {return a+b;}
    static subtraction(a,b) {return a-b;}
    static negative(a) {return a*-1;}
    static multiplication(a,b) {return a*b;}
    static division(a,b) {return a/b;}
    static exponentiation(a,b) {return a**b;}
    static floorDivision(a,b) {return  Math.pow(a,1/b);}
    static mod(a,b) {return a%b;}
    static bitAnd(a,b) {return a&b;}
    static bitOr(a,b) {return a|b;}
    static bitXor(a,b) {return a^b;}
    static bitNot(a) {return ~a;}
    static leftShift(a,b) {return a<<b;}
    static rightShift(a,b) {return a>>b;}
    static equal(a,b) {return a==b;}
    static notEqual(a,b) {return a!=b;}
    static greaterThan(a,b) {return a>b;}
    static lessThan(a,b) {return a<b;}
    static greaterThanOrEqual(a,b) {return a>=b;}
    static lessThanOrEqual(a,b) {return a<=b;}
    static and(a,b) {return a&&b;}
    static or(a,b) {return a||b;}
    static not(a) {return !a;}
    static item(list,index) {return list[index];}    
}
class And extends Operator
{
    eval(){
        if(!this._children[0].eval())return false;
        return this._children[1].eval()
    }
}
class Or extends Operator
{
    eval(){
        if(this._children[0].eval())return true;
        return this._children[1].eval()
    }
}


class ArrowFunctions{
    static select(list,item,method){}
    static where(list,item,method){}
    static sort(list,item,method){}
}

class Select extends ArrowFunction
{
    eval(){
        let rows = [];
        let list = this._children[0].eval();
        for(let i=0;i<list.length;i++){
            let p = list[i];
            this._children[1].set(p);
            let row = this._children[2].eval();
            rows.push(row);
        }
        return rows; 
    }
}
class Where extends ArrowFunction
{
    eval(){}

}
class Sort extends ArrowFunction
{
    eval(){}

}