import {Library} from './library'
import  {DefaultOperator,DefaultArrowFunction} from './operands';

export class CoreLib extends Library
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
    static addition(a:number,b:number):number {return a+b;}
    static subtraction(a:number,b:number):number {return a-b;}
    static negative(a:number):number {return a*-1;}
    static multiplication(a:number,b:number):number {return a*b;}
    static division(a:number,b:number):number {return a/b;}
    static exponentiation(a:number,b:number):number {return a**b;}
    static floorDivision(a:number,b:number):number {return  Math.pow(a,1/b);}
    static mod(a:number,b:number):number {return a%b;}
    static bitAnd(a:number,b:number):number {return a&b;}
    static bitOr(a:number,b:number):number {return a|b;}
    static bitXor(a:number,b:number):number {return a^b;}
    static bitNot(a:number):number {return ~a;}
    static leftShift(a:number,b:number):number {return a<<b;}
    static rightShift(a:number,b:number):number {return a>>b;}
    static equal(a:number,b:number):boolean {return a==b;}
    static notEqual(a:number,b:number):boolean {return a!=b;}
    static greaterThan(a:number,b:number):boolean {return a>b;}
    static lessThan(a:number,b:number):boolean {return a<b;}
    static greaterThanOrEqual(a:number,b:number):boolean {return a>=b;}
    static lessThanOrEqual(a:number,b:number):boolean {return a<=b;}
    static and(a:boolean,b:boolean):boolean {return a&&b;}
    static or(a:boolean,b:boolean):boolean {return a||b;}
    static not(a:boolean):boolean {return !a;}
    static item(list:any[],index:any) {return list[index];}    
}
class And extends DefaultOperator
{
    eval():boolean{
        if(!this.children[0].eval() as boolean)return false;
        return this.children[1].eval() as boolean
    }
}
class Or extends DefaultOperator
{
    eval():any{
        if(this.children[0].eval())return true;
        return this.children[1].eval()
    }
}


class ArrowFunctions{
    static map(list:any,item:any,method:any){}
    static filter(list:any,item:any,method:any){}
    static sort(list:any,item:any,method:any){}
}

class Map extends DefaultArrowFunction
{
    eval():any{
        let rows = [];
        let list:any[] = this.children[0].eval();
        for(let i=0;i<list.length;i++){
            let p = list[i];
            this.children[1].set(p);
            let row = this.children[2].eval();
            rows.push(row);
        }
        return rows; 
    }
}
class Filter extends DefaultArrowFunction
{
    eval():any{}

}
class Sort extends DefaultArrowFunction
{
    eval():any{}

}