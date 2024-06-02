const connection = require('../database/connection')

const createOrder = async (request, response) => {
    const { productList, productCount, totalPrice, date } = request.body
    // console.log('request user', request.user)
    // console.log('request user id', request.user.user.id)
    // console.log(productsList)

    // console.log('request body', request.body)
    // Create a table for order_products with order_id, product_id, product_count
    try {
        await connection.transaction(async function (trx) {
            const order = await trx('orders')
                .returning('*')
                .insert([
                    {
                        user_id: request.user.user.id,
                        total_price: totalPrice,
                        utc_date: date,
                    },
                ])
            const orderProductsData = productList.map((product) => ({
                order_id: order[0].order_id,
                product_quantity: product.quantity,
                title: product.title,
                description: product.description,
                image: product.image,
                category: product.category,
                average_rating: product.average_rating,
                rating_count: product.rating_count,
            }))
            console.log(order)
            const result = await trx('order_products')
                .returning('*')
                .insert(orderProductsData)

            console.log('result', result)

            response.status(200).send({
                status: 200,
                info: `Order ${order[0].order_id} has been placed successfully`,
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function getUserOrders(request, response) {
    // SELECT products_count, total_price, utc_date, products.product_id,
    // product_count, title, price, description, image
    // FROM public.orders inner join order_products on order_products.order_id = orders.order_id
    // join products on order_products.product_id = products.product_id where user_id = 2

    // TO DO, FIX AFTER NEW STRUCTURE
    try {
        console.log('USER ID', request.user.user.id)
        const products = await connection('orders')
            .select(
                'orders.order_id',
                'product_quantity',
                'title',
                'price',
                'image',
                'description',
                'category'
            )
            .join(
                'order_products',
                'orders.order_id',
                'order_products.order_id'
            )
            .where('user_id', request.user.user.id)

        console.log('PRODUCTS', products)
        // console.log(products)
        const orders = await connection('orders')
            .select('*')
            .where('user_id', request.user.user.id)

        const formattedOrders = orders.map((order) => {
            const productList = products.filter(
                (product) => product.order_id == order.order_id
            )
            productList.forEach((product) => delete product.order_id)

            return {
                orderId: order.order_id,
                productList: productList,
                totalPrice: order.total_price,
                date: order.utc_date,
            }
        })

        console.log(formattedOrders)

        response.status(200).send(formattedOrders)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createOrder, getUserOrders }
