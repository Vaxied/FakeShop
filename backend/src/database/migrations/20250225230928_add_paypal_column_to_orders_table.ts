import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('orders', (table: Knex.TableBuilder) => {
        table.string('paypal_order_id').nullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('orders', (table: Knex.TableBuilder) => {
        table.dropColumn('paypal_order_id')
    })
}
