const {Library} = require("./base.js");
const {DefaultOperator,DefaultArrowFunction} = require("./language/default.js");

module.exports = class CoreLib extends Library
{
    constructor(){
       super('core','default'); 
       this.initOperators();
       this.initArrowFunctions();  
    } 

    initOperators(){  
       this.addOperator('+',Operators.addition);
       this.addOperator('-',Operators.subtraction);
       this.addOperator('-',Operators.negative);
       this.addOperator('*',Operators.multiplication);
       this.addOperator('/',Operators.division);
       this.addOperator('**',Operators.exponentiation);
       this.addOperator('//',Operators.floorDivision);
       this.addOperator('%',Operators.mod); 

       this.addOperator('&',Operators.bitAnd);
       this.addOperator('|',Operators.bitOr);
       this.addOperator('^',Operators.bitXor);
       this.addOperator('~',Operators.bitNot);
       this.addOperator('<<',Operators.leftShift);
       this.addOperator('>>',Operators.rightShift);

       this.addOperator('==',Operators.equal);
       this.addOperator('!=',Operators.notEqual);
       this.addOperator('>',Operators.greaterThan);
       this.addOperator('<',Operators.lessThan);
       this.addOperator('>=',Operators.greaterThanOrEqual);
       this.addOperator('<=',Operators.lessThanOrEqual);

       this.addOperator('&&',Operators.and,And);
       this.addOperator('||',Operators.or,Or);
       this.addOperator('!',Operators.not);

       this.addOperator('[]',Operators.item);
    }
    
    initArrowFunctions(){ 
        this.addFunction('map',ArrowFunctions.map ,Map,true);
        this.addFunction('filter',ArrowFunctions.filter ,Filter,true);
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
class And extends DefaultOperator
{
    eval(){
        if(!this._children[0].eval())return false;
        return this._children[1].eval()
    }
}
class Or extends DefaultOperator
{
    eval(){
        if(this._children[0].eval())return true;
        return this._children[1].eval()
    }
}


class ArrowFunctions{
    static map(list,item,method){}
    static filter(list,item,method){}
    static sort(list,item,method){}
}

class Map extends DefaultArrowFunction
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
class Filter extends DefaultArrowFunction
{
    eval(){}

}
class Sort extends DefaultArrowFunction
{
    eval(){}

}