/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('shopping_carts', function (table) {
        table.increments('cart_id').notNullable().primary()
        table.integer('user_id').notNullable
        table.string('cart_status').notNullable()

        table.foreign('user_id').references('users.user_id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shopping_carts')
}
