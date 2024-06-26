const bcrypt = require('bcrypt')
const express = require('express')
const passport = require('passport')
const knex = require('../database/connection')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
// const cookieParser = require('cookie-parser')
const { isEveryFieldValid } = require('./signUpValidations')
// const app = express()

const createUser = (request, response, next) => {
    const formData = request.body
    const { firstName, lastName, email, password, confirmedPassword } =
        request.body
    console.log('body', request.body)

    if (!isEveryFieldValid(formData)) {
        response
            .status(418)
            .send({ status: 418, message: 'Invalid data provided' })
        return
    }

    const saltRounds = Number(process.env.SALT_ROUNDS)
    console.log('salt', saltRounds)
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //     if (err) return err
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) return next(err)
        console.log('hashed', hashedPassword)
        knex.transaction(async function (trx) {
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

            return response.status(200).send({
                status: 201,
                token: accessToken,
                firstName: user.firstName,
                info: `Login succesful with user ${user.username}`,
            })
        }
    })(request, response, next)
}

const logOut = (request, response, next) => {
    response.status(200).send({ status: 200, info: 'user has been logged out' })
}
module.exports = { createUser, verifyUser, logOut }
