/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'
exports.up = function (knex: Knex) {
    return knex.schema.createTable(
        'products',
        function (table: Knex.TableBuilder) {
            table.increments('product_id').primary()
            table.string('title').notNullable()
            table.decimal('price').notNullable()
            table.text('description').notNullable()
            table.string('image').notNullable()
            table.string('category').notNullable()
            table.decimal('average_rating').notNullable()
            table.integer('rating_count').notNullable()
            table.string('created_at').notNullable()
        }
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products')
}
