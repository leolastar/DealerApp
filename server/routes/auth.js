const jwt = require('jsonwebtoken');
const connection = require('./db')

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