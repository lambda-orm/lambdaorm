const ConfigExtends = require("config-extends");
(async () => { 

const {exp} = await require("./exp.js");

let schemes =  await ConfigExtends.apply('lib/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    exp.addScheme(scheme);
}

// let expression =
// `
// Product.filter(p=> p.discontinued != false )                 
//         .map(p=> {category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock} )
//         .sort(p=> [p.category,desc(p.name)])
// `;
// SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock 
// FROM Products as p 
// INNER JOIN Categories c ON  c.CategoryID = p.CategoryID
// WHERE p.Discontinued <> 0 
// ORDER BY category, name desc

let expression =
`
OrderDetail.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
        .map(p=> {category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity})
        .sort(p=> [p.category,p.product])
`;
// SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity 
// FROM OrderDetails as o 
// INNER JOIN Orders o1 ON  o1.OrderID = o.OrderID
// INNER JOIN Products p ON  p.ProductID = o.ProductID
// INNER JOIN Categories c ON  c.CategoryID = p.CategoryID
// WHERE o1.ShippedDate BETWEEN '19970101' AND '19971231' 
// ORDER BY category, o.name 

// let expression =
// `
// OrderDetail.map(p=> {order: p.id,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) })
// `;
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
