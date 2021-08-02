const assert = require('assert');
const orm = require("../dist/orm.js");
let dialect= 'mysql';    

describe('queries', function() {
    describe('select from join whrere order by', function() {        
        let expression =
        `Products.filter(p=> p.discontinued != false )                 
                .map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}) )
                .sort(p=> [p.category,desc(p.name)])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, p.`ProductName` AS name, p.`QuantityPerUnit` AS quantity, p.`UnitsInStock` AS inStock FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` WHERE p.`Discontinued` <> FALSE ORDER BY `category`, `name` desc ","cols":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"decimal"},{"name":"inStock","type":"decimal"}],"v":[]};
        it(expression, async function() {
            let result = (await orm.expression(expression).compile(dialect,'northwind')).serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('select from joins whrere order by', function() {        
        let expression =
        `OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
                    .map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}))
                    .sort(p=> [p.category,p.product])
        `;
        let expected = {"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, p.`ProductName` AS product, o.`UnitPrice` AS unitPrice, o.`Quantity` AS quantity FROM `Order Details` o INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` INNER JOIN `Orders` o1 ON o1.`OrderID` = o.`OrderID` INNER JOIN `Products` p ON p.`ProductID` = o.`ProductID` WHERE o1.`ShippedDate` BETWEEN '19970101' AND '19971231' ORDER BY `category`, `product` ","cols":[{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}],"v":[]};
        it(expression, async function() {
            let result = (await orm.expression(expression).compile(dialect,'northwind')).serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('group by', function() {        
        let expression =
        `OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))
        `;
        let expected = {"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT o.`OrderID` AS order, SUM((((o.`UnitPrice` * o.`Quantity`) * (1 - (o.`Discount` / 100))) * 100)) AS subTotal FROM `Order Details` o GROUP BY o.`OrderID` ","cols":[{"name":"order","type":"integer"},{"name":"subTotal","type":"any"}],"v":[]};
        it(expression, async function() {
            let result = (await orm.expression(expression).compile(dialect,'northwind')).serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
}); 