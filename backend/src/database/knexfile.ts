// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
import { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

let connectionData
let useSsl = false

if (process.env.NODE_ENV === 'production') {
    const { DB_URL } = process.env
    connectionData = DB_URL
    useSsl = true
} else {
    const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env
    const host = DB_HOST
    const port = Number(DB_PORT)
    const user = DB_USER
    const database = DB_NAME
    const password = DB_PASSWORD

    connectionData = {
        host,
        port,
        user,
        password,
        database,
    }
}

export const knexConfig: Knex.Config = {
    client: 'pg',
    connection: {
        ...(typeof connectionData === 'string'
            ? { connectionString: connectionData }
            : connectionData),
        ssl: useSsl
            ? {
                  rejectUnauthorized: false, // Required for Supabase in many environments (like Render)
              }
            : false,
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
