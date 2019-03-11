const express = require('express')
const api = require('./routes/auth')
const products = require('./routes/products')
const bodyparser = require('body-parser')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router()

app.get('/', function(req, res) {res.send('Server Connection established')});

router.post('/register', api.register);
router.post('/login', api.login);
router.post('/getUser', api.getUser)


router.post('/getProductLines', api.getProductLines)
router.post('/saveProduct', api.saveProduct)
router.post('/getProducts', api.getProducts)
router.post('/getProduct', api.getProduct)
router.post('/updateProduct', api.updateProduct)
router.post('/deleteProduct', api.deleteProduct)
router.post('/searchProduct', api.searchProduct)


app.use('/api', router);
app.use('/products', router);
app.listen(PORT, function() {console.log("my server is runing on port " + PORT)});