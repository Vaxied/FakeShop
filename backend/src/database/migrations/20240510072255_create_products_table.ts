/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex: any) {
    return knex.schema.createTable('products', function (table: any) {
        table.increments('product_id').primary()
        table.string('title').notNullable()
        table.decimal('price').notNullable()
        table.text('description').notNullable()
        table.string('image').notNullable()
        table.string('category').notNullable()
        table.decimal('average_rating').notNullable()
        table.integer('rating_count').notNullable()
        table.string('created_at').notNullable()
    })
}

exports.down = function (knex: any) {
    return knex.schema.dropTableIfExists('products')
}
