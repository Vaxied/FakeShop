import { RequestHandler } from 'express'
import { AuthToken } from '../@types/user'
import { knex } from '../database/connection'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secret = process.env.SECRET as string

export const isAuthenticated: RequestHandler = (request, response, next) => {
    const accessToken = request.headers['authorization']
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
        return response.status(400).send({ info: error })
    }
}

export const refreshUser: RequestHandler = async (request, response, next) => {
    try {
        console.log('user when refreshing app', request.user)
        if (!request.user) {
            return response
                .status(404)
                .send({ info: "Token doesnt exist or it wasn't valid" })
        }
        const user = request.user as AuthToken
        const id = user.user.user_id
        const results = await knex('users')
            .select('first_name')
            .where({ user_id: id })
            .then((queryResult: any) => {
                return queryResult
            })
            .catch((err: any) => {
                throw err
            })
        console.log(results)
        return response.status(200).send({ first_name: results[0].first_name })
    } catch (err) {
        console.log(err)
    }
}
export async function authUser(username: string, password: string, done: any) {
    try {
        console.log(username, password)
        console.log('THIS IS LOCAL STRATEGY')
        const results = await knex('users')
            .select('user_id', 'first_name', 'password', 'email')
            .where({ email: username })
            .then((queryResult: any) => {
                return queryResult
            })
            .catch((err: any) => {
                throw err
            })
        console.log(results)
        if (!results.length) {
            return done(null, false)
        }

        const match = await bcrypt.compare(password, results[0].password)
        if (!match) {
            console.log('no match')
            return done(null, false)
        }
        console.log('match is true')
        const authenticatedUser = {
            user_id: results[0].user_id,
            first_name: results[0].first_name,
            email: results[0].email,
        }
        return done(null, authenticatedUser)
    } catch (error) {
        console.log('ERROR:', error)
    }
}
