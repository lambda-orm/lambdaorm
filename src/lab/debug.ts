import orm from '../orm';
import '../sintaxis'
import {IOrm } from '../model'
const fs = require('fs');
const path = require('path');


async function exec(fn:any){
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

async function queries(orm:IOrm)
{  
  const expression = ()=> Customers.include(p=> p.orders.include(p => p.details))
  //  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
  let context:any = {id:10248};
  // await exec( async()=>(await orm.expression(expression).parse()).serialize())
  await exec( async()=>(await orm.lambda(expression).compile('mysql','northwind')).serialize())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).model())
  await exec(async()=>(await orm.lambda(expression).execute(context,'source')));

  //queries
  //  Products.filter(p=>p.id==id)
  //  Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})
  //  Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )
  //  Products.map(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))
  //  Products.filter(p=> p.discontinued != false )                 
  //                  .map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}) )
  //                  .sort(p=> [p.category,desc(p.name)])
  //  OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') && p.unitPrice > minValue )                 
  //              .map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}))
  //              .sort(p=> [p.category,p.product])       
  //  OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))

  //includes
  //  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])
  //  Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])
  //  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
  //  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])
  //  Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])
  //  Orders.filter(p=>p.id==id).include(p => p.details)
  //  Orders.filter(p=>p.id==id).include(p => p.customer)

}
async function modify(orm:IOrm){

  const expression =
  ` 
  Orders.insert().include(p=> p.details)
  `;
    
  // await exec( async()=>(await orm.expression(expression).parse()).serialize())
  await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  //await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
  
  // let result = await exec(async()=>(await orm.expression(expression).execute(context,'source')));
  // console.log(result.length);
  
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
//  Orders.delete().include(p=> p.details)
//  Orders.delete().filter(p=> p.id == id).include(p=> p.details)


  
}
async function crud(orm:IOrm){

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
        "discount": false
      },
      {
        "productId": 42,
        "unitPrice": 9.8,
        "quantity": 10,
        "discount": false
      },
      {
        "productId": 72,
        "unitPrice": 34.8,
        "quantity": 5,
        "discount": false
      }
    ]
  };

  try{
      orm.transaction('default',async (tr )=>{    
        //create order
        let orderId = await exec(async()=>(await orm.expression("Orders.insert().include(p => p.details)").execute(order,'source',tr)));
        //get order
        let result = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',tr)));
        let order2 = result[0];
        //updated order
        order2.address = "changed 59 rue de l-Abbaye";
        order2.details[0].discount= true;
        order2.details[1].unitPrice= 10;
        order2.details[2].quantity= 7;
        let updateCount = await exec(async()=>(await orm.expression("Orders.update().include(p => p.details)").execute(order2,'source',tr)));
        console.log(updateCount);
        //get order
        let order3 = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',tr)));
        console.log(JSON.stringify(order3));
        // delete
        let deleteCount = await exec(async()=>(await orm.expression("Orders.delete().include(p=> p.details)").execute(order3[0],'source',tr)));
        console.log(deleteCount);
        //get order
        let order4 = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',tr)));
        console.log(JSON.stringify(order4));
      });
  }
  catch(error){
    console.log(error);
  }
}
// async function scriptsByDialect(orm:IOrm,schemaName:string){ 
//   const schema= orm.schema.get(schemaName) as Schema;
//   for(const name in orm.languages['sql'].dialects){
//     console.log('\n\n'+name+' -------------------------------------\n');
//     await exec( async()=>(orm.schema.sync(schema).sentence(name)));
//   } 
// }
async function bulkInsert(orm:IOrm){
  const expression =`Categories.bulkInsert()`;
  const categories =[
    {
      name: "Beverages2",
      description: "Soft drinks, coffees, teas, beers, and ales"
    },
    {
      name: "Condiments2",
      description: "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
  ];

  //await exec( async()=>(await orm.expression(expression).parse()).serialize())
  //await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  //await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
  let result = await exec(async()=>(await orm.expression(expression).execute(categories,'source')));
}
async function bulkInsert2(orm:IOrm){
  const expression = `Orders.bulkInsert().include(p=> p.details)`;
  const orders= [
    {
      
      "customerId": "ALFKI",
      "employeeId": 6,
      "orderDate": "1997-08-24T22:00:00.000Z",
      "requiredDate": "1997-09-21T22:00:00.000Z",
      "shippedDate": "1997-09-01T22:00:00.000Z",
      "shipViaId": 1,
      "freight": "29.4600",
      "name": "Alfreds Futterkiste",
      "address": "Obere Str. 57",
      "city": "Berlin",
      "region": null,
      "postalCode": "12209",
      "country": "Germany",
      "details": [
        {          
          "productId": 28,
          "unitPrice": "45.6000",
          "quantity": 15,
          "discount": 0
        },
        {
          "productId": 39,
          "unitPrice": "18.0000",
          "quantity": 21,
          "discount": 0
        },
        {          
          "productId": 46,
          "unitPrice": "12.0000",
          "quantity": 2,
          "discount": 0
        }
      ]
    },
    {      
      "customerId": "ALFKI",
      "employeeId": 4,
      "orderDate": "1997-10-02T22:00:00.000Z",
      "requiredDate": "1997-10-30T23:00:00.000Z",
      "shippedDate": "1997-10-12T22:00:00.000Z",
      "shipViaId": 2,
      "freight": "61.0200",
      "name": "Alfred-s Futterkiste",
      "address": "Obere Str. 57",
      "city": "Berlin",
      "region": null,
      "postalCode": "12209",
      "country": "Germany",
      "details": [
        {          
          "productId": 63,
          "unitPrice": "43.9000",
          "quantity": 20,
          "discount": 0
        }
      ]
    },
    {      
      "customerId": "ALFKI",
      "employeeId": 4,
      "orderDate": "1997-10-12T22:00:00.000Z",
      "requiredDate": "1997-11-23T23:00:00.000Z",
      "shippedDate": "1997-10-20T22:00:00.000Z",
      "shipViaId": 1,
      "freight": "23.9400",
      "name": "Alfred-s Futterkiste",
      "address": "Obere Str. 57",
      "city": "Berlin",
      "region": null,
      "postalCode": "12209",
      "country": "Germany",
      "details": [
        {          
          "productId": 3,
          "unitPrice": "10.0000",
          "quantity": 6,
          "discount": 0
        },
        {          
          "productId": 76,
          "unitPrice": "18.0000",
          "quantity": 15,
          "discount": 0
        }
      ]
    },
  ];

  //await exec( async()=>(await orm.expression(expression).parse()).serialize())
  // await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  //await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
  let result = await exec(async()=>(await orm.expression(expression).execute(orders,'source')));
}
async function generateModel(orm:IOrm,name:string){
  let content = orm.database.model(name);
  fs.writeFileSync('src/lab/model.d.ts',content);
}
async function schemaSync(orm:IOrm,target:string){
  await orm.database.sync(target).execute();
}
async function schemaDrop(orm:IOrm,target:string,TryAndContinue:boolean=false){
  if(orm.database.exists(target))
    await orm.database.clean(target).execute(undefined,TryAndContinue);
}
async function schemaExport(orm:IOrm,source:string){
  let exportFile = 'test/data/'+source+'-export.json';  
  let data= await orm.database.export(source);
  fs.writeFileSync(exportFile, JSON.stringify(data,null,2));
}
async function schemaImport(orm:IOrm,source:string,target:string){
  let sourceFile = 'test/data/'+source+'-export.json';
  let data = JSON.parse(fs.readFileSync(sourceFile));
  await orm.database.import(target,data);
}

(async () => { 

  try
  {  
    await orm.init(path.join(process.cwd(),'orm/config.yaml'));
    // await queries(orm);
    // await modify(orm);
    // await crud(orm);
    // await scriptsByDialect(orm,'northwind');
    // await applySchema(orm,schemas);
    // await bulkInsert2(orm);

    //await generateModel(orm,'source');
    
    await schemaSync(orm,'source');
    await schemaExport(orm,'source');
    //test mysql
    await schemaDrop(orm,'mysql');
    await schemaSync(orm,'mysql');
    await schemaImport(orm,'source','mysql');
    await schemaExport(orm,'mysql');  
    // //test mariadb
    // await schemaDrop(orm,'mariadb');
    // await schemaSync(orm,'mariadb');
    // await schemaImport(orm,'source','mariadb');
    // await schemaExport(orm,'mariadb');
    // //test postgres 
    await schemaDrop(orm,'postgres',true);
    await schemaSync(orm,'postgres');
    await schemaImport(orm,'source','postgres');
    await schemaExport(orm,'postgres');  
       
  
    
    console.log('Ok')
  }
  catch(error){
    console.log(error)
  }
})();
