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
Orders.filter(p=>p.id==id).include(p => p.customer)
`;

//Orders.insert().include(p => p.details)


// await exec( async()=>(await orm.expression(expression).parse()).serialize())
// await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).query())
//await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())

// //ejecucion
// let product = {
//     "name": "Test",
//     "supplierId": 24,
//     "categoryId": 5,
//     "quantity": "16 - 2 kg boxes",
//     "price": 7,
//     "inStock": 38,
//     "onOrder": 0,
//     "reorderLevel": 25,
//     "discontinued": false
// }

let order = {
    "customerId": "VINET",
    "employeeId": 5,
    "orderDate": "1996-07-03T22:00:00.000Z",
    "requiredDate": "1996-07-31T22:00:00.000Z",
    "shippedDate": "1996-07-15T22:00:00.000Z",
    "shipViaId": 3,
    "freight": 32.38,
    "name": "Vins et alcools Chevalier",
    "address": "59 rue de l-Abbaye",
    "city": "Reims",
    "region": null,
    "postalCode": "51100",
    "country": "France",
    "details": [
      {
        "productId": 11,
        "unitPrice": 14,
        "quantity": 12,
        "discount": 0
      },
      {
        "productId": 42,
        "unitPrice": 9.8,
        "quantity": 10,
        "discount": 0
      },
      {
        "productId": 72,
        "unitPrice": 34.8,
        "quantity": 5,
        "discount": 0
      }
    ]
  }


// result = await exec(async()=>(await orm.expression(expression).execute(order,'northwind')));
// console.log(result.length)

result = await exec(async()=>(await orm.expression(expression).execute({id:10248},'northwind')));
// console.log(result.length)



//modify
//  Products.insert()

//  Orders.insert()
//  Orders.insert({name:name,customerId:customerId,shippedDate:shippedDate})
//  Orders.insert({name:o.name,customerId:o.customerId,shippedDate:o.shippedDate})
//  Orders.insert().include(p=> p.details)
//  Orders.insert().include(p=> [p.details,p.customer])
//  Orders.insert(entity).include(p=> [p.details,p.customer])

//  Orders.update()
//  Orders.update(entity)
//  Orders.update({name:entity.name}) //da error por que preciso definir filter
//  Orders.update({name:entity.name}).filter(p=> p.id == entity.id)
//  Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId }))).filter(p=> p.id == entity.id )
//  Orders.update().include(p=> p.details)
//  Orders.update().include(p=> [p.details,p.customer])

//  Orders.delete().filter(p=> p.id == id)
//  Orders.delete().filter(p=> p.id == id).include(p=> p.details)


//queries
//  Products.filter(p=>p.id==id)
//  Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})
//  Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )
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
