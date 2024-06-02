const bcrypt = require('bcrypt')
const express = require('express')
const passport = require('passport')
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const cookieParser = require('cookie-parser')
// import { connection } from '../connection.js'
// import { pool } from '../connection.js'
const app = express()
app.use(cookieParser(process.env.SECRET))
// if (!pool) console.log('no pool')
const getSaltRounds = () => {
    const saltRounds = process.env.SALT_ROUNDS
    return saltRounds
}
// const salt = process.env.SECRET

const createUser = (request, response, next) => {
    const { firstName, lastName, email, password } = request.body
    const saltRounds = getSaltRounds()
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //     if (err) return err
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) return next(err)

        connection.transaction(async function (trx) {
            try {
                const user = await trx('users')
                    .returning('*')
                    .insert([
                        {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: hashedPassword,
                        },
                    ])
                console.log('user', user)
                await trx('shopping_carts')
                    .returning('*')
                    .insert([
                        {
                            user_id: user[0].user_id,
                            cart_status: 'active',
                        },
                    ])

                response.status(200).send({
                    username: user[0].email,
                })
            } catch (error) {
                console.log(error)
                response.status(400).send(error)
            }
        })
    })
}

const verifyUser = async (request, response, next) => {
    passport.authenticate('local', function (err, user) {
        console.log('user result', user)
        console.log('SUPPOSEDLY AUTHENTICATING')
        if (err) next(err)
        if (!user)
            response
                .status(400)
                .send({ status: 400, info: 'Invalid username or password' })
        else {
            console.log('this is user', user)
            const accessToken = jwt.sign({ user }, secret, { expiresIn: '1h' })
            // const refreshToken = jwt.sign({ user }, secret, { expiresIn: '1d' })
            // response.cookie('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     sameSite: 'strict',
            // })
            response.header('Authorization', accessToken)
            response.status(201).send({
                status: 201,
                token: accessToken,
                // refresh: refreshToken,
                info: `Login succesful with user ${user.username}`,
                // username: user.email,
            })
        }
    })(request, response, next)
}

const logOut = (request, response, next) => {
    response.status(200).send({ status: 200, info: 'user has been logged out' })
}
module.exports = { createUser, verifyUser, logOut }
