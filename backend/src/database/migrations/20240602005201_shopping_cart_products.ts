/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'
exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'shopping_cart_products',
        function (table: Knex.TableBuilder) {
            table.integer('cart_id').notNullable()
            table.integer('product_id').notNullable()
            table.integer('product_quantity').notNullable()

            table.foreign('cart_id').references('shopping_carts.cart_id')
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('shopping_cart_products')
}
