// import knex from 'knex'
import createKnex from 'knex'
import knexConfig from './knexfile'

// export const db = knex({
//     client: 'pg',
//     connection: {
//         host: process.env.DB_HOST,
//         port: Number(process.env.DB_PORT),
//         user: process.env.DB_USER,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//     },
// })

// can also be created with knex(config)
export const knex = createKnex(knexConfig)
