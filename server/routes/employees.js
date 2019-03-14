const connection = require('./db')

exports.getOffices = function(req, res){
    connection.query('SELECT officeCode, phone, CONCAT(addressLine1," ",addressLine2," ",city," ",state," ",postalCode," ",country) AS address, territory FROM offices', function (error, results, fields) {
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

exports.getEmployees = function(req, res){
    connection.query('SELECT employeeNumber, CONCAT(firstName," ", lastName) AS fullName,extension,email,officeCode,reportsTo,jobTitle FROM employees', function (error, results, fields) {
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

exports.getOfficeEmployees = function(req, res){
    var officeCode = req.body.officeCode
    connection.query('SELECT * FROM emmployees WHERE officeCode=?',[officeCode], function (error, results, fields) {
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

exports.getEmployeeVendors = function(req, res){
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

exports.updateOffice = function(req, res){
    connection.query('UPDATE office SET ? WHERE officeCode = ?',[req.body,req.body.officeCode], function (error, results, fields) {
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

exports.udpateEmployee = function(req, res){
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

exports.deleteOffice = function(req, res){
    connection.query('DELETE FROM offices WHERE officeCode = ?',[req.body.officeCode], function (error, results, fields) {
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

exports.deleteEmployee = function(req, res){
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