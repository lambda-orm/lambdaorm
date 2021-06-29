const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");

// const model = require("../dist/lab/model");

async function exec(fn){
    let t1= Date.now()
    let result = await fn()
    let t2= Date.now()
    console.log(t2-t1)
    if(result){
        if (typeof result === 'string' || result instanceof String)console.log(result);
        else console.log(JSON.stringify(result));
    }
    return result;  
}

(async () => { 

let expression,cnx,result;

let schemas =  await ConfigExtends.apply('test/config/schema');
for(const p in schemas){
    let schema =  schemas[p];
    orm.applySchema(schema);
}

cnx = {name:'northwind',dialect:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
orm.addConnection(cnx);

expression =
` 
Orders.update()  
`;


// await exec( async()=>(await orm.expression(expression).parse()).serialize())
// await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).query())
//await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())

//ejecucion
// result = await exec(async()=>(await orm.expression(expression).run({id:10248},'northwind')));
// console.log(result.length)

// Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})
// Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )

//modify
//  Orders.insert({name:o.name,customerId:o.customerId,shippedDate:o.shippedDate})

//  Orders.update({name:entity.name}).filter(p=> p.id == entity.id)
//  Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId }))).filter(p=> p.id == entity.id )

//  Orders.delete().filter(p=> p.id == id)
//  Orders.delete().filter(p=> p.id == id).include(p=> p.details)


//queries
//  Products.map(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))
//  Products.filter(p=> p.discontinued != false )                 
//                  .map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}) )
//                  .sort(p=> [p.category,desc(p.name)])
//  OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
//                      .map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}))
//                      .sort(p=> [p.category,p.product])       
//  OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))

//includes
//  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])
//  Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])
//  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
//  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])
//  Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])
//  Orders.filter(p=>p.id==id).include(p => p.details)
//  Orders.filter(p=>p.id==id).include(p => p.customer)



})();
