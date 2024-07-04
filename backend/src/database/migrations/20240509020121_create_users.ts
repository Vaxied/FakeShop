/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'users',
        function (table: Knex.TableBuilder) {
            table.increments('user_id').primary()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.text('email').notNullable().unique({ indexName: 'email' })
            table.string('password').notNullable()
            // table.string('salt').notNullable()
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}
