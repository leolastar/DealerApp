const mysql = require('mysql');
const jwt = require('jsonwebtoken');

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

function verifyToken(req, res, next) {
    if(!req.header.authorization) {
        req.status(401).send('Unauthorized request')
    }
    let token = req.header.authorization.split(' ')[1]
    if(token === 'null') {
        req.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        req.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

exports.register = function(req,res){
    connection.query('INSERT INTO users SET ?',[req.body], function (error, results, fields) {
    if (error) {
      res.status(400).send({
        "failed":"error ocurred"
      })
    }else{
        let payload = { subject: results.id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
    }
    });
  }

exports.login = function (req, res) {
    connection.query('SELECT fname,lname,isAdmin FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (error, results, fields) {
        if (error) {
            res.status(400).send({ "failed": "error ocurred" })
        } else {
            if (results.length > 0) {
                let payload = { subject: results.id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token,results}); 
            } else {
                res.status(204).send({
                    "success": "Email does not exits"
                });
            }
        }
    });
}

exports.getUser = function(req, res){
    connection.query('SELECT fname,lname,email,isAdmin FROM users WHERE email = ?', [req.body.email], function (error, results, fields) {
        if (error) {
            res.status(400).send({ "failed": "error ocurred" })
        } else {
            if (results.length > 0) {
                res.status(200).send(results);
            }
            else {
                res.status(204).send({
                    "success": "User does not exits"
                });
            }
        }
    });
}

exports.getProductLines = function(req, res){
    var email = req.body.email;
    connection.query('SELECT productLine FROM productlines ORDER BY productLine', function (error, results, fields) {
        if (error) {
            res.status(400).send({ "failed": "error ocurred" })
        } else {
            
            if (results.length > 0) {
                console.log(results)
                res.status(200).send(results);
            }
            else {
                res.status(204).send({
                    "success": "No ProductLines"
                });
            }
        }
    });
}

exports.saveProduct = function(req, res){    
    connection.query('INSERT INTO productLine SET ?',req.body, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({
              "failed":"error ocurred"
            })
        }else{
            res.status(200).send();
        }
    });
}

exports.getProducts = function(req, res){
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) {
            res.status(400).send({ "failed": "error ocurred" })
        } else {
            
            if (results.length > 0) {
                res.status(200).send(results);
            }
            else {
                res.status(204).send({
                    "success": "No ProductLines"
                });
            }
        }
    });
}

exports.getProduct = function(req, res){
    connection.query('SELECT * FROM products WHERE productCode =?', [req.body.productCode], function (error, results, fields) {
        if (error) {
            res.status(400).send({ "failed": "error ocurred" })
        } else {
            if (results.length > 0) {
                res.status(200).send(results);
            }
            else {
                res.status(204).send({
                    "success": "User does not exits"
                });
            }
        }
    });
}

exports.updateProduct = function(req, res){
    connection.query('UPDATE products SET ? WHERE productCode = ?',[req.body,req.body.productCode], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({
              "failed":"error ocurred"
            })
          }else{
              res.status(200).send();
          }
    });
}

exports.searchProduct = function(req, res){
    connection.query('UPDATE products SET ? WHERE productCode = ?',[req.body,req.body.productCode], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({
              "failed":"error ocurred"
            })
          }else{
              res.status(200).send();
          }
    });
}

exports.deleteProduct = function(req, res){
    console.log(req.body)
    connection.query('DELETE FROM products WHERE productCode = ?',[req.body.productCode], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({
              "failed":"error ocurred"
            })
          }else{
              res.status(200).send();
          }
    });
}