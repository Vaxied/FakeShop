/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id').primary()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.text('email').notNullable().unique({ indexName: 'email' })
        table.string('password').notNullable()
        // table.string('salt').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
}
