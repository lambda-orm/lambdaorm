import {orm,Parameter} from '../orm'
import '../orm/sintaxis'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

async function exec(fn:any){
    let t1= Date.now()
    let result = await fn()
    let t2= Date.now()
    console.log(t2-t1)
    if(result){
        if (typeof result === 'string' || result instanceof String)console.log(result)
        else console.log(JSON.stringify(result))
    }
    return result  
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
  errors?:number  
}
interface ExpressionTest
{
  name:string
  lambda:any
  context?:any
  expression?:string
  completeExpression?:string
  model?:any
  fields?:any
  parameters?:Parameter[]
  sentences?:SentenceTest[]
  executions?:ExecutionTest[]
  error?:string
  errors?:number
}
interface SentenceTest
{
  dialect: string
  sentence?: any
  error?:string
}
interface ExecutionTest
{
  database: string
  result?: any
  error?:string
}
async function writeTest(dialects:string[],databases:string[],category:CategoryTest):Promise<number>
{
  category.errors=0
  for(const q in category.test){    
    let expressionTest = category.test[q] as ExpressionTest
    expressionTest.sentences=[]
    expressionTest.errors=0
    try{               
      expressionTest.expression = orm.lambda(expressionTest.lambda).expression
      expressionTest.lambda=expressionTest.lambda.toString()
      expressionTest.completeExpression = orm.expression(expressionTest.expression).complete(category.schema) 
      expressionTest.model = await orm.expression(expressionTest.expression).model(category.schema)
      const serialize:any = await orm.expression(expressionTest.expression).serialize(category.schema)
      expressionTest.parameters =serialize.p 
      expressionTest.fields =serialize.f
      for(const r in dialects){
        const dialect = dialects[r]
        let sentence=undefined
        let error=undefined                 
        try{               
          sentence = await orm.expression(expressionTest.expression).sentence(dialect,category.schema)        
        }
        catch(err:any)
        {
          error=err.toString()
        }
        finally
        {
          if(error!=undefined){
            expressionTest.sentences.push({dialect:dialect,error:error})
            expressionTest.errors++
          }          
          else if(sentence!=undefined)    
            expressionTest.sentences.push({dialect:dialect,sentence:sentence})
          else
            console.error('error sentence '+dialect+' '+category.name+':'+expressionTest.name)
        }
      }
      expressionTest.executions=[]
      for(const p in databases){
        const database = databases[p]
        let result=undefined
        let error=undefined   
        try{
          const context =expressionTest.context!=undefined?category.context[expressionTest.context]:{}
          result = await orm.lambda(expressionTest.lambda).execute(context,database)
        }
        catch(err:any)
        {
          error=err.toString()
        }
        finally
        {
          if(error!=undefined){
            expressionTest.executions.push({database:database,error:error})
            expressionTest.errors++
          }
          else if(result!=undefined)    
            expressionTest.executions.push({database:database,result:result})
          else
            console.error('error execution '+database+' '+category.name+':'+expressionTest.name) 
        }
      }
    }
    catch(err:any)
    {
      expressionTest.error = err.toString()
      expressionTest.errors++
    }
    category.errors+=expressionTest.errors
  }
  try{     
    let yamlStr = yaml.safeDump(category)
    fs.writeFileSync(path.join('src/test/dataForTest',category.name.replace(' ','_')+'.yaml'),yamlStr)
  }catch(error){
    console.error(error)
    for(const q in category.test){ 
      try{   
        let expressionTest = category.test[q] as ExpressionTest
        let yamlStr = yaml.safeDump(expressionTest)
      }catch(error){
        console.error(error)
      }  
    }
  }
  return category.errors
}
async function writeQueryTest(dialects:string[],databases:string[]):Promise<number>
{
  return await writeTest(dialects,databases,{name:'query',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}
           , b:{minValue:10,from:'1997-01-01',to:'1997-12-31'}
   }
  ,test:[
         {name:'query 1',lambda: ()=> Products.map(p=>p)}
        ,{name:'query 2',lambda: ()=> Products}
        ,{name:'query 3',context:'a',lambda: (id:number)=> Products.filter(p=>p.id==id).map(p=>p)}
        ,{name:'query 4',context:'a',lambda: (id:number)=> Products.filter(p=>p.id==id)}
        ,{name:'query 5',context:'a',lambda: ()=> Products.map(p=> p.category.name)}
        ,{name:'query 6',lambda: ()=> Products.map(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))}
        ,{name:'query 7',lambda: ()=> Products.filter(p=> p.discontinued != false ).map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})).sort(p=> [p.category,desc(p.name)]) }
        ,{name:'query 8',context:'b',lambda: (minValue:number,from:Date,to:Date)=>  OrderDetails.filter(p=> between(p.order.shippedDate,from,to) && p.unitPrice > minValue ).map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity})).sort(p=> [p.category,p.product]) }
        ,{name:'query 9',lambda: ()=> OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))}
        ,{name:'query 10',lambda: ()=> Products.page(1,1)}
        ,{name:'query 11',lambda: ()=> Products.first(p=> p)}
        ,{name:'query 12',lambda: ()=> Products.last(p=> p)}
        ,{name:'query 13',lambda: ()=> Products.take(p=> p)}
        ,{name:'query 14',lambda: ()=> Products.distinct(p=> p)}
        ,{name:'query 15',lambda: ()=> Products.page(1,1)}
        ,{name:'query 16',context:'a',lambda: ()=> Products.distinct(p=> p.category.name)}
        ,{name:'query 17',lambda: ()=> Products.first(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))}
        ,{name:'query 18',lambda: ()=> Products.filter(p=> p.discontinued != false ).last(p => p) }
  ]})
}
async function writeNumeriFunctionsTest(dialects:string[],databases:string[]):Promise<number>
{ 
  return await writeTest(dialects,databases,{name:'numeric functions',schema:'northwind:0.0.2'
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
  ]})
}  
async function writeGroupByTest(dialects:string[],databases:string[]):Promise<number>
{    
  return await writeTest(dialects,databases,{name:'groupBy',schema:'northwind:0.0.2'
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
    ,{name:'groupBy 9',lambda: ()=> Products.having(p=> max(p.price)> 100).map(p=> ({category:p.category.name,largestPrice:max(p.price)}))}
    ,{name:'groupBy 10',lambda: ()=> Products.having(p=> max(p.price) > 100).map(p=> ({category:p.category.name,largestPrice:max(p.price)})).sort(p=> desc(p.largestPrice))  }
    ,{name:'groupBy 11',lambda: ()=> Products.filter(p=> p.price>5 ).having(p=> max(p.price) > 50).map(p=> ({category:p.category.name,largestPrice:max(p.price)})).sort(p=> desc(p.largestPrice))  }
  ]})  
}
async function writeIncludeTest(dialects:string[],databases:string[]):Promise<number>
{     
  return await writeTest(dialects,databases,{name:'include',schema:'northwind:0.0.2'
  ,context:{ a:{ id: 1}}
  ,test:    
    [
     {name:'include 1',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => p.customer)}
    ,{name:'include 2',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => p.details)}
    ,{name:'include 3',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])}
    ,{name:'include 4',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])}
    ,{name:'include 5',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])}
    ,{name:'include 6',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])}
    ,{name:'include 7',context:'a',lambda: (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])}
    ,{name:'include 8',context:'a',lambda: (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer.map(p=> p.name),p.details.include(p=> p.product.include(p=> p.category.map(p=> p.name)).map(p=> p.name )).map(p=>[p.quantity,p.unitPrice])])}
  ]}) 
}
async function writeInsertsTest(dialects:string[],databases:string[]):Promise<number>
{  
  return await writeTest(dialects,databases,{name:'inserts',schema:'northwind:0.0.2'
  ,context:{ a:{name: "Beverages20", description: "Soft drinks, coffees, teas, beers, and ales" }
            ,b:{name: "Beverages21", description: "Soft drinks, coffees, teas, beers, and ales" }
            ,c:{entity:{name: "Beverages22", description: "Soft drinks, coffees, teas, beers, and ales" }}
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
                  "discount": 10
                },
                {
                  "productId": 42,
                  "unitPrice": 9.8,
                  "quantity": 10,
                  "discount": 10
                },
                {
                  "productId": 72,
                  "unitPrice": 34.8,
                  "quantity": 5,
                  "discount": 10
                }
              ]
            }
 }
  ,test:  
    [
     {name:'insert 1',context:'a',lambda: ()=> Categories.insert()}
    ,{name:'insert 2',context:'b',lambda: (name:string,description:string)=> Categories.insert({name:name,description:description})}  
    ,{name:'insert 3',context:'c',lambda: (entity:Category)=> Categories.insert(entity) }  
    ,{name:'insert 4',context:'order',lambda: ()=> Orders.insert() }
    ,{name:'insert 5',context:'order',lambda: ()=> Orders.insert().include(p=> p.details) }
    ,{name:'insert 6',context:'order',lambda: ()=> Orders.insert().include(p=> [p.details,p.customer]) }    
  ]})  
}
async function writeUpdateTest(dialects:string[],databases:string[]):Promise<number>
{    
  return await writeTest(dialects,databases,{name:'update',schema:'northwind:0.0.2'
,context:{
          a:{
              "id": 7,
              "customerId": "ANATR",
              "employeeId": 7,
              "orderDate": "1996-09-17T22:00:00.000Z",
              "requiredDate": "1996-10-15T22:00:00.000Z",
              "shippedDate": "1996-09-23T22:00:00.000Z",
              "shipViaId": 3,
              "freight": "1.6100",
              "name": "Ana Trujillo Emparedados y helados",
              "address": "Avda. de la Constitucin 2222",
              "city": "Mxico D.F.",
              "region": null,
              "postalCode": "5021",
              "country": "Mexico",
              "details": [
                {
                  "orderId": 7,
                  "productId": 69,
                  "unitPrice": "28.8000",
                  "quantity": "1.0000",
                  "discount": "0.0000"
                },
                {
                  "orderId": 7,
                  "productId": 70,
                  "unitPrice": "12.0000",
                  "quantity": "5.0000",
                  "discount": "0.0000"
                }
              ]
            }
            , b:{entity:{
                  "id": 8,
                  "customerId": "ANATR",
                  "employeeId": 3,
                  "orderDate": "1997-08-07T22:00:00.000Z",
                  "requiredDate": "1997-09-04T22:00:00.000Z",
                  "shippedDate": "1997-08-13T22:00:00.000Z",
                  "shipViaId": 1,
                  "freight": "43.9000",
                  "name": "Ana Trujillo Emparedados y helados",
                  "address": "Avda. de la Constitucin 2222",
                  "city": "Mxico D.F.",
                  "region": null,
                  "postalCode": "5021",
                  "country": "Mexico",
                  "details": [
                    {
                      "orderId": 8,
                      "productId": 14,
                      "unitPrice": "23.2500",
                      "quantity": "3.0000",
                      "discount": "0.0000"
                    },
                    {
                      "orderId": 8,
                      "productId": 42,
                      "unitPrice": "14.0000",
                      "quantity": "5.0000",
                      "discount": "0.0000"
                    },
                    {
                      "orderId": 8,
                      "productId": 60,
                      "unitPrice": "34.0000",
                      "quantity": "10.0000",
                      "discount": "0.0000"
                    }
                  ]
                }
              }
            , c:{postalCode:'xxx'}
            , d:{ "id": "ALFKI",
                  "name": "Alfreds Futterkiste",
                  "contact": "Maria Anders",
                  "phone": "Sales Representative",
                  "address": "Obere Str. 57",
                  "city": "Berlin",
                  "region": null,
                  "postalCode": "12209",
                  "country": "Germany",
                  "orders": [
                    {
                      "id": 1,
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
                          "orderId": 1,
                          "productId": 28,
                          "unitPrice": "45.6000",
                          "quantity": "15.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 1,
                          "productId": 39,
                          "unitPrice": "18.0000",
                          "quantity": "21.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 1,
                          "productId": 46,
                          "unitPrice": "12.0000",
                          "quantity": "2.0000",
                          "discount": "0.0000"
                        }
                      ]
                    },
                    {
                      "id": 2,
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
                          "orderId": 2,
                          "productId": 63,
                          "unitPrice": "43.9000",
                          "quantity": "20.0000",
                          "discount": "0.0000"
                        }
                      ]
                    },
                    {
                      "id": 3,
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
                          "orderId": 3,
                          "productId": 3,
                          "unitPrice": "10.0000",
                          "quantity": "6.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 3,
                          "productId": 76,
                          "unitPrice": "18.0000",
                          "quantity": "15.0000",
                          "discount": "0.0000"
                        }
                      ]
                    },
                    {
                      "id": 4,
                      "customerId": "ALFKI",
                      "employeeId": 1,
                      "orderDate": "1998-01-14T23:00:00.000Z",
                      "requiredDate": "1998-02-11T23:00:00.000Z",
                      "shippedDate": "1998-01-20T23:00:00.000Z",
                      "shipViaId": 3,
                      "freight": "69.5300",
                      "name": "Alfred-s Futterkiste",
                      "address": "Obere Str. 57",
                      "city": "Berlin",
                      "region": null,
                      "postalCode": "12209",
                      "country": "Germany",
                      "details": [
                        {
                          "orderId": 4,
                          "productId": 59,
                          "unitPrice": "55.0000",
                          "quantity": "15.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 4,
                          "productId": 77,
                          "unitPrice": "13.0000",
                          "quantity": "2.0000",
                          "discount": "0.0000"
                        }
                      ]
                    },
                    {
                      "id": 5,
                      "customerId": "ALFKI",
                      "employeeId": 1,
                      "orderDate": "1998-03-15T23:00:00.000Z",
                      "requiredDate": "1998-04-26T22:00:00.000Z",
                      "shippedDate": "1998-03-23T23:00:00.000Z",
                      "shipViaId": 1,
                      "freight": "40.4200",
                      "name": "Alfred-s Futterkiste",
                      "address": "Obere Str. 57",
                      "city": "Berlin",
                      "region": null,
                      "postalCode": "12209",
                      "country": "Germany",
                      "details": [
                        {
                          "orderId": 5,
                          "productId": 6,
                          "unitPrice": "25.0000",
                          "quantity": "16.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 5,
                          "productId": 28,
                          "unitPrice": "45.6000",
                          "quantity": "2.0000",
                          "discount": "0.0000"
                        }
                      ]
                    },
                    {
                      "id": 6,
                      "customerId": "ALFKI",
                      "employeeId": 3,
                      "orderDate": "1998-04-08T22:00:00.000Z",
                      "requiredDate": "1998-05-06T22:00:00.000Z",
                      "shippedDate": "1998-04-12T22:00:00.000Z",
                      "shipViaId": 1,
                      "freight": "1.2100",
                      "name": "Alfred-s Futterkiste",
                      "address": "Obere Str. 57",
                      "city": "Berlin",
                      "region": null,
                      "postalCode": "12209",
                      "country": "Germany",
                      "details": [
                        {
                          "orderId": 6,
                          "productId": 58,
                          "unitPrice": "13.2500",
                          "quantity": "40.0000",
                          "discount": "0.0000"
                        },
                        {
                          "orderId": 6,
                          "productId": 71,
                          "unitPrice": "21.5000",
                          "quantity": "20.0000",
                          "discount": "0.0000"
                        }
                      ]
                    }
                  ]
                }
          }
  ,test:  
    [
     {name:'update 1',context:'a',lambda: ()=> Orders.update()}
    ,{name:'update 2',context:'b',lambda: (entity:Order)=> Orders.update(entity)}
    ,{name:'update 3',context:'c',lambda: (postalCode:string)=> Orders.updateAll({postalCode:postalCode})}
    ,{name:'update 4',context:'b',lambda: (entity:Order)=> Orders.update({name:entity.name}).filter(p=> p.id == entity.id)}
    ,{name:'update 5',context:'b',lambda: (entity:Order)=> Orders.update({name:entity.name}).include(p=> p.details.update(p=> p )).filter(p=> p.id == entity.id )   }
    ,{name:'update 6',context:'b',lambda: (entity:Order)=> Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId }))).filter(p=> p.id == entity.id )   }
    ,{name:'update 7',context:'a',lambda: ()=> Orders.update().include(p=> p.details)}
    ,{name:'update 8',context:'c',lambda: ()=> Customers.update().include(p=> p.orders.include(p=> p.details))}
  ]})  
}
async function writeDeleteTest(dialects:string[],databases:string[]):Promise<number>
{     
  return await writeTest(dialects,databases,{name:'delete',schema:'northwind:0.0.2'
  ,context:{ 
            a: {id:9} 
           ,b: {
              "id": 1,
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
                  "orderId": 1,
                  "productId": 28,
                  "unitPrice": "45.6000",
                  "quantity": "15.0000",
                  "discount": "0.0000"
                },
                {
                  "orderId": 1,
                  "productId": 39,
                  "unitPrice": "18.0000",
                  "quantity": "21.0000",
                  "discount": "0.0000"
                },
                {
                  "orderId": 1,
                  "productId": 46,
                  "unitPrice": "12.0000",
                  "quantity": "2.0000",
                  "discount": "0.0000"
                }
              ]
            }
           ,c: {
                "id": 2,
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
                    "orderId": 2,
                    "productId": 63,
                    "unitPrice": "43.9000",
                    "quantity": "20.0000",
                    "discount": "0.0000"
                  }
                ]
              } 
           ,d:{
                "id": 4,
                "customerId": "ALFKI",
                "employeeId": 1,
                "orderDate": "1998-01-14T23:00:00.000Z",
                "requiredDate": "1998-02-11T23:00:00.000Z",
                "shippedDate": "1998-01-20T23:00:00.000Z",
                "shipViaId": 3,
                "freight": "69.5300",
                "name": "Alfred-s Futterkiste",
                "address": "Obere Str. 57",
                "city": "Berlin",
                "region": null,
                "postalCode": "12209",
                "country": "Germany",
                "details": [
                  {
                    "orderId": 4,
                    "productId": 59,
                    "unitPrice": "55.0000",
                    "quantity": "15.0000",
                    "discount": "0.0000"
                  },
                  {
                    "orderId": 4,
                    "productId": 77,
                    "unitPrice": "13.0000",
                    "quantity": "2.0000",
                    "discount": "0.0000"
                  }
                ]
              }
          ,e: {entity:{
                  "orderId": 5,
                  "productId": 6,
                  "unitPrice": "25.0000",
                  "quantity": "16.0000",
                  "discount": "0.0000"
                }}   
          ,f:{entity: {
                    "id": 5,
                    "customerId": "ALFKI",
                    "employeeId": 1,
                    "orderDate": "1998-03-15T23:00:00.000Z",
                    "requiredDate": "1998-04-26T22:00:00.000Z",
                    "shippedDate": "1998-03-23T23:00:00.000Z",
                    "shipViaId": 1,
                    "freight": "40.4200",
                    "name": "Alfred-s Futterkiste",
                    "address": "Obere Str. 57",
                    "city": "Berlin",
                    "region": null,
                    "postalCode": "12209",
                    "country": "Germany",
                    "details": [
                      {
                      "orderId": 5,
                      "productId": 6,
                      "unitPrice": "25.0000",
                      "quantity": "16.0000",
                      "discount": "0.0000"
                    },
                  {
                    "orderId": 5,
                    "productId": 28,
                    "unitPrice": "45.6000",
                    "quantity": "2.0000",
                    "discount": "0.0000"
                  }
                ]
              }                   
             }    
           }
  ,test:  
    [{name:'delete 1',context:'a',lambda: (id:number)=> OrderDetails.delete().filter(p=> p.orderId == id)  }    
    ,{name:'delete 2',context:'b',lambda: (id:number)=> Orders.delete().include(p=> p.details)  }
    ,{name:'delete 3',context:'c',lambda: (id:number)=> Orders.delete().filter(p=> p.id == id).include(p=> p.details)   }
    ,{name:'delete 4',context:'d',lambda: ()=> Orders.delete().include(p=> p.details) }
    ,{name:'delete 4',context:'d',lambda: (entity:OrderDetail)=> OrderDetails.delete(entity) }
    ,{name:'delete 5',context:'e',lambda: (entity:Order)=> Orders.delete(entity).include(p=> p.details) }
    ,{name:'delete 6',lambda: ()=> OrderDetails.deleteAll() }
  ]}) 
}
//TODO: add delete on cascade , example Orders.delete().cascade(p=> p.details) 
async function writeBulkInsertTest(dialects:string[],databases:string[]):Promise<number>
{    
  return await writeTest(dialects,databases,{name:'bulkInsert',schema:'northwind:0.0.2'
  ,context:{a: [{
                  name: "Beverages4",
                  description: "Soft drinks, coffees, teas, beers, and ales"
                },
                {
                  name: "Condiments4",
                  description: "Sweet and savory sauces, relishes, spreads, and seasonings"
                }
              ]
           ,b: [
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
          ]  

   }
  ,test:  
    [{name:'bulkInsert 1',context:'a',lambda: ()=> Categories.bulkInsert() }
    ,{name:'bulkInsert 2',context:'b',lambda: ()=> Orders.bulkInsert().include(p=> p.details) } 
  ]})
}
async function crud(){

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
  }

  try{
      orm.transaction('source',async (tr )=>{    
        //create order
        let orderId = await exec(async()=>(await tr.execute("Orders.insert().include(p => p.details)",order)))
        //get order
        let result = await exec(async()=>(await tr.execute("Orders.filter(p=> p.id == id).include(p => p.details)",{id:orderId})))
        let order2 = result[0]
        //updated order
        order2.address = "changed 59 rue de l-Abbaye"
        order2.details[0].discount= true
        order2.details[1].unitPrice= 10
        order2.details[2].quantity= 7
        let updateCount = await exec(async()=>(await tr.execute("Orders.update().include(p => p.details)",order2)))
        console.log(updateCount)
        //get order
        let order3 = await exec(async()=>(await tr.execute("Orders.filter(p=> p.id == id).include(p => p.details)",{id:orderId},)))
        console.log(JSON.stringify(order3))
        // delete
        let deleteCount = await exec(async()=>(await tr.execute("Orders.delete().include(p=> p.details)",order3[0])))
        console.log(deleteCount)
        //get order
        let order4 = await exec(async()=>(await tr.execute("Orders.filter(p=> p.id == id).include(p => p.details)",{id:orderId})))
        console.log(JSON.stringify(order4))
      })
  }
  catch(error){
    console.log(error)
  }
}
async function bulkInsert(){
  const expression =`Categories.bulkInsert()`
  const categories =[
    {
      name: "Beverages2",
      description: "Soft drinks, coffees, teas, beers, and ales"
    },
    {
      name: "Condiments2",
      description: "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
  ]

  //await exec( async()=>(await orm.expression(expression).parse()).serialize())
  //await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  //await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
  let result = await exec(async()=>(await orm.expression(expression).execute(categories,'source')))
}
async function bulkInsert2(){
  const expression = `Orders.bulkInsert().include(p=> p.details)`
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
  ]

  //await exec( async()=>(await orm.expression(expression).parse()).serialize())
  // await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
  //await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
  // await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
  let result = await exec(async()=>(await orm.expression(expression).execute(orders,'source')))
}
async function schemaSync(target:string){
  await orm.database.sync(target).execute()
}
async function schemaDrop(target:string,TryAndContinue:boolean=false){
  if(orm.database.exists(target))
    await orm.database.clean(target).execute(TryAndContinue)
}
async function schemaExport(source:string){
  let exportFile = 'orm/data/'+source+'-export.json'  
  let data= await orm.database.export(source)
  fs.writeFileSync(exportFile, JSON.stringify(data,null,2))
}
async function schemaImport(source:string,target:string){
  let sourceFile = 'orm/data/'+source+'-export.json'
  let data = JSON.parse(fs.readFileSync(sourceFile))
  await orm.database.import(target,data)
}

