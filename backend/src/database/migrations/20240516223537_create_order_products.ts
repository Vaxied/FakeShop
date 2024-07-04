/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import { Knex } from 'knex'
exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'order_products',
        function (table: Knex.TableBuilder) {
            table.uuid('order_id').defaultTo(knex.fn.uuid())
            table.integer('product_quantity').notNullable()
            table.string('title').notNullable()
            table.decimal('price').notNullable()
            table.text('description').notNullable()
            table.string('image').notNullable()
            table.string('category').notNullable()
            table.decimal('average_rating').notNullable()
            table.integer('rating_count').notNullable()
            // table.integer('product_id').notNullable()

            table.foreign('order_id').references('orders.order_id')
            // table.foreign('product_id').references('products.product_id')
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
    return knex.schema.dropTableIfExists('order_products')
}
