/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_products', function (table) {
        table.integer('order_id').notNullable()
        table.integer('product_id').notNullable()
        table.integer('product_count').notNullable()

        table.foreign('order_id').references('orders.order_id')
        table.foreign('product_id').references('products.product_id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('order_products')
}
