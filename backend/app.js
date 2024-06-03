const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { createUser, verifyUser, logOut } = require('./controllers/users')
const { createOrder, getUserOrders } = require('./controllers/orders')
const { isAuthenticated } = require('./routes/auth')
const getProducts = require('./routes/products')
const {
    addProduct,
    loadShoppingCart,
    increaseProductQuantity,
    removeProduct,
} = require('./controllers/shoppingCarts')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    console.log('Tadaima')
    console.log('getting products')
    return getProducts(request, response)
    // response.json({ info: 'Tadaima' })
})
app.post('/register', (request, response, next) => {
    console.log('\nregister request')
    return createUser(request, response, next)
})

app.post('/auth', (request, response, next) => {
    console.log('\nlogin request')
    return verifyUser(request, response, next)
})
app.post('/logout', (request, response, next) => {
    return logOut(request, response, next)
})

app.post('/new-order', isAuthenticated, (request, response, next) => {
    console.log('\nnew order request')
    console.log('user', request.user)
    // response.status(200).send({ info: 'New order requested' })
    return createOrder(request, response, next)
})

app.post('/add-cart-product', isAuthenticated, (request, response, next) => {
    console.log('\n add product request')
    return addProduct(request, response)
})

app.get('/load-cart', isAuthenticated, (request, response, next) => {
    console.log('load cart request')
    return loadShoppingCart(request, response)
})

app.delete('/remove-product', isAuthenticated, (request, response, next) => {
    console.log('remove product request')
    return removeProduct(request, response)
})

app.patch(
    '/increase-product-quantity',
    isAuthenticated,
    (request, response, next) => {
        console.log('increase quantity request')
        return increaseProductQuantity(request, response)
    }
)

app.get('/get-orders', isAuthenticated, (request, response, next) => {
    console.log('getting orders')
    return getUserOrders(request, response)
})
// app.post('/refresh', (request, response) => {
//     return refreshAcessToken(request, response)
// })

module.exports = app
