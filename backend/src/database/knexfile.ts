// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
import createKnex, { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })
const host = process.env.DB_HOST
const port = Number(process.env.DB_PORT)
const user = process.env.DB_USER
const database = process.env.DB_NAME
const password = process.env.DB_PASSWORD

export const config: Knex.Config = {
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
export default config
