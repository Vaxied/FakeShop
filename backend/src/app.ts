import routes from './routes/routes.json'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
const PORT = process.env.API_PORT

import { createUser, verifyUser } from './controllers/users'
import { createOrder, getUserOrders } from './controllers/orders'
import { isAuthenticated, authUser, refreshUser } from './routes/auth'
import { getProducts } from './routes/products'
import { getPrivacyPolicy } from './routes/privacy'

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

app.get(routes.static.home, (request, response) => {
    console.log('Tadaima')
    console.log('getting products')
    return getProducts(request, response)
})
app.post(routes.user.register, (request, response, next) => {
    console.log('\nregister request')
    return createUser(request, response, next)
})

app.post(routes.user.login, (request, response, next) => {
    console.log('\nlogin request')
    return verifyUser(request, response, next)
})

app.get(
    routes.user.orders.newOrder,
    isAuthenticated,
    (request, response, next) => {
        return createOrder(request, response, next)
    }
)

app.post(
    routes.user.cart.addCartProduct,
    isAuthenticated,
    (request, response, next) => {
        console.log('\n add product request')
        return addProduct(request, response, next)
    }
)

app.get(
    routes.user.cart.loadCart,
    isAuthenticated,
    (request, response, next) => {
        console.log('load cart request')
        return loadShoppingCart(request, response, next)
    }
)

app.delete(
    routes.user.cart.removeCartProduct,
    isAuthenticated,
    (request, response, next) => {
        console.log('remove product request')
        return removeProduct(request, response, next)
    }
)

app.patch(
    routes.user.cart.increaseProductQuantity,
    isAuthenticated,
    (request, response, next) => {
        console.log('increase quantity request')
        return increaseProductQuantity(request, response, next)
    }
)

app.get(
    routes.user.orders.getOrders,
    isAuthenticated,
    (request, response, next) => {
        console.log('getting orders')
        return getUserOrders(request, response, next)
    }
)

app.get(routes.user.refreshUser, isAuthenticated, (request, response, next) => {
    console.log('app restarted, checking user')
    return refreshUser(request, response, next)
})

app.get(routes.static.privacy, (request, response, next) => {
    console.log('app restarted, checking user')
    return getPrivacyPolicy(request, response)
})

app.listen(PORT, () => console.log(`\nListening on ${PORT}`))

// module.exports = app
export default app
