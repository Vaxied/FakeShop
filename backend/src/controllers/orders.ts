import { RequestHandler } from 'express'
import { Knex } from 'knex'
import { AuthToken } from '../@types/user'
import { Product } from '../@types/product'

const knex = require('../database/connection')
const { setCartInactive, createShoppingCart } = require('./shoppingCarts')

const createOrder: RequestHandler = async (request, response) => {
    const { productList, totalPrice, date } = request.body
    try {
        await knex.transaction(async function (trx: Knex.Transaction) {
            if (!request.user) {
                return null
            }
            const tokenInfo = request.user as AuthToken
            const user = tokenInfo.user

            const inserResult = await trx('orders')
                .returning('order_id')
                .insert([
                    {
                        user_id: user.user_id,
                        total_price: totalPrice,
                        utc_date: date,
                    },
                ])
            const order = { order_id: inserResult[0] }
            // console.log('PRODUCT LIST', productList)
            const orderProductsData = productList.map((product: Product) => ({
                order_id: order.order_id,
                product_quantity: product.product_quantity,
                price: product.price,
                title: product.title,
                description: product.description,
                image: product.image,
                category: product.category,
                average_rating: product.average_rating,
                rating_count: product.rating_count,
            }))
            // console.log(order)
            const result = await trx('order_products')
                .returning('*')
                .insert(orderProductsData)

            // console.log('result', result)
            const inactive = await setCartInactive(user.user_id, trx)
            console.log('set cart inactive response', inactive)
            const newCart = await createShoppingCart(user.user_id, trx)
            console.log('newCart operation', newCart)
            response.status(200).send({
                status: 200,
                order_id: order.order_id,
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const getUserOrders: RequestHandler = async (request, response) => {
    // select ord.order_id, utc_date, json_agg(json_build_object('title', title, 'price', price, 'image', image)) as productList
    // from orders as ord inner join order_products as op on ord.order_id = op.order_id
    // where ord.user_id = 75
    // group by ord.user_id, ord.order_id
    try {
        if (!request.user) {
            return null
        }
        const tokenInfo = request.user as AuthToken
        const user = tokenInfo.user
        // if (!request.user) throw Error('no user in request object')
        const result = await knex(knex.ref('orders').as('ord'))
            .select(
                'ord.order_id as orderId',
                'total_price as totalPrice',
                'utc_date as date',
                knex
                    .ref(
                        knex.raw(
                            `JSON_AGG(
                JSON_BUILD_OBJECT(
                'title',
                title,
                'price',
                price,
                'image',
                image,
                'product_quantity',
                product_quantity)
                )`
                        )
                    )
                    .as('productList')
            )
            .innerJoin('order_products as op', 'op.order_id', 'ord.order_id')
            .where('user_id', user.user_id)
            .groupBy('ord.order_id')
        console.log('result of getting orders', result)
        response.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createOrder, getUserOrders }
