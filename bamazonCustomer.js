var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
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
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        }
        buyProduct();
    });
}

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
        console.log(res[0].stock_quantity);
        if ((res[0].stock_quantity) < quantity) {
            console.log("The item you are looking for is not in stock. Please select another item.");
        } else {
            ((res[0].stock_quantity) - quantity)
            checkout();
            // console.log(((res[0].stock_quantity) - quantity));
        }
    });
};

function checkout(prodID, quantity) {
    var query = "SELECT products.price FROM products WHERE ?";
    connection.query(query, { item_id: prodID }, function(err, res) {
        console.log("Great! Your total comes out to " + ((res[0].price) * quantity));
    });
};