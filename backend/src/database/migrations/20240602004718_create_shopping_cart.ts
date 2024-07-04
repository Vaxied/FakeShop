/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'
exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'shopping_carts',
        function (table: Knex.TableBuilder) {
            table.increments('cart_id').notNullable().primary()
            table.integer('user_id').notNullable
            table.string('cart_status').notNullable()

            table.foreign('user_id').references('users.user_id')
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('shopping_carts')
}
