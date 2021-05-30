const assert = require('assert');
const ConfigExtends = require("config-extends");

describe('queries', function() {
    let exp= null;
    before(async function() {
        exp = await require("../lib/exp.js");
        let schemes =  await ConfigExtends.apply('lib/config/scheme');
        for(const p in schemes){
            let scheme =  schemes[p];
            exp.addScheme(scheme);
        }
    });
    describe('select from join whrere order by', function() {        
        let expression =
        `Product.filter(p=> p.discontinued != false )                 
                .map(p=> {category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock} )
                .sort(p=> [p.category,desc(p.name)])
        `;
        let expected =
`SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID
WHERE p.Discontinued <> 0 
ORDER BY category, name desc 
`;
        it(expression, function() {
            let sentence = exp.sentence(expression,'northwind','orm','oracle');
            assert.strictEqual(sentence,expected);
        });
    });

    describe('select from joins whrere order by', function() {        
        let expression =
        `OrderDetail.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
                    .map(p=> {category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity})
                    .sort(p=> [p.category,p.product])
        `;
        let expected =
`SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity 
FROM OrderDetails o 
INNER JOIN Orders o1 ON o1.OrderID = o.OrderID
INNER JOIN Products p ON p.ProductID = o.ProductID
INNER JOIN Categories c ON c.CategoryID = p.CategoryID
WHERE o1.ShippedDate BETWEEN '19970101' AND '19971231' 
ORDER BY category, product 
`;
        it(expression, function() {
            let sentence = exp.sentence(expression,'northwind','orm','oracle');
            assert.strictEqual(sentence,expected);
        });
    });
});


