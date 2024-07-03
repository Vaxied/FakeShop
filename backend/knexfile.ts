// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
import { Knex } from 'knex'
require('dotenv').config()
const host = process.env.DB_HOST
const port = Number(process.env.DB_PORT)
const user = process.env.DB_USER
const database = process.env.DB_NAME
const db_password = process.env.DB_PASSWORD

const knex: Knex.Config = {
    client: 'pg',
    connection: {
        host: host,
        port: port,
        user: user,
        database: database,
        password: db_password,
    },
    migrations: {
        directory: './database/migrations',
    },
    seeds: {
        directory: './database/seeds',
    },
}

module.exports = knex
