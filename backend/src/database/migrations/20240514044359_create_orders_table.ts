/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'orders',
        function (table: Knex.TableBuilder) {
            table.uuid('order_id').defaultTo(knex.fn.uuid()).primary()
            table.integer('user_id').notNullable()
            table.decimal('total_price', 10, 2).notNullable()
            table.string('utc_date').notNullable()

            table.foreign('user_id').references('users.user_id')
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('orders')
}
