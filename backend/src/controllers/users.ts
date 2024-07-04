import { RequestHandler } from 'express'
import { knex } from '../database/connection'
import { Knex } from 'knex'
import { User } from '../@types/user'
import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'
const secret = process.env.SECRET as string
import { isEveryFieldValid } from './signUpValidations'

export const createUser: RequestHandler = (request, response, next) => {
    const formData = request.body
    const { firstName, lastName, email, password } = request.body
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
    bcrypt.hash(
        password,
        saltRounds,
        function (err: any, hashedPassword: string) {
            if (err) return next(err)
            console.log('hashed', hashedPassword)
            knex.transaction(async function (trx: Knex.Transaction) {
                try {
                    const insertResult = await trx('users')
                        .returning('user_id, email')
                        .insert([
                            {
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                password: hashedPassword,
                            },
                        ])
                    const user = insertResult[0] as User
                    console.log('user', user)
                    await trx('shopping_carts')
                        .returning('*')
                        .insert([
                            {
                                user_id: user.user_id,
                                cart_status: 'active',
                            },
                        ])

                    response.status(200).send({
                        username: user.email,
                    })
                } catch (error) {
                    console.log(error)
                    response.status(400).send(error)
                }
            })
        }
    )
}

export const verifyUser: RequestHandler = (request, response, next) => {
    passport.authenticate('local', function (err: any, user: User) {
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
                firstName: user.first_name,
                info: `Login succesful with user ${user.email}`,
            })
        }
    })(request, response, next)
}

// module.exports = { createUser, verifyUser }
