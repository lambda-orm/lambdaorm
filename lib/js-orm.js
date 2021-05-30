const ConfigExtends = require("config-extends");
(async () => { 

const {exp} = await require("./exp.js");

let schemes =  await ConfigExtends.apply('lib/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    exp.addScheme(scheme);
}


let expression =
`
OrderDetail.map(p=> {order: p.id,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) })
`;
// SELECT o.OrderDetailID AS order, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal 
// FROM OrderDetails as o 
// GROUP BY o.OrderDetailID 

// let expression =
// `
// OrderDetail.map(p=> p.product.category )
// `;

let node = exp.parse(expression);
// console.log(exp.serialize(node));

let operand = exp.compile(node,'northwind','orm');
// console.log(exp.serialize(operand)); 

let sentence = exp.sentence(operand,'northwind','orm','oracle');
console.log(sentence);

// let cnx = { language:'orm',variant:'oracle',scheme:'northwind',connection:'' }
// let context = {role:'admin'};
// let result = exp.run(cnx,operand,context);
// console.log(result); 

})();
