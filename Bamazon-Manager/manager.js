var mysql = require('mysql');
var inquirer =require("inquirer");
var connection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password: '',
database: 'bamazonDB'
});
connection.connect((err) =>{
if (err) throw err;
// console.log('connected as id ' + connection.threadId)
});
var read = function(){
    connection.query("SELECT * FROM products", function (err, res){
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("-----------------------------------------------------------");
        console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | Price: $" + res[i].price + " | Stock: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------------------");
    menue();       
    });
};
var low = function(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------------------------------------");
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | Price: $" + res[i].price + " | Stock: " + res[i].stock_quantity);
            }
            console.log("-----------------------------------------------------------");
    menue();                   
    })
};
var restock = function(){
    inquirer.prompt([{
        type: "input",
        message: "What item would you like to update",
        name: "id"
    },
    {
        type: "input",
        message: "how many would you like to buy",
        name: "quantity"
    }]).then(function(data){
        connection.query("SELECT stock_quantity, item_id FROM products WHERE item_id = ?",[data.id], function(err,res){
           if(err) throw err;
           var newStock = res[0].stock_quantity+parseInt(data.quantity);
            stock(newStock,res[0].item_id)
        })
        function stock (x,y){connection.query("UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: x
        },
        {
            item_id: y
        }], function(err, result){
            if (err) throw err;
            console.log("Purchase Made")
            menue();
        })} 
    })
}
var add = function(){
    inquirer.prompt([
        {
            type: "input",
            message: "What new item are you adding",
            name: "name"
        },
        {
            type: "input",
            message: "What department",
            name: "department"
        },
        {
            type: "input",
            message: "What will we charge for it",
            name: "price"
        },
        {
            type: "input",
            message: "How much will we have in stock",
            name: "stock"
        }]).then(function(data){
            connection.query("INSERT INTO products SET?",
        {
            product_name: data.name,
            department_name: data.department,
            price: data.price,
            stock_quantity: data.stock
        }, function(err, res){
            if (err) throw err;
            console.log(res.affectedRows)
            menue();
        })
        })
};
function menue (){inquirer.prompt(
    {
        type: "list",
        message: "What Would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Close"],
        name: "Choice"
    }).then(function(data){
        if(data.Choice=="View Products for Sale")
        {read();
        }
        else 
        if(data.Choice=="View Low Inventory")
        {low()}else
        if(data.Choice=="Add to Inventory")
        {restock()}else
        if(data.Choice=="Add New Product")
        {add()}else
        if(data.Choice =="Close")
        {   console.log("Closing...")
            connection.end()}
    })}
    menue();