(async () => { 

  try
  {  
    await orm.init(path.join(process.cwd(),'src/test/config.yaml'))
    let errors=0
    let databases:string[]=[]//['mysql','postgres']
    let dialects = Object.values(orm.language.dialects).filter((p:any)=>p.language=='sql').map((p:any)=> p.name)// ['mysql','postgres','mssql','oracle']
    
    // await schemaSync('source')
    // await schemaExport('source')
    // //test mysql
    // await schemaDrop('mysql',true)
    // await schemaSync('mysql')
    // await schemaImport('source','mysql')
    // await schemaExport('mysql')  
    // // //test mariadb
    // // await schemaDrop('mariadb',true)
    // // await schemaSync('mariadb')
    // // await schemaImport('source','mariadb')
    // // await schemaExport('mariadb')
    // //test postgres 
    // await schemaDrop('postgres',true)
    // await schemaSync('postgres')
    // await schemaImport('source','postgres')
    // await schemaExport('postgres')  

    errors=+await writeQueryTest(dialects,databases)
    errors=+await writeNumeriFunctionsTest(dialects,databases)
    errors=+await writeGroupByTest(dialects,databases)
    errors=+await writeIncludeTest(dialects,databases)
    // errors=+await writeInsertsTest(dialects,databases)
    // errors=+await writeUpdateTest(dialects,databases)
    // errors=+await writeDeleteTest(dialects,databases)
    // errors=+await writeBulkInsertTest(dialects,databases)
    // //operators comparation , matematica
    // //string functions
    // //datetime functions
    // //nullables functions 

    // OLDS
    // await modify(orm)
    // await crud(orm)
    // await scriptsByDialect('northwind')
    // await applySchema(schemas)
    // await bulkInsert2(orm)
      
    console.log(errors)
  }
  catch(error:any){
    console.log(error.stack)
  }
})()