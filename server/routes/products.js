const connection = require('./db')

exports.getProductLines = function(req, res){
    var email = req.body.email;
    connection.query('SELECT productLine, textDescription  FROM productlines ORDER BY productLine', function (error, results, fields) {
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