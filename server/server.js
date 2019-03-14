const express = require('express')
const api = require('./routes/auth')
const products = require('./routes/products')
const orderDetails = require('./routes/orderDetails')
const employees = require('./routes/employees')
const vendors = require('./routes/vendors')
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


router.post('/getProductLines', products.getProductLines)
router.post('/saveProduct', products.saveProduct)
router.post('/getProducts', products.getProducts)
router.post('/getProduct', products.getProduct)
router.post('/updateProduct', products.updateProduct)
router.post('/deleteProduct', products.deleteProduct)
router.post('/searchProduct', products.searchProduct)
router.post('/updateProductLines', products.updateProductLines)
router.post('/deleteProductLine', products.deleteProductLine)
router.post('/getAllProductForProductLines', products.getAllProductForProductLines)

router.post('/getOrderDetails', orderDetails.getOrderDetails)
router.post('/getOrderDetail', orderDetails.getOrderDetail)
router.post('/getOrders', orderDetails.getOrders)
// router.post('/getOrderOrderDetails', orderDetails.getOrderOrderDetails)
router.post('/updateOrder', orderDetails.updateOrder)
router.post('/updateOrderDetail', orderDetails.updateOrderDetail)
router.post('/deleteOrder', orderDetails.deleteOrder)
router.post('/deleteOrderDetail', orderDetails.deleteOrderDetail)


router.post('/getOffices', employees.getOffices)
router.post('/getEmployees', employees.getEmployees)
router.post('/getOfficeEmployees', employees.getOfficeEmployees)
router.post('/getEmployeeVendors', employees.getEmployeeVendors)
router.post('/updateOffice', employees.updateOffice)
router.post('/udpateEmployee', employees.udpateEmployee)
router.post('/deleteOffice', employees.deleteOffice)
router.post('/deleteEmployee', employees.deleteEmployee)

router.post('/getVendors', vendors.getVendors)
router.post('/getVendorPayments', vendors.getVendorPayments)
router.post('/getVendorOrders', vendors.getVendorOrders)
router.post('/getVendorOrderDetail', vendors.getVendorOrderDetail)
router.post('/getPayments', vendors.getPayments)
router.post('/updateVendor', vendors.updateVendor)
router.post('/deleteVendor', vendors.deleteVendor)
router.post('/updatePayment', vendors.updatePayment)
router.post('/deletePayment', vendors.deletePayment)

app.use('/api', router);
app.use('/products', router);
app.use('/orderDetails', router);
app.use('/employees', router);
app.use('/vendors', router);
app.listen(PORT, function() {console.log("my server is runing on port " + PORT)});