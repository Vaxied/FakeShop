/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex: any) {
    return knex.schema.createTable(
        'shopping_cart_products',
        function (table: any) {
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
exports.down = function (knex: any) {
    return knex.schema.dropTableIfExists('shopping_cart_products')
}
