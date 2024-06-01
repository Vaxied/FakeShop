const connection = require('../database/connection')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
// import { pool } from '../connection.js'

const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

app.use(passport.initialize())
passport.use('local', new LocalStrategy(authUser))

function isAuthenticated(request, response, next) {
    // console.log(request.headers)
    const accessToken = request.headers['authorization']
    // const refreshToken = request.headers['cookie']
    console.log('accessToken', accessToken)
    // console.log('refreshToken', refreshToken)
    // const refreshToken = request.cookies['refreshToken']
    // if (!accessToken && refreshToken) {
    if (!accessToken) {
        response.status(401).send({
            status: 401,
            info: 'User not authenticated. No token present.',
        })
    }

    try {
        const decodedToken = jwt.verify(accessToken, secret)
        request.user = decodedToken
        next()
    } catch (error) {
        response.status(401).send({ status: 401, info: 'Invalid Token' })
    }
}

async function authUser(username, password, done) {
    try {
        console.log(username, password)
        console.log('THIS IS LOCAL STRATEGY')
        const results = await connection('users')
            .select('user_id', 'password', 'email')
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
            username: results[0].email,
        }
        return done(null, authenticatedUser)
    } catch (error) {
        console.log('ERROR:', error)
    }
}

module.exports = { authUser, isAuthenticated }
