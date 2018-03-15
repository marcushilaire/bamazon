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
console.log('connected as id ' + connection.threadId);
});
connection.query("SELECT * FROM products", function(err,res){
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("-----------------------------------");
      console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
      inquirer.prompt([
        {
            type: "input",
            message: "Enter the Id of the item you would like to purchase",
            name: "purchase"
        },
        {
            type: "input",
            message: "How many would you like to Purchase",
            name: "quantity"
        }]).then(function(data){
            purchase(data.purchase, data.quantity)
            connection.end();
        })
})
function purchase(x,y){
    connection.query("SELECT * FROM products WHERE item_id =?", [x],function(err,result){
        var totalcost = y*result[0].price;
        if(y>result[0].stock_quantity){
            console.log("We do not have enough stock to fulfill your order")
        }else{
            
            console.log("the cost of " + y + " " + result[0].product_name + "(s) is: $" + totalcost)};
    })
}