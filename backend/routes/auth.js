const connection = require('../database/connection')
const express = require('express')
const cookieParser = require('cookie-parser')
// import { pool } from '../connection.js'

const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

// app.use(cookieParser(secret))

function isAuthenticated(request, response, next) {
    const accessToken = request.headers['authorization']
    console.log('accessToken', accessToken)
    if (!accessToken) {
        return response.status(401).send({
            status: 401,
            info: 'User not authenticated. No token present.',
        })
    }

    try {
        const decodedToken = jwt.verify(accessToken, secret)
        request.user = decodedToken
        next()
    } catch (error) {
        console.log('ERORR:', error)
        return response.status(400).send({ info: 'Invalid access token' })
    }
}

async function authUser(username, password, done) {
    try {
        console.log(username, password)
        console.log('THIS IS LOCAL STRATEGY')
        const results = await connection('users')
            .select('user_id', 'first_name', 'password', 'email')
            .where({ email: username })
            .then((queryResult) => {
                return queryResult
            })
            .catch((err) => {
                throw err
            })

        const match = await bcrypt.compare(password, results[0].password)
        if (!match) {
            console.log('no match')
            return done(null, false)
        }
        console.log('match is true')
        const authenticatedUser = {
            id: results[0].user_id,
            firstName: results[0].first_name,
            username: results[0].email,
        }
        return done(null, authenticatedUser)
    } catch (error) {
        console.log('ERROR:', error)
    }
}

module.exports = { authUser, isAuthenticated }
