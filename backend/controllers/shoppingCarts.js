const connection = require('../database/connection')

const addProduct = async (request, response) => {
    const product = request.body

    try {
        await connection.transaction(async function (trx) {
            const shoppingCart = await trx('shopping_carts')
                .select('cart_id')
                .where('user_id', request.user.user.id)

            console.log('shopping cart', shoppingCart)
            const result = await trx('shopping_cart_products')
                .returning('*')
                .insert([
                    {
                        cart_id: shoppingCart[0].cart_id,
                        product_id: product.product_id,
                        product_quantity: product.quantity,
                    },
                ])

            console.log('result', result)

            response.status(200).send(result)
        })
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

// TO DO
// const increaseProductQuantity = async (id, trx) => {
//     const result = await trx('shopping_cart_products').returning

// }

const loadShoppingCart = async (request, response) => {
    try {
        console.log('USER ID', request.user.user.id)
        const products = await connection('shopping_carts')
            .select(
                'product_quantity',
                'title',
                'price',
                'image',
                'description',
                'category'
            )
            .innerJoin(
                'shopping_cart_products',
                'shopping_carts.cart_id',
                'shopping_cart_products.cart_id'
            )
            .join(
                'products',
                'shopping_cart_products.product_id',
                'products.product_id'
            )
            .where('user_id', request.user.user.id)

        console.log('PRODUCTS', products)
        // console.log(products)

        response.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { addProduct, loadShoppingCart }
