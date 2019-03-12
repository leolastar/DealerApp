const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "leolastar",
    password: "Pjjlse86",
    database: "classicmodels"
});

connection.connect((err) => {
    if (err) {
        console.log('Unable to connect to the database')
        console.log(err)
    }
    else {
        console.log('you are now connected')
    }
});

module.exports = connection;