const assert = require('assert');
const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");

describe('queries', function() {

    before(async function() {
        let schemas =  await ConfigExtends.apply('test/config/schema');
        for(const p in schemas){
            let schema =  schemas[p];
            orm.applySchema(schema);
        }
    });
    describe('select from join whrere order by', function() {        
        let expression =
        `Products.filter(p=> p.discontinued != false )                 
                 .map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}) )
                 .sort(p=> [p.category,desc(p.name)])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, p.`ProductName` AS name, p.`QuantityPerUnit` AS quantity, p.`UnitsInStock` AS inStock FROM `Products` p INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` WHERE p.`Discontinued` <> FALSE ORDER BY `category`, `name` desc ","cols":["category","name","quantity","inStock"],"v":[]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('select from joins whrere order by', function() {        
        let expression =
        `OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
                     .map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}))
                     .sort(p=> [p.category,p.product])
        `;
        let expected = {"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryName` AS category, p.`ProductName` AS product, o.`UnitPrice` AS unitPrice, o.`Quantity` AS quantity FROM `Order Details` o INNER JOIN `Categories` c ON c.`CategoryID` = p.`CategoryID` INNER JOIN `Orders` o1 ON o1.`OrderID` = o.`OrderID` INNER JOIN `Products` p ON p.`ProductID` = o.`ProductID` WHERE o1.`ShippedDate` BETWEEN '19970101' AND '19971231' ORDER BY `category`, `product` ","cols":["category","product","unitPrice","quantity"],"v":[]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('group by', function() {        
        let expression =
        `OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))
        `;
        let expected = {"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT o.`OrderID` AS order, SUM((((o.`UnitPrice` * o.`Quantity`) * (1 - (o.`Discount` / 100))) * 100)) AS subTotal FROM `Order Details` o GROUP BY o.`OrderID` ","cols":["order","subTotal"],"v":[]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
});
 
describe('include', function() {

    before(async function() {
        let schemas =  await ConfigExtends.apply('test/config/schema');
        for(const p in schemas){
            let schema =  schemas[p];
            orm.applySchema(schema);
        }
    });
    describe('include relation oneToMany', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => p.customer)
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CustomerID` AS id, c.`CompanyName` AS name, c.`ContactName` AS contact, c.`ContactTitle` AS phone, c.`Address` AS address, c.`City` AS city, c.`Region` AS region, c.`PostalCode` AS postalCode, c.`Country` AS country FROM `Customers` c WHERE  c.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include relation manyToOne', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => p.details)
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT o1.`OrderID` AS orderId, o1.`ProductID` AS productId, o1.`UnitPrice` AS unitPrice, o1.`Quantity` AS quantity, o1.`Discount` AS discount FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["orderId","productId","unitPrice","quantity","discount"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include relation manyToOne and oneToMany', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT o1.`OrderID` AS orderId, o1.`ProductID` AS productId, o1.`UnitPrice` AS unitPrice, o1.`Quantity` AS quantity, o1.`Discount` AS discount FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["orderId","productId","unitPrice","quantity","discount"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"},{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CustomerID` AS id, c.`CompanyName` AS name, c.`ContactName` AS contact, c.`ContactTitle` AS phone, c.`Address` AS address, c.`City` AS city, c.`Region` AS region, c.`PostalCode` AS postalCode, c.`Country` AS country FROM `Customers` c WHERE  c.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include relation two levels', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[{"n":"product","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT p.`ProductID` AS id, p.`ProductName` AS name, p.`SupplierID` AS supplierId, p.`CategoryID` AS categoryId, p.`QuantityPerUnit` AS quantity, p.`UnitPrice` AS price, p.`UnitsInStock` AS inStock, p.`UnitsOnOrder` AS onOrder, p.`ReorderLevel` AS reorderLevel, p.`Discontinued` AS discontinued FROM `Products` p WHERE  p.`ProductID` IN (?) ","cols":["id","name","supplierId","categoryId","quantity","price","inStock","onOrder","reorderLevel","discontinued"],"v":["list_id"]}],"r":{"name":"product","type":"oneToMany","from":"productId","to":{"entity":"Products","property":"id"}},"v":"list_id"}],"s":"SELECT o1.`OrderID` AS orderId, o1.`ProductID` AS productId, o1.`UnitPrice` AS unitPrice, o1.`Quantity` AS quantity, o1.`Discount` AS discount FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["orderId","productId","unitPrice","quantity","discount"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"},{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CustomerID` AS id, c.`CompanyName` AS name, c.`ContactName` AS contact, c.`ContactTitle` AS phone, c.`Address` AS address, c.`City` AS city, c.`Region` AS region, c.`PostalCode` AS postalCode, c.`Country` AS country FROM `Customers` c WHERE  c.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include relation three levels', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[{"n":"product","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[{"n":"category","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CategoryID` AS id, c.`CategoryName` AS name, c.`Description` AS description FROM `Categories` c WHERE  c.`CategoryID` IN (?) ","cols":["id","name","description"],"v":["list_id"]}],"r":{"name":"category","type":"oneToMany","from":"categoryId","to":{"entity":"Categories","property":"id"}},"v":"list_id"}],"s":"SELECT p.`ProductID` AS id, p.`ProductName` AS name, p.`SupplierID` AS supplierId, p.`CategoryID` AS categoryId, p.`QuantityPerUnit` AS quantity, p.`UnitPrice` AS price, p.`UnitsInStock` AS inStock, p.`UnitsOnOrder` AS onOrder, p.`ReorderLevel` AS reorderLevel, p.`Discontinued` AS discontinued FROM `Products` p WHERE  p.`ProductID` IN (?) ","cols":["id","name","supplierId","categoryId","quantity","price","inStock","onOrder","reorderLevel","discontinued"],"v":["list_id"]}],"r":{"name":"product","type":"oneToMany","from":"productId","to":{"entity":"Products","property":"id"}},"v":"list_id"}],"s":"SELECT o1.`OrderID` AS orderId, o1.`ProductID` AS productId, o1.`UnitPrice` AS unitPrice, o1.`Quantity` AS quantity, o1.`Discount` AS discount FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["orderId","productId","unitPrice","quantity","discount"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"},{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c1.`CustomerID` AS id, c1.`CompanyName` AS name, c1.`ContactName` AS contact, c1.`ContactTitle` AS phone, c1.`Address` AS address, c1.`City` AS city, c1.`Region` AS region, c1.`PostalCode` AS postalCode, c1.`Country` AS country FROM `Customers` c1 WHERE  c1.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include with selected fieds', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT o1.`Quantity` AS quantity, o1.`UnitPrice` AS unitPrice, o1.`ProductID` AS productId FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["quantity","unitPrice","productId"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"},{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CustomerID` AS id, c.`CompanyName` AS name, c.`ContactName` AS contact, c.`ContactTitle` AS phone, c.`Address` AS address, c.`City` AS city, c.`Region` AS region, c.`PostalCode` AS postalCode, c.`Country` AS country FROM `Customers` c WHERE  c.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });
    describe('include with selected fieds on two level', function() {        
        let expression =
        `Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])
        `;
        let expected ={"n":"sentence","t":"SqlQuery","c":[{"n":"details","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[{"n":"product","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT p.`ProductID` AS id, p.`ProductName` AS name, p.`SupplierID` AS supplierId, p.`CategoryID` AS categoryId, p.`QuantityPerUnit` AS quantity, p.`UnitPrice` AS price, p.`UnitsInStock` AS inStock, p.`UnitsOnOrder` AS onOrder, p.`ReorderLevel` AS reorderLevel, p.`Discontinued` AS discontinued FROM `Products` p WHERE  p.`ProductID` IN (?) ","cols":["id","name","supplierId","categoryId","quantity","price","inStock","onOrder","reorderLevel","discontinued"],"v":["list_id"]}],"r":{"name":"product","type":"oneToMany","from":"productId","to":{"entity":"Products","property":"id"}},"v":"list_id"}],"s":"SELECT o1.`Quantity` AS quantity, o1.`UnitPrice` AS unitPrice, o1.`ProductID` AS productId FROM `Order Details` o1 WHERE  o1.`OrderID` IN (?) ","cols":["quantity","unitPrice","productId"],"v":["list_orderId"]}],"r":{"name":"details","type":"manyToOne","from":"id","to":{"entity":"OrderDetails","property":"orderId"}},"v":"list_orderId"},{"n":"customer","t":"SqlInclude","c":[{"n":"sentence","t":"SqlQuery","c":[],"s":"SELECT c.`CustomerID` AS id, c.`CompanyName` AS name, c.`ContactName` AS contact, c.`ContactTitle` AS phone, c.`Address` AS address, c.`City` AS city, c.`Region` AS region, c.`PostalCode` AS postalCode, c.`Country` AS country FROM `Customers` c WHERE  c.`CustomerID` IN (?) ","cols":["id","name","contact","phone","address","city","region","postalCode","country"],"v":["list_id"]}],"r":{"name":"customer","type":"oneToMany","from":"customerId","to":{"entity":"Customers","property":"id"}},"v":"list_id"}],"s":"SELECT o.`OrderID` AS id, o.`CustomerID` AS customerId, o.`EmployeeID` AS employeeId, o.`OrderDate` AS orderDate, o.`RequiredDate` AS requiredDate, o.`ShippedDate` AS shippedDate, o.`ShipVia` AS shipViaId, o.`Freight` AS freight, o.`ShipName` AS name, o.`ShipAddress` AS address, o.`ShipCity` AS city, o.`ShipRegion` AS region, o.`ShipPostalCode` AS postalCode, o.`ShipCountry` AS country FROM `Orders` o WHERE o.`OrderID` = ? ","cols":["id","customerId","employeeId","orderDate","requiredDate","shippedDate","shipViaId","freight","name","address","city","region","postalCode","country"],"v":["id"]};
        it(expression, function() {
            let result = orm.expression(expression).compile('sql','mysql','northwind').serialize();
            assert.strictEqual(JSON.stringify(result),JSON.stringify(expected));
        });
    });


});