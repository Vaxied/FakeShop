/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('order_id').primary()
        table.integer('user_id').notNullable()
        table.integer('products_count').notNullable()
        table.decimal('total_price', 10, 2).notNullable()
        table.string('utc_date').notNullable()

        table.foreign('user_id').references('users.user_id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders')
}
