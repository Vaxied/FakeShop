// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
import { config } from '../config'
import { Knex } from 'knex'

const { host, dbPort, user, database, password } = config
const port = dbPort

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
