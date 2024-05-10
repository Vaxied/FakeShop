import knex from 'knex'
// import pg from 'pg'

export const connection = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'me',
        database: 'api',
        password: '12345678',
    },
})
// const { Pool } = pg
// export const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'api',
//     // Cant access ENV for some reason
//     // password: import.meta.env.VITE_DB_PASSWORD,
//     password: '12345678',
//     port: 5432,
// })
