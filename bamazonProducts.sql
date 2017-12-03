DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('The Human Equation', 'Books', '79.99', '57');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Sunglasses', 'Accessories', '59.99', '23');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Symphonized NRG 3.0 Earbuds', 'Electronics', '49.99', '87');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Essential Oils Pendant', 'Accessories', '34.99', '46');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Fire TV and Alexa Voice Remote', 'Electronics', '69.99', '8');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Fitness Tracker', 'Electronics', '49.99', '92');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Slippers', 'Clothing', '7.99', '17');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Poisonfeather', 'Books', '24.95', '7');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('The Devils Game', 'Books', '19.95', '33');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Bath Robe', 'Clothing', '39.99', '74');

SELECT * FROM products;