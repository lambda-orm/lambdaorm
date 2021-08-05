const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");
const fs = require('fs');
const { forEachTrailingCommentRange } = require("typescript");

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

async function queries(orm){

  const expression = 
  ` 
   Customers.include(p=> p.orders.include(p => p.details)
  `;
  //  Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
  let context = {id:10248};
  // await exec( async()=>(await orm.expression(expression).parse()).serialize())
  await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).model())
  await exec(async()=>(await orm.expression(expression).execute(context,'source')));

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
async function modify(orm){

  expression =
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
async function crud(orm){

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
      orm.createTransaction('default',async (transaction)=>{    
        //create order
        let orderId = await exec(async()=>(await orm.expression("Orders.insert().include(p => p.details)").execute(order,'source',transaction)));
        //get order
        let result = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',transaction)));
        let order2 = result[0];
        //updated order
        order2.address = "changed 59 rue de l-Abbaye";
        order2.details[0].discount= true;
        order2.details[1].unitPrice= 10;
        order2.details[2].quantity= 7;
        let updateCount = await exec(async()=>(await orm.expression("Orders.update().include(p => p.details)").execute(order2,'source',transaction)));
        console.log(updateCount);
        //get order
        let order3 = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',transaction)));
        console.log(JSON.stringify(order3));
        // delete
        let deleteCount = await exec(async()=>(await orm.expression("Orders.delete().include(p=> p.details)").execute(order3[0],'source',transaction)));
        console.log(deleteCount);
        //get order
        let order4 = await exec(async()=>(await orm.expression("Orders.filter(p=> p.id == id).include(p => p.details)").execute({id:orderId},'source',transaction)));
        console.log(JSON.stringify(order4));
      });
  }
  catch(error){
    console.log(error);
  }
}
async function scriptsByDialect(orm,schemas){
  let current = schemas['northwind'];
  for(const name in orm.languages['sql'].dialects){
    console.log('\n\n'+name+' -------------------------------------\n');
    await exec( async()=>(orm.schema.delta(current).sentence(name)));
  } 
}

async function bulkInsert(orm){
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

async function bulkInsert2(orm){
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


async function schemaSync(orm,schema,target){
  let targetFile = 'test/namespace/'+target+'/schema.json';
  let targetSchema = fs.existsSync(targetFile)?JSON.parse(fs.readFileSync(targetFile)):null;
  let result = await orm.schema.sync(schema,targetSchema).execute(target);
  fs.writeFileSync(targetFile,JSON.stringify(schema,null,2));
}
async function schemaExport(orm,source){
  let exportFile = 'test/namespace/'+source+'/export.json';
  let schemaFile = 'test/namespace/'+source+'/schema.json';
  let schema = JSON.parse(fs.readFileSync(schemaFile));
  let data= await orm.schema.export(schema).execute(source);
  fs.writeFileSync(exportFile, JSON.stringify(data,null,2));
}
async function schemaSyncFrom(orm,source,target){
  let sourceFile = 'test/namespace/'+source+'/schema.json';
  let targetFile = 'test/namespace/'+target+'/schema.json';
  let sourceSchema = JSON.parse(fs.readFileSync(sourceFile));
  let targetSchema = fs.existsSync(targetFile)?JSON.parse(fs.readFileSync(targetFile)):null;
  let result = await orm.schema.sync(sourceSchema,targetSchema).execute(target);
  fs.writeFileSync(targetFile,JSON.stringify(sourceSchema,null,2));
}
async function schemaImport(orm,source,target){
  let sourceFile = 'test/namespace/'+source+'/export.json';
  let schemaFile = 'test/namespace/'+target+'/schema.json';
  let mappingFile = 'test/namespace/'+target+'/mapping.json';

  let data = fs.readFileSync(sourceFile);
  let schema = JSON.parse(fs.readFileSync(schemaFile));
  let mapping = fs.existsSync(mappingFile)?JSON.parse(fs.readFileSync(mappingFile)):{};
  await orm.schema.import(schema).execute(data,mapping,target);
  fs.writeFileSync(mappingFile,JSON.stringify(mapping,null,2));
}
async function schemaDrop(orm,target){
  let targetFile = 'test/namespace/'+target+'/schema.json';  
  let targetSchema = fs.existsSync(targetFile)?JSON.parse(fs.readFileSync(targetFile)):null;
  if(targetSchema){
    let result = await orm.schema.drop(targetSchema).execute(target,true);
    fs.unlinkSync(targetFile);
  }
}




async function schemaMigrations(orm,schemas){

  
}
 

(async () => { 

  try
  {
    
    let _schemas =  await ConfigExtends.apply('test/schema');
    for(const p in _schemas)orm.schema.load(_schemas[p]);

    let connections = [{name:'default',dialect:'mysql',connection:{host:'0.0.0.0',port:3306,user:'root',password:'root',database:'northwind'}}
                      ,{name:'mysql',dialect:'mysql',connection:{host:'0.0.0.0',port:3307,user:'root',password:'root',database:'northwind'}}
                      ,{name:'mariadb',dialect:'mariadb',connection:{host:'0.0.0.0',port:3308,user:'root',password:'root',database:'northwind'}}
                      ,{name:'postgres',dialect:'postgres',connection:'postgresql://admin:admin@0.0.0.0:5432/northwind'}
                      //,{name:'mssql',dialect:'mssql',connection:{server:'0.0.0.0',authentication:{type:'default',options:{userName:'sa',password:'Adm1n_Adm1n'}},options:{port:1433,database:'Adm1n_Adm1n',trustServerCertificate:true}}}
                    ];
    for(const p in connections)orm.connection.load(connections[p]);

    let namespaces = [{name:'source',connection:'default',schema:'northwind'}
                   ];
    for(const p in namespaces)orm.addNamespace(namespaces[p]);



    // await queries(orm);
    // await modify(orm);
    // await crud(orm);
    // await scriptsByDialect(orm,schemas);
    // await applySchema(orm,schemas);
    // await bulkInsert2(orm);
      await schemaSync(orm,schemas.northwind,'source');
      await schemaExport(orm,'source')      
      await schemaSyncFrom(orm,'source','mysql');
      await schemaDrop(orm,'mysql')
   
    // await schema(orm,schemas);
    console.log('Ok')
  }
  catch(error){
    console.log(error)
  }
})();
