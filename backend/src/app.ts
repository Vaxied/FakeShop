import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
const PORT = process.env.API_PORT

import { createUser, verifyUser } from './controllers/users'
import { createOrder, getUserOrders } from './controllers/orders'
import { isAuthenticated, authUser } from './routes/auth'
import { getProducts } from './routes/products'

import {
    addProduct,
    loadShoppingCart,
    increaseProductQuantity,
    removeProduct,
} from './controllers/shoppingCarts'

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

app.get('/', (request, response) => {
    console.log('Tadaima')
    console.log('getting products')
    return getProducts(request, response)
})
app.post('/register', (request, response, next) => {
    console.log('\nregister request')
    return createUser(request, response, next)
})

app.post('/auth', (request, response, next) => {
    console.log('\nlogin request')
    return verifyUser(request, response, next)
})

app.post('/new-order', isAuthenticated, (request, response, next) => {
    return createOrder(request, response, next)
})

app.post('/add-cart-product', isAuthenticated, (request, response, next) => {
    console.log('\n add product request')
    return addProduct(request, response, next)
})

app.get('/load-cart', isAuthenticated, (request, response, next) => {
    console.log('load cart request')
    return loadShoppingCart(request, response, next)
})

app.delete('/remove-product', isAuthenticated, (request, response, next) => {
    console.log('remove product request')
    return removeProduct(request, response, next)
})

app.patch(
    '/increase-product-quantity',
    isAuthenticated,
    (request, response, next) => {
        console.log('increase quantity request')
        return increaseProductQuantity(request, response, next)
    }
)

app.get('/get-orders', isAuthenticated, (request, response, next) => {
    console.log('getting orders')
    return getUserOrders(request, response, next)
})

app.listen(PORT, () => console.log(`\nListening on ${PORT}`))

// module.exports = app
export default app
