const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { createUser, verifyUser, logOut } = require('./controllers/users')
const { createOrder, getUserOrders } = require('./controllers/orders')
const { isAuthenticated } = require('./routes/auth')
const getProducts = require('./routes/products')

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

app.get('/get-orders', isAuthenticated, (request, response, next) => {
    console.log('getting orders')
    return getUserOrders(request, response)
})
// app.post('/refresh', (request, response) => {
//     return refreshAcessToken(request, response)
// })

module.exports = app
