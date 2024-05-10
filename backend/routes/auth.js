import passport from 'passport'
// import { pool } from '../connection.js'
import bcrypt from 'bcrypt'
import { connection } from '../connection.js'

passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { id: user.id, username: user.username })
    })
})

passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user.id)
    })
})

async function authUser(username, password, done) {
    try {
        console.log(username, password)
        console.log('THIS IS LOCAL STRATEGY')
        const results = await connection('users')
            .returning('email')
            .select('id', 'password', 'email')
            .where({ email: username })
            .then((queryResult) => {
                return queryResult
            })
            .catch((err) => {
                throw err
            })

        // })
        //         // const results = await pool.query(
        //         //     'SELECT ID, PASSWORD, EMAIL from users WHERE EMAIL = $1',
        //         //     [username]
        //         // )
        //         // console.log(results.rows)
        //         // if (!results.rows.length) {
        //         //     console.log('no results')
        //         //     return done(null, false, {
        //         //         message: 'Invalid username or password',
        //         //     })
        //         // }
        //         //
        const match = await bcrypt.compare(password, results[0].password)
        if (match) {
            console.log('match is true')
            return done(null, {
                id: results[0].id,
                username: results[0].email,
            })
        } else
            return done(null, false, {
                message: 'Invalid username or password',
            })
    } catch (error) {
        console.log('ERROR:', error)
    }
}

export default authUser
