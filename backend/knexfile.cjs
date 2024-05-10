// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
// export const development = {
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         port: 5432,
//         user: 'me',
//         database: 'api',
//         password: '12345678',
//     },
//     migrations: {
//         directory: './src/Server/database/migrations',
//         loadExtensions: ['mjs'],
//     },
//     seeds: {
//         directory: './src/Server/database/seeds',
//         loadExtensions: ['mjs'],
//     },
// }
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'me',
            database: 'api',
            password: '12345678',
        },
        migrations: {
            directory: './src/Server/database/migrations',
            loadExtensions: ['cjs'],
        },
        seeds: {
            directory: './src/Server/database/seeds',
        },
    },
}
