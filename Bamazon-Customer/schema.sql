DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;
CREATE TABLE products (
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30),
department_name VARCHAR(30),
price INT(11),
stock_quantity INT(11),
PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('GTX 1070', "Desktop Graphics", 738, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('GTX 1080', "Desktop Graphics", 1050, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('GTX 1070 ti', "Desktop Graphics", 916, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('GTX 1080 ti', "Desktop Graphics", 1400, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('Radeon r9 390', "Desktop Graphics", 320, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('Radeon rx 580', "Desktop Graphics", 450, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('Intel i5 6500', "CPU", 200, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('AMD Ryzen 7 1700', "CPU", 279, 167);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('AMD Ryzen 5 1600', "CPU", 189, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('Intel i7 7700k', "CPU", 339, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ('Intel i5 7820k', "CPU", 459, 1);