ALTER TABLE "Order Details" DROP CONSTRAINT IF EXISTS "Order Details_order_FK";
ALTER TABLE "Order Details" DROP CONSTRAINT IF EXISTS "Order Details_product_FK";
UPDATE Products a SET CategoryID = NULL;
ALTER TABLE Products DROP CONSTRAINT IF EXISTS Products_category_FK;
ALTER TABLE Orders DROP CONSTRAINT IF EXISTS Orders_customer_FK;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS "Order Details";
DROP TABLE IF EXISTS Products;
DROP INDEX IF EXISTS Orders_orderDate;
DROP TABLE IF EXISTS Orders;
DROP INDEX IF EXISTS Customers_name;
DROP TABLE IF EXISTS Customers;