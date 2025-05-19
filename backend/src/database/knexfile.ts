// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
import { Knex } from 'knex'
import 'dotenv/config'

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env
const host = DB_HOST
const port = Number(DB_PORT)
const user = DB_USER
const database = DB_NAME
const password = DB_PASSWORD

export const knexConfig: Knex.Config = {
    client: 'pg',
    connection: {
        host,
        port,
        user,
        database,
        password,
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
}

// exporting default knex gives error : select * - SELECT * with no tables specified is not valid
// export const knex = createKnex(config)
export default knexConfig
