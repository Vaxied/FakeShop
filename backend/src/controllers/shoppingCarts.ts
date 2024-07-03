import { Knex } from 'knex'
import { RequestHandler } from 'express'
import { AuthToken } from '../@types/user'
const knex = require('../database/connection')

const addProduct: RequestHandler = async (request, response) => {
    const product = request.body

    try {
        if (!request.user) {
            return null
        }
        const tokenInfo = request.user as AuthToken
        const user = tokenInfo.user
        await knex.transaction(async function (trx: Knex.Transaction) {
            if (!request.user) throw Error('no user in request object')
            const shoppingCart = await trx('shopping_carts')
                .select('cart_id')
                .where('user_id', user.user_id)
                .andWhere('cart_status', 'active')

            console.log('shopping cart', shoppingCart)
            const result = await trx('shopping_cart_products')
                .returning('*')
                .insert([
                    {
                        cart_id: shoppingCart[0].cart_id,
                        product_id: product.product_id,
                        product_quantity: product.product_quantity,
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
const increaseProductQuantity: RequestHandler = async (request, response) => {
    //     SELECT sc.cart_id, scp.product_id, product_quantity
    // from shopping_cart_products as scp
    // join shopping_carts as sc on scp.cart_id = sc.cart_id
    // where user_id = 75 AND product_id = 824
    const product = request.body
    console.log('product to increase', product)
    try {
        if (!request.user) {
            return null
        }
        const tokenInfo = request.user as AuthToken
        const user = tokenInfo.user
        if (!request.user) throw Error('no user in request object')
        await knex.transaction(async function (trx: Knex.Transaction) {
            const cart = await trx('shopping_carts')
                .select('cart_id')
                .where('user_id', user.user_id)
                .andWhere('cart_status', 'active')
            console.log('cart to increase', cart)
            const result = await trx('shopping_cart_products')
                .returning('product_quantity')
                .update('product_quantity', product.product_quantity)
                .where('product_id', product.product_id)
                .andWhere('cart_id', cart[0].cart_id)
            console.log('query result', result)

            response.status(200).send(result)
        })
    } catch (error) {
        console.log('error updating product quantity', error)
    }
}

const removeProduct: RequestHandler = async (request, response) => {
    const product = request.body
    console.log('product to increase', product)
    try {
        // if (!request.user) throw Error('no user in request object')
        if (!request.user) {
            return null
        }
        const tokenInfo = request.user as AuthToken
        const user = tokenInfo.user
        await knex.transaction(async function (trx: Knex.Transaction) {
            const cart = await trx('shopping_carts')
                .select('cart_id')
                .where('user_id', user.user_id)
                .andWhere('cart_status', 'active')
            console.log('cart where product is', cart)
            const result = await trx('shopping_cart_products')
                .where('product_id', product.product_id)
                .andWhere('cart_id', cart[0].cart_id)
                .del()
            console.log('query result', result)

            response.sendStatus(200)
        })
    } catch (error) {
        console.log('error updating product quantity', error)
    }
}

const loadShoppingCart: RequestHandler = async (request, response) => {
    try {
        if (!request.user) throw Error('no user in request object')
        if (!request.user) {
            return null
        }
        const tokenInfo = request.user as AuthToken
        const user = tokenInfo.user
        console.log('USER ID', user.user_id)
        const products = await knex('shopping_carts')
            .select(
                'shopping_cart_products.product_id',
                'product_quantity',
                'title',
                'price',
                'image',
                'description',
                'category',
                'average_rating',
                'rating_count'
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
            .where('user_id', user.user_id)
            .andWhere('cart_status', 'active')

        console.log('PRODUCTS', products)
        // console.log(products)

        response.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
}

const createShoppingCart = async (user_id: number, trx: Knex.Transaction) => {
    const result = await trx('shopping_carts')
        .returning('*')
        .insert([
            {
                user_id: user_id,
                cart_status: 'active',
            },
        ])
    return result
}

const setCartInactive = async (user_id: number, trx: Knex.Transaction) => {
    console.log('SETTING CART INACTIVE')
    try {
        // await connection.transaction(async function (trx) {

        const cart = await trx('shopping_carts')
            .select('cart_id')
            .where('user_id', user_id)
            .andWhere('cart_status', 'active')
        console.log('state changing in cart', cart)
        const result = await trx('shopping_carts')
            .returning('cart_status')
            .update('cart_status', 'inactive')
            .where('cart_id', cart[0].cart_id)

        console.log('query result', result)

        return result
        // })
    } catch (error) {
        console.log('error updating cart status', error)
    }
}
module.exports = {
    createShoppingCart,
    addProduct,
    loadShoppingCart,
    increaseProductQuantity,
    removeProduct,
    setCartInactive,
}
