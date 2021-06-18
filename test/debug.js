const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");

// const model = require("../dist/lab/model");

(async () => { 

let result,expression,cnx;

let schemas =  await ConfigExtends.apply('test/config/schema');
for(const p in schemas){
    let schema =  schemas[p];
    orm.applySchema(schema);
}

cnx = {name:'northwind',language:'sql',variant:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
orm.addConnection(cnx);

expression =
`
Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])
`;
//Orders.filter(p=>p.id==id).includes(details.includes(product.includes(category)),customer)
//plan
// result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
// console.log(result);
//ejecucion
let context = {id:10582}
result = await orm.expression(expression).run(context,'northwind');
console.log(JSON.stringify(result));

// `
// Order.filter(p=> p.id == id ) 
//      .includes(details.map(p=>p).includes(product) ,customer)
// `;

// let operand = orm.compile(expression,'sql','mysql','northwind');
// let serialized = orm.serialize(operand,'sql');
// // console.log(serialized);



// context = {id:10582}
// result = await orm.exec(()=> Order.filter(p=> p.id == id ).includes(details.includes(product),customer),context,'northwind');
// console.log(JSON.stringify(result));



})();
