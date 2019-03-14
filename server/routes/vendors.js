const connection = require('./db')

exports.getVendors = function(req, res){
    connection.query('SELECT customerNumber,customerName,CONCAT(contactLastName," ",contactFirstName) AS contactFullName,phone,CONCAT(addressLine1," ",addressLine2," ",city," ",state," ",postalCode," ",country) AS address,salesRepEmployeeNumber,creditLimit  FROM customers', function (error, results, fields) {
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

exports.getVendorPayments = function(req, res){
    connection.query('SELECT * FROM payments WHERE customerNumber=?',[req.body.customerNumber], function (error, results, fields) {
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

exports.getVendorOrders = function(req, res){
    var officeCode = req.body.officeCode
    connection.query('SELECT * FROM orders WHERE customerNumber=?',[req.body.customerNumber],[officeCode], function (error, results, fields) {
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

exports.getVendorOrderDetail = function(req, res){
    var saleRepEmployeeNumber = req.body.saleRepEmployeeNumber
    connection.query('SELECT * FROM customers WHERE saleRepEmployeeNumber=?',[saleRepEmployeeNumber], function (error, results, fields) {
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

exports.getPayments = function(req, res){
    connection.query('SELECT * FROM payments', function (error, results, fields) {
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

exports.updateVendor = function(req, res){
    connection.query('UPDATE cunstomers SET ? WHERE employeeNumber = ?',[req.body,req.body.employeeNumber], function (error, results, fields) {
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

exports.deleteVendor = function(req, res){
    connection.query('DELETE FROM customers WHERE officeCode = ?',[req.body.officeCode], function (error, results, fields) {
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

exports.updatePayment = function(req, res){
    connection.query('UPDATE employees SET ? WHERE employeeNumber = ?',[req.body,req.body.employeeNumber], function (error, results, fields) {
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

exports.deletePayment = function(req, res){
    connection.query('DELETE FROM employees WHERE employeerNumber = ?',[req.body.employeerNumber], function (error, results, fields) {
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