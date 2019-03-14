const connection = require('./db')

exports.getOrders = function(req, res){
    connection.query('SELECT * FROM orders', function (error, results, fields) {
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

exports.getOrderDetails = function(req, res){
    connection.query('SELECT * FROM orderDetails', function (error, results, fields) {
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

exports.getOrderDetail = function(req, res){
    var orderNumber = req.body.orderNumber
    connection.query('SELECT * FROM orderDetails WHERE orderNumber=?',[orderNumber], function (error, results, fields) {
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

exports.OrderDetails = function(req, res){
    var orderNumber = req.body.orderNumber
    connection.query('SELECT * FROM orderDetails WHERE orderNumber=?',[orderNumber], function (error, results, fields) {
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

exports.updateOrder = function(req, res){
    connection.query('UPDATE orders SET ? WHERE orderNumber = ?',[req.body,req.body.orderNumber], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({"failed":"error ocurred"})
          }else{
              res.status(200).send();
          }
    });
}

exports.updateOrderDetail = function(req, res){
    connection.query('UPDATE orderDetails SET ? WHERE orderNumber = ?',[req.body,req.body.orderNumber], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({"failed":"error ocurred"})
          }else{
              res.status(200).send();
          }
    });
}

exports.deleteOrder = function(req, res){
    connection.query('DELETE FROM orders WHERE orderNumber = ?',[req.body.orderNumber], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({"failed":"error ocurred"})
          }else{
              res.status(200).send();
          }
    });
}

exports.deleteOrderDetail = function(req, res){
    console.log(req.body)
    connection.query('DELETE FROM orderDetails WHERE orderNumber = ?',[req.body.orderNumber], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.status(400).send({"failed":"error ocurred"})
          }else{
              res.status(200).send();
          }
    });
}