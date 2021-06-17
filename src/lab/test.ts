// import {Products,Categories,Orders,OrderDetails,Customers,Product,Category,Customer,Order,OrderDetail} from './model'
import orm from "./../orm"  
// import {between,sum } from "./../index"  
const ConfigExtends = require("config-extends");
import './../sintaxis'
import './model';

import Node from './../base/node'
import Context from './../base/context'
import Operand from './../base/operand'

class Query
{
    protected _expression?:string    
    protected _operand?:Operand
    protected _language?:string
    protected _variant?:string
    protected _schema?:string

    public query(value:Function):Query
    {
        let str = value.toString();
        let index = str.indexOf('=>')+2;
        this._expression = str.substring(index,str.length);
        console.log(this._expression);
        return this;
    }
    public expression(expression:string):Query
    {
        this._expression = expression;
        return this;
    }  
    public compile(language:string,variant:string,schema:string):Query 
    {
       if(!this._expression)throw 'Expression not defined';
       this._language = language;
       this._variant = variant;
       this._schema = schema;
       this._operand=orm.compile(this._expression,this._language,this._variant,this._schema);
       console.log(this._operand);
       return this;
    }    
    public serialize():string
    {
        if(!this._operand)throw 'Operand not defined';
        if(!this._language)throw 'Language not defined';
        return orm.serialize(this._operand,this._language );
    }
    public deserialize(serialized:string,language:string):Query
    {
       this._language = language;
       this._operand=orm.deserialize(serialized,this._language);
       return this;
    }
    public async run(context:any,connectionName:string)
    {
        if(!this._operand && !this._expression)
            throw 'expression not defined';
        if(!this._operand){
            let connection = orm.getConnection(connectionName);
            this._operand = orm.compile(this._expression as string,connection.language,connection.variant,connection.schema);   
        }
        return await orm.eval(this._operand as Operand,context,connectionName)
    }
}



(async () => { 


  

    let schemas =  await ConfigExtends.apply('test/config/schema');
    for(const p in schemas){
        let schema =  schemas[p];
        orm.applySchema(schema);
    }
    const cnx = {name:'northwind',language:'sql',variant:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
    orm.addConnection(cnx);


let result

// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]) ,{id:0},'northwind');
// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer.map(p=> p.name),p.details
//                                                                                                         .include(p=> p.product
//                                                                                                             .include(p=> p.category.map(p=> p.name))
//                                                                                                         .map(p=> p.name ))
//                                                                                                         .map(p=>[p.quantity,p.unitPrice])
//                                                                                                         ]) ,{id:0},'northwind');


// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer,p.details.product.category]) ,{id:0},'northwind');

let query = (id:number)=> Orders.filter(p=> p.id == id ).map(p=> ({id:p.id,customer:p.customer.name}));
let query2 =  ()=> OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
                               .map(p=> ({category:p.product.category.name,product:p.product.name}) )
                               .sort(p=> [p.category,p.product]);
// `SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity
// FROM OrderDetails o
// INNER JOIN Orders o1 ON o1.OrderID = o.OrderID
// INNER JOIN Products p ON p.ProductID = o.ProductID
// INNER JOIN Categories c ON c.CategoryID = p.CategoryID
// WHERE o1.ShippedDate BETWEEN '19970101' AND '19971231'
// ORDER BY category, product
// `;                               
let query3= (id:number)=> OrderDetails.filter(p=> p.orderId == id )
                               .map(p=> [p.orderId,as(sum((p.unitPrice*p.quantity*(1-p.discount/100))*100),'subTotal')]); 
// `SELECT o.OrderID AS order, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal
// FROM OrderDetails o
// GROUP BY o.OrderID
// `;                                                              
let updateCategory = (value:Category)=>Categories.update({name:value.name}).filter(p=> p.id == value.id);

let test =(id:number)=> Orders.filter(p=>p.id==id)


result = new Query().query(test).compile('sql','mysql','northwind').serialize();
console.log(result);
// result = orm.compile(expr(query2),'sql','mysql','northwind');
// result = orm.compile(expr(query3),'sql','mysql','northwind');
// result = orm.compile(expr(updateCategory),'sql','mysql','northwind');

})();