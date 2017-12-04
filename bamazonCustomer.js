var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!pS159iS218",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});

function displayProducts() {
    var query = "SELECT products.item_id, products.product_name, products.price FROM products";
    connection.query(query, function(err, res) {
        var table = new Table({
            head: ["Product ID ", "Product ", "Price "]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price]
            );
        }
        console.log(table.toString());
        buyProduct();
    });
};

function buyProduct() {
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "Please enter Product ID Number of item you would like to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "quantity?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        checkAvailability(answer.productID, answer.quantity);
    });
};

function checkAvailability(prodID, quantity) {
    var query = "SELECT products.stock_quantity FROM products WHERE ?";
    connection.query(query, { item_id: prodID }, function(err, res) {
        if ((res[0].stock_quantity) < quantity) {
            console.log("Insufficient quantity! There are only " + (res[0].stock_quantity) + " of that item left in stock");
            buyProduct();
        } else {
            newInventory = (res[0].stock_quantity) - quantity;
            updateInventory(prodID, newInventory);
            checkout(prodID, quantity);
        }
    });
};

function updateInventory(prodID, quantity) {
    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    connection.query(query, [quantity, prodID], function(err, res) {
        console.log("Item stock has been updated");
    });
};

function checkout(prodID, quantity) {
    var query = "SELECT products.price FROM products WHERE ?";
    connection.query(query, { item_id: prodID }, function(err, res) {       
        console.log("Thank you! Your total is $" + ((res[0].price).toFixed(2) * quantity));
        connection.end(function(err) {
        });
    });
};
