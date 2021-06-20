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
Products.filter(p=> p.price>5 ).having(p=> p.largestPrice > 50).map(p=> {category:p.category.name,largestPrice:max(p.price)}).sort(p=> desc(p.largestPrice))
`;
//plan 
result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
console.log(JSON.stringify(result));
//ejecucion
let context = {id:1}
result = await orm.expression(expression).run(context,'northwind');
console.log(JSON.stringify(result));

// Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})


// functions
//  numeric:

// Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )





// remainder: 'REMAINDER({0},{1})'



//queries
// Products.filter(p=> p.discontinued != false )                 
//                  .map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}) )
//                  .sort(p=> [p.category,desc(p.name)])
// OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
//                      .map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}))
//                      .sort(p=> [p.category,p.product])       
// OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))

//includes
//Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])
//Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])
//Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
//Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])
//Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])
//Orders.filter(p=>p.id==id).include(p => p.details)
//Orders.filter(p=>p.id==id).include(p => p.customer)



})();
