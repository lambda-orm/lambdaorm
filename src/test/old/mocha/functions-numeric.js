// const assert = require('assert');
// const orm = require("../dist/orm.js");
// let variant= 'mysql';

// describe('numeric functions', function() {
//     describe('abs', function() {
//         let expression =
//         `Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price*-1 ,result:abs(p.price*-1)} )
//         `;
//         let expected =[{"name":"Chai","source":-18,"result":18}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('acos', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:0.25,result:acos(0.25)})
//         `;
//         let expected =[{"name":"Chai","source":0.25,"result":1.318116071652818}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('asin', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:0.25,result:asin(0.25)})
//         `;
//         let expected = [{"name":"Chai","source":0.25,"result":0.25268025514207865}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('atan', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:0.25,result:atan(0.25)})
//         `;
//         let expected = [{"name":"Chai","source":0.25,"result":0.24497866312686414}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('atan2', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:0.50,result:atan2(0.25,1)})
//         `;
//         let expected = [{"name":"Chai","source":0.5,"result":0.24497866312686414}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('ceil', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:25.75,result:ceil(25.75)})
//         `;
//         let expected =[{"name":"Chai","source":25.75,"result":26}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('cos', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:2,result:cos(2)})
//         `;
//         let expected = [{"name":"Chai","source":2,"result":-0.4161468365471424}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('exp', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:1,result:exp(1)})
//         `;
//         let expected =[{"name":"Chai","source":1,"result":2.7182818284590455}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('floor', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:25.75,result:floor(25.75)})
//         `;
//         let expected = [{"name":"Chai","source":25.75,"result":25}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('ln', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:2,result:ln(2)})
//         `;
//         let expected =[{"name":"Chai","source":2,"result":0.6931471805599453}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('log', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,m:10,n:20,result:log(10,20)})
//         `;
//         let expected =[{"name":"Chai","m":10,"n":20,"result":2.302585092994046}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     // describe('remainder', function() {
//     //     //https://www.w3resource.com/oracle/oracle-numeric-functions/oracle-remainder-function.php
//     //     let expression =
//     //     `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})
//     //     `;
//     //     let expected =[{"name":"Chai","source":135.375,"result":135.38}];
//     //     it(expression, async function() {
//     //         let context = {id:1}
//     //         result = await orm.lambda(expression).execute(context,'northwind');
//     //         assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//     //     });
//     // });
//     describe('round', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})
//         `;
//         let expected =[{"name":"Chai","source":135.375,"result":135.38}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('sign', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:255.5,result:sign(255.5)})
//         `;
//         let expected =[{"name":"Chai","source":255.5,"result":1}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('tan', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:1.75,result:tan(1.75)})
//         `;
//         let expected =[{"name":"Chai","source":1.75,"result":-5.52037992250933}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('trunc', function() {
//         let expression =
//         `Products.filter(p=>p.id == id).map(p=>{name:p.name,source:135.375,result:trunc(135.375, 2)})
//         `;
//         let expected =[{"name":"Chai","source":135.375,"result":135.37}];
//         it(expression, async function() {
//             let context = {id:1}
//             result = await orm.lambda(expression).execute(context,'northwind');
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
// });
