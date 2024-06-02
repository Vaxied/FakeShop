/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    return null
    const data = await fetch('https://fakestoreapi.com/products').then((res) =>
        res.json()
    )
    // const dataInsert = []
    if (data) {
        console.log(data)
        const dataInsert = data.map((product) => ({
            title: product.title,
            price: product.price.toFixed(2),
            description: product.description,
            image: product.image,
            category: product.category,
            average_rating: product.rating.rate.toFixed(2),
            rating_count: product.rating.count,
            created_at: new Date().toISOString(),
        }))

        // Deletes ALL existing entries
        await knex('products').del()

        // Insert new records
        await knex('products').insert(dataInsert)

        console.log('Data inserted successfully!')
    }
    console.log('afuera del if')
}
