exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.decimal('price', 10, 2).notNullable()
        table.string('description').notNullable()
        table.string('image').notNullable()
        table.decimal('averageRating', 1, 2).notNullable()
        table.integer('ratingCount').notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products')
}
