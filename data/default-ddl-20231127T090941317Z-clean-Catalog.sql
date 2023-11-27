UPDATE Products a SET CategoryID = NULL;
ALTER TABLE Products DROP FOREIGN KEY Products_category_FK;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Products;