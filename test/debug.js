const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");


(async () => { 

let context,result,operand,serialized,expression,cnx;

let schemas =  await ConfigExtends.apply('test/config/schema');
for(const p in schemas){
    let schema =  schemas[p];
    orm.applySchema(schema);
}

cnx = {name:'northwind',language:'sql',variant:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
orm.addConnection(cnx);


expression =
`
Order.filter(p=> p.id == id ) 
     .includes(details.includes(product),customer )
`;


// `
// Order.filter(p=> p.id == id ) 
//      .includes(details.map(p=>p).includes(product) ,customer)
// `;

// let operand = orm.compile(expression,'sql','mysql','northwind');
// let serialized = orm.serialize(operand,'sql');
// // console.log(serialized);


operand = orm.compile(expression,'sql','mysql','northwind');
serialized = orm.serialize(operand,'sql');
console.log(serialized);

context = {id:10582}
result = await orm.run(operand,context,'northwind');
console.log(JSON.stringify(result));

// context = {id:10582}
// result = await orm.exec(()=> Order.filter(p=> p.id == id ).includes(details.includes(product),customer),context,'northwind');
// console.log(JSON.stringify(result));



})();
