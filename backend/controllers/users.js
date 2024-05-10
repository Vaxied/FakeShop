import bcrypt from 'bcrypt'
import passport from 'passport'
import { connection } from '../connection.js'
// import { pool } from '../connection.js'

// if (!pool) console.log('no pool')

const getSaltRounds = () => {
    const saltRounds = 10
    return saltRounds
}

export const createUser = (request, response, next) => {
    const { firstName, lastName, email, password } = request.body
    const saltRounds = getSaltRounds()
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return err
        bcrypt.hash(password, salt, function (err, hashedPassword) {
            if (err) return next(err)

            connection('users')
                .returning('*')
                .insert([
                    {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: hashedPassword,
                        salt: salt,
                    },
                ])
                .then((queryResult) => {
                    console.log(queryResult)
                    response.status(200).send({
                        status: 200,
                        info: 'User added',
                        username: queryResult[0].email,
                    })
                })
                .catch((err) => {
                    throw err
                })
            // Queries can be an object
            //
            // const createUserQuery = {
            //     text: `INSERT INTO users (first_name, last_name, email, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            //     values: [firstName, lastName, email, hashedPassword, salt],
            // }
            // Using a prepared statement
            //
            // const createUserQuery = {
            //     name: 'create-user',
            //     text: `INSERT INTO users (first_name, last_name, email, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            //     values: [firstName, lastName, email, hashedPassword, salt],
            // }

            // pool.query(
            //     // createUserQuery, Query object can be sent instead instead of the SQL string and the values array

            //     // Queries are structured with a SQL formatted string and an array of values
            //     `INSERT INTO users (first_name, last_name, email, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            //     [firstName, lastName, email, hashedPassword, salt],
            //     (error, results) => {
            //         if (error) {
            //             throw error
            //         }
            //         response.status(201).send({
            //             info: `User added with ID: ${results.rows[0].id}`,
            //         })
            //     }
            // )
        })
    })
}

export const verifyUser = async (request, response, next) => {
    console.log('login request')
    passport.authenticate('local', function (err, user) {
        console.log('user result', user)
        console.log('SUPPOSEDLY AUTHENTICATING')
        if (err) next(err)
        if (!user)
            response
                .status(400)
                .send({ status: 400, info: 'Invalid username or password' })
        else
            response.status(201).send({
                status: 201,
                info: `Login succesful with user ${user.id}`,
                username: user.email,
            })
    })(request, response, next)
}

export const logOut = (request, response, next) => {
    request.logout(function (err) {
        if (err) {
            return next(err)
        }
        response
            .status(200)
            .send({ status: 200, info: 'user has been logged out' })
    })
}
