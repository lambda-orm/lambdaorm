// const assert = require('assert');
// const orm = require("../dist/orm.js");
// let dialect= 'mysql';

// describe('groupBy', function() {
//     describe('max on table', function() {
//         let expression =
//         `Products.map(p=> {maxPrice:max(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT MAX(p.`UnitPrice`) AS maxPrice FROM `Products` p ","cols":[{"name":"maxPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('min on table', function() {
//         let expression =
//         `Products.map(p=> {minPrice:min(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT MIN(p.`UnitPrice`) AS minPrice FROM `Products` p ","cols":[{"name":"minPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result =(await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('sum on table', function() {
//         let expression =
//         `Products.map(p=> {total:sum(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT SUM(p.`UnitPrice`) AS total FROM `Products` p ","cols":[{"name":"total","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('avg on table', function() {
//         let expression =
//         `Products.map(p=> {average:avg(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT AVG(p.`UnitPrice`) AS average FROM `Products` p ","cols":[{"name":"average","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('count on table', function() {
//         let expression =
//         `Products.map(p=> {count:count(1)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT COUNT(1) AS count FROM `Products` p ","cols":[{"name":"count","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('group by for field in table', function() {
//         let expression =
//         `Products.map(p=> {category:p.categoryId,largestPrice:max(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT p.`CategoryID` AS category, MAX(p.`UnitPrice`) AS largestPrice FROM `Products` p GROUP BY p.`CategoryID` ","cols":[{"name":"category","type":"integer"},{"name":"largestPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('group by for field in relation', function() {
//         let expression =
//         `Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, MAX(p.`UnitPrice`) AS largestPrice FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` GROUP BY c.`CategoryName` ","cols":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('groupby+having', function() {
//         let expression =
//         `Products.having(p=> p.largestPrice > 100).map(p=> {category:p.category.name,largestPrice:max(p.price)})
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, MAX(p.`UnitPrice`) AS largestPrice FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` GROUP BY c.`CategoryName` HAVING `largestPrice` > 100 ","cols":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('groupby+having+sort', function() {
//         let expression =
//         `Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})
//                  .having(p=> p.largestPrice > 100)
//                  .sort(p=> desc(p.largestPrice))
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, MAX(p.`UnitPrice`) AS largestPrice FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` GROUP BY c.`CategoryName` HAVING `largestPrice` > 100 ORDER BY `largestPrice` desc ","cols":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
//     describe('filter+groupby+having+sort', function() {
//         let expression =
//         `Products.filter(p=> p.price>5 )
//                  .having(p=> p.largestPrice > 50)
//                  .map(p=> {category:p.category.name,largestPrice:max(p.price)})
//                  .sort(p=> desc(p.largestPrice))
//         `;
//         let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, MAX(p.`UnitPrice`) AS largestPrice FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` WHERE p.`UnitPrice` > 5 GROUP BY c.`CategoryName` HAVING `largestPrice` > 50 ORDER BY `largestPrice` desc ","cols":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"v":[]};
//         it(expression, async function() {
//             let result = (await orm.lambda(expression).compile(dialect,'northwind')).serialize();
//             assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
//         });
//     });
// });
