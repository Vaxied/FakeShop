import { Request, Response, NextFunction } from 'express'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const PORT = process.env.API_PORT

const { createUser, verifyUser, logOut } = require('./controllers/users')
const { createOrder, getUserOrders } = require('./controllers/orders')
const { isAuthenticated, authUser } = require('./routes/auth')
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
app.use(passport.initialize())
passport.use('local', new LocalStrategy(authUser))

app.get('/', (request: Request, response: Response) => {
    console.log('Tadaima')
    console.log('getting products')
    return getProducts(request, response)
    // response.json({ info: 'Tadaima' })
})
app.post(
    '/register',
    (request: Request, response: Response, next: NextFunction) => {
        console.log('\nregister request')
        return createUser(request, response, next)
    }
)

app.post(
    '/auth',
    (request: Request, response: Response, next: NextFunction) => {
        console.log('\nlogin request')
        return verifyUser(request, response, next)
    }
)
app.post(
    '/logout',
    (request: Request, response: Response, next: NextFunction) => {
        return logOut(request, response, next)
    }
)

app.post(
    '/new-order',
    isAuthenticated,
    (request: Request, response: Response, next: NextFunction) => {
        // console.log('\nnew order request')
        // response.status(200).send({ info: 'New order requested' })
        return createOrder(request, response, next)
    }
)

app.post(
    '/add-cart-product',
    isAuthenticated,
    (request: Request, response: Response) => {
        console.log('\n add product request')
        return addProduct(request, response)
    }
)

app.get(
    '/load-cart',
    isAuthenticated,
    (request: Request, response: Response) => {
        console.log('load cart request')
        return loadShoppingCart(request, response)
    }
)

app.delete(
    '/remove-product',
    isAuthenticated,
    (request: Request, response: Response) => {
        console.log('remove product request')
        return removeProduct(request, response)
    }
)

app.patch(
    '/increase-product-quantity',
    isAuthenticated,
    (request: Request, response: Response) => {
        console.log('increase quantity request')
        return increaseProductQuantity(request, response)
    }
)

app.get(
    '/get-orders',
    isAuthenticated,
    (request: Request, response: Response) => {
        console.log('getting orders')
        return getUserOrders(request, response)
    }
)

app.listen(PORT, () => console.log(`\nListening on ${PORT}`))

module.exports = app
