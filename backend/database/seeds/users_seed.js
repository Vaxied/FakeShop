/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

require('dotenv').config()
const bcrypt = require('bcrypt')
const salt = process.env.SECRET
const saltRounds = 10
const users = [
    {
        first_name: 'bob',
        last_name: 'neal',
        email: 'b@b',
        password: '123',
    },
    {
        first_name: 'richard',
        last_name: 'ham',
        email: 'c@c',
        password: '123',
    },
    {
        first_name: 'jhon',
        last_name: 'doe',
        email: 'j@j',
        password: '123',
    },
]

async function hashPW(password) {
    console.log('inside hashing function')
    console.log('password', password)
    const hash = await bcrypt.hash(password, saltRounds)
    console.log('the hash is ', hash)
    return hash
}

exports.seed = async function (knex) {
    const testPW = await hashPW('123')
    console.log('testPW', testPW)
    const hashedUsers = await Promise.all(
        users.map(async (user) => ({
            // first_name: user.first_name,
            // last_name: user.last_name,
            // email: user.email,
            ...user,
            password: await hashPW(user.password),
        }))
    )

    console.log('hashed users ', hashedUsers)
    // Deletes ALL existing entries
    await knex('users').del()
    // const hashedUsers = users.map((user) => hashPassword(user.password))
    await knex('users').insert(hashedUsers)
}
