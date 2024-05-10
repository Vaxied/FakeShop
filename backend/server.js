import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import { createUser, verifyUser, logOut } from './controllers/users.js'
import authUser from './routes/auth.js'
import LocalStrategy from 'passport-local'

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

app.use(passport.initialize())
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
    })
)
passport.use('local', new LocalStrategy(authUser))

app.use(passport.authenticate('session'))
app.get('/', (request, response) => {
    console.log('Hello World')
    response.json({ info: 'Tadaima' })
})
app.post('/register', (request, response, next) => {
    console.log('register request')
    return createUser(request, response, next)
})

app.post('/auth', (request, response, next) => {
    console.log('login request')
    return verifyUser(request, response, next)
})
app.post('/logout', (request, response, next) => {
    return logOut(request, response, next)
})

app.listen(5600, () => console.log(`Listening on port 5600`))
