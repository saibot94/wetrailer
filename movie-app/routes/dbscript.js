var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(":memory:");
var models = require('../models/models');


db.serialize(function  () {
    db.run('CREATE TABLE users (id INT, userName TEXT, password TEXT)', function(err, data){
        if(err){
            console.log("Error when creating table", err);
        }
    });

    var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");

    for(var i = 0; i < 10; i++){
       var n =  (new Date()).toLocaleTimeString();
       stmt.run(i, n, '123');
    }
    stmt.run('chris', 'saibot94', '1234');
    stmt.finalize();

   /* db.each("SELECT id, userName, password FROM users", function(err, row){
        console.log("User id: " + row.id, row.userName, row.password);
    });*/
});

function getUsers(cb){
    var users = [];
    db.all("SELECT id,  userName, password FROM users", function(err, rows){
        rows.forEach(function(row){
            users.push(new models.User(row.id, row.userName, row.password));
        });
        cb(users);
    })
}

getUsers(printUsers);

function printUsers(users){
    console.log(users);
}
function addUser (name, userName, password) {

}