import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        'user_addresses',
        function (table: Knex.TableBuilder) {
            table.integer('address_id').notNullable()
            table.integer('user_id').notNullable()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('address_line_1').notNullable()
            table.string('address_line_2').nullable()
            table.string('city').notNullable()
            table.string('state').notNullable()
            table.string('zip_code').notNullable()
            table.string('country').notNullable()

            table.foreign('user_id').references('users.user_id')
        },
    )
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('user_addresses')
}
