import orm from '../orm';
import {Helper} from '../helper';
import '../sintaxis'
import {IOrm,Parameter } from '../model'
import { DatabaseClean } from 'database';
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

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

interface Test
{
  schema:string
  categories:CategoryTest[]  
}
interface CategoryTest
{
  name:string
  schema:string
  context:any
  test:ExpressionTest[]  
}
interface ExpressionTest
{
  name:string
  lambda:any
  context?:any
  expression?:string
  model?:any
  fields?:any
  parameters?:Parameter[]

  sentences?:SentenceTest[]
}
interface SentenceTest
{
  dialect: string
  sentence?: any
  error?:string
}

async function writeTest(orm:IOrm,category:CategoryTest)
{
  let dialects =  Object.values(orm.dialects).filter((p:any)=>p.language=='sql').map((p:any)=> p.name);// ['mysql','postgres','mssql','oracle'];
  for(const q in category.test){  
    let expressionTest = category.test[q] as ExpressionTest;
    expressionTest.sentences=[];
    console.log(category.name+':'+expressionTest.name);
    for(const r in dialects){
      const dialect = dialects[r];
      let sentence=undefined;
      let error=undefined;         
      try{
        expressionTest.expression = orm.lambda(expressionTest.lambda).expression;
        expressionTest.model = (await orm.expression(expressionTest.expression).compile(dialect,category.schema)).model();
        const serialize:any= (await orm.expression(expressionTest.expression).compile(dialect,category.schema)).serialize();
        expressionTest.parameters =serialize.p; 
        expressionTest.fields =serialize.f;           
        sentence = (await orm.expression(expressionTest.expression).compile(dialect,category.schema)).sentence();        
      }
      catch(err)
      {
        error=err.toString();
      }
      finally
      {
        if(error!=undefined)
          expressionTest.sentences.push({dialect:dialect,error:error});
        else if(sentence!=undefined)    
          expressionTest.sentences.push({dialect:dialect,sentence:sentence});
        else
          console.error('error');   
      }
    }
    expressionTest.lambda=expressionTest.lambda.toString();
  }     
  let yamlStr = yaml.safeDump(category);
  fs.writeFileSync(path.join('test/config',Helper.replace(category.name,' ','_')+'.yaml'),yamlStr);
}
async function writeQueryTest(orm:IOrm)
{
  writeTest(orm,{name:'query',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}
           , b:{minValue:10,from:'1997-01-01',to:'1997-12-31'}
   }
  ,test:[{name:'query 1',lambda: (id:number)=> Products.filter(p=>p.id==id)}
    ,{name:'query 2',context:'a',lambda: ()=> Products.map(p=> p.category.name)}
    ,{name:'query 3',lambda: ()=> Products.map(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))}
    ,{name:'query 4',lambda: ()=> Products.filter(p=> p.discontinued != false ).map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})).sort(p=> [p.category,desc(p.name)]) }
    ,{name:'query 5',context:'b',lambda: (minValue:number,from:Date,to:Date)=>  OrderDetails.filter(p=> between(p.order.shippedDate,from,to) && p.unitPrice > minValue ).map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity})).sort(p=> [p.category,p.product]) }
    ,{name:'query 6',lambda: ()=> OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))}
  ]});
}
async function writeNumeriFunctionsTest(orm:IOrm)
{ 
  writeTest(orm,{name:'numeric functions',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}}
  ,test:    
    [{name:'function abs',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id ).map(p=> ({name:p.name,source:p.price*-1 ,result:abs(p.price*-1)}) ) }
    ,{name:'function acos',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:0.25,result:acos(0.25)}))  }
    ,{name:'function asin',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:0.25,result:asin(0.25)})) }
    ,{name:'function atan',context:'a',lambda: (id:number)=>  Products.filter(p=>p.id == id).map(p=>({name:p.name,source:0.25,result:atan(0.25)})) }
    ,{name:'function atan2',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:0.50,result:atan2(0.25,1)})) }
    ,{name:'function ceil',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:25.75,result:ceil(25.75)})) }
    ,{name:'function cos',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:2,result:cos(2)})) }
    ,{name:'function exp',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:1,result:exp(1)})) }
    ,{name:'function floor',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:25.75,result:floor(25.75)})) }
    ,{name:'function ln',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:2,result:ln(2)})) }
    ,{name:'function log',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,m:10,n:20,result:log(10,20)}))  }
    ,{name:'function round',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:135.375,result:round(135.375,2)})) }
    ,{name:'function sign',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:255.5,result:sign(255.5)})) }
    ,{name:'function tan',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:1.75,result:tan(1.75)})) }
    ,{name:'function trunc',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=>({name:p.name,source:135.375,result:trunc(135.375, 2)})) }
  ]});
}  
async function writeGroupByTest(orm:IOrm)
{    
  writeTest(orm,{name:'groupBy',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}}
  ,test:   
    [{name:'groupBy 1',lambda: ()=>  Products.map(p=> ({maxPrice:max(p.price)})) }
    ,{name:'groupBy 2',lambda: ()=> Products.map(p=> ({minPrice:min(p.price)})) }
    ,{name:'groupBy 3',lambda: ()=> Products.map(p=> ({total:sum(p.price)})) }
    ,{name:'groupBy 4',lambda: ()=> Products.map(p=> ({average:avg(p.price)})) }
    ,{name:'groupBy 5',lambda: ()=> Products.map(p=> ({count:count(1)})) }    
    ,{name:'groupBy 6',lambda: ()=> Products.map(p=> ({category:p.categoryId,largestPrice:max(p.price)}))  }
    ,{name:'groupBy 7',lambda: ()=> Products.map(p=> ({category:p.category.name,largestPrice:max(p.price)}))  }
    ,{name:'groupBy 8',context:'a',lambda: (id:number)=> Products.filter(p=>p.id == id).map(p=> ({name:p.name,source:p.price ,result:abs(p.price)}))}
    ,{name:'groupBy 9',lambda: ()=> Products.map(p=> ({category:p.category.name,largestPrice:max(p.price)})).having(p=> p.largestPrice > 100) }
    ,{name:'groupBy 10',lambda: ()=> Products.map(p=> ({category:p.category.name,largestPrice:max(p.price)})).having(p=> p.largestPrice > 100).sort(p=> desc(p.largestPrice))  }
    ,{name:'groupBy 11',lambda: ()=> Products.filter(p=> p.price>5 ).map(p=> ({category:p.category.name,largestPrice:max(p.price)})).having(p=> p.largestPrice > 50).sort(p=> desc(p.largestPrice))  }
  ]});  
}
async function writeIncludeTest(orm:IOrm)
{     
  writeTest(orm,{name:'include',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}}
  ,test:    
    [{name:'include 1',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => p.customer)}
    ,{name:'include 2',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => p.details)}
    ,{name:'include 3',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])}
    ,{name:'include 4',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])}
    ,{name:'include 5',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])}
    ,{name:'include 6',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])}
    ,{name:'include 7',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])}
  ]}); 
}
async function writeInsertsTest(orm:IOrm)
{  
  writeTest(orm,{name:'inserts',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}
           , order : {
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
            }
 }
  ,test:  
    [{name:'insert 1',lambda: ()=> Products.insert()  }
    ,{name:'insert 2',context:'order',lambda: ()=> Orders.insert() }
    ,{name:'insert 3',lambda: (name:string,customerId:number,shippedDate:Date)=> Orders.insert({name:name,customerId:customerId,shippedDate:shippedDate}) }
    ,{name:'insert 4',context:'order',lambda: (o:Order)=> Orders.insert({name:o.name,customerId:o.customerId,shippedDate:o.shippedDate}) }
    ,{name:'insert 5',context:'order',lambda: ()=> Orders.insert().include(p=> p.details) }
    ,{name:'insert 6',context:'order',lambda: ()=> Orders.insert().include(p=> p.details) }
    ,{name:'insert 7',context:'order',lambda: ()=> Orders.insert().include(p=> [p.details,p.customer]) }
    // ,{name:'insert 8',lambda: (entity:Order)=> Orders.insert(entity).include(p=> [p.details,p.customer]) }
  ]});  
}
async function writeUpdateTest(orm:IOrm)
{    
  writeTest(orm,{name:'update',schema:'northwind:0.0.2'
  ,context:{ }
  ,test:  
    [{name:'update 1',lambda: ()=> Orders.update()   }
    ,{name:'update 2',lambda: ()=> OrderDetails.update()   }
    ,{name:'update 3',lambda: (entity:Order)=> Orders.update(entity)  }
    ,{name:'update 4',lambda: (entity:Order)=> Orders.updateAll({name:entity.name})  }
    ,{name:'update 5',lambda: (entity:Order)=> Orders.update({name:entity.name}).filter(p=> p.id == entity.id)  }
    ,{name:'update 6',lambda: (entity:Order)=> Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId }))).filter(p=> p.id == entity.id )   }
    ,{name:'update 7',lambda: ()=> Orders.update().include(p=> p.details)  }
    ,{name:'update 8',lambda: ()=> Orders.update().include(p=> [p.details,p.customer])}
  ]});  
}
async function writeDeleteTest(orm:IOrm)
{     
  writeTest(orm,{name:'delete',schema:'northwind:0.0.2'
  ,context:{ }
  ,test:  
    [{name:'delete 1',lambda: (id:number)=> Orders.delete().filter(p=> p.id == id)  }
    ,{name:'delete 2',lambda: (id:number)=> Orders.delete().include(p=> p.details)  }
    ,{name:'delete 3',lambda: (id:number)=> Orders.delete().filter(p=> p.id == id).include(p=> p.details)   }
    ,{name:'delete 4',lambda: ()=> Orders.deleteAll() }
  ]}); 
}
async function writeBulkInsertTest(orm:IOrm)
{    
  writeTest(orm,{name:'bulkInsert',schema:'northwind:0.0.2'
  ,context:{ }
  ,test:  
    [{name:'bulkInsert 1',lambda: ()=> Categories.bulkInsert() }
    ,{name:'bulkInsert 2',lambda: ()=> Orders.bulkInsert().include(p=> p.details) } 
  ]});
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
// 

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
  let exportFile = 'orm/data/'+source+'-export.json';  
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
    await writeQueryTest(orm);
    await writeNumeriFunctionsTest(orm);
    await writeGroupByTest(orm);
    await writeIncludeTest(orm);
    await writeInsertsTest(orm);
    await writeUpdateTest(orm);
    await writeDeleteTest(orm);
    await writeBulkInsertTest(orm);
    //operators comparation , matematica
    //string functions
    //datetime functions
    //nullables functions  

    // await modify(orm);
    // await crud(orm);
    // await scriptsByDialect(orm,'northwind');
    // await applySchema(orm,schemas);
    // await bulkInsert2(orm);

    //await generateModel(orm,'source');
    
    // await schemaSync(orm,'source');
    // await schemaExport(orm,'source');
    // //test mysql
    // await schemaDrop(orm,'mysql');
    // await schemaSync(orm,'mysql');
    // await schemaImport(orm,'source','mysql');
    // await schemaExport(orm,'mysql');  
    // // //test mariadb
    // await schemaDrop(orm,'mariadb',true);
    // await schemaSync(orm,'mariadb');
    // await schemaImport(orm,'source','mariadb');
    // await schemaExport(orm,'mariadb');
    // // //test postgres 
    // await schemaDrop(orm,'postgres');
    // await schemaSync(orm,'postgres');
    // await schemaImport(orm,'source','postgres');
    // await schemaExport(orm,'postgres');  
       
  
    
    console.log('Ok')
  }
  catch(error){
    console.log(error)
  }
})();
