var mysql = require("mysql");
var inquirer  = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: "",
    database: "bamazonDB"
});
conncection.connect(function (err,res){
    if(err) throw err;
    console.log("connected as id " + connection.threadId)
});
var read = function(){
    connection.query("SELECT * FROM products", function (err, res){
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("-----------------------------------------------------------");
        console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | Price: $" + res[i].price + " | Stock: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------------------");
    });
}
var low = function(){
    connection.query("SELECT * FROM products WHERE item_id < 5", function(err, res){
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------------------------------------");
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | Price: $" + res[i].price + " | Stock: " + res[i].stock_quantity);
            }
            console.log("-----------------------------------------------------------");
    })
};
inquirer.prompt(
    {
        type: "list",
        message: "Would you like to bid on or sell an item?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "Choice"
    }).then(function(data){
        // console.log(data.Choice);
        if(data.Choice=="View Products for Sale")
        {read()}
        else if(data.Choice=="View Low Inventory")
        {low()}
        if(data.Choice=="Add to Inventory")
        {restock()}
        if(data.Choice=="Add New Product")
        {add()}
    })