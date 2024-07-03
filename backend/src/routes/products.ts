import { Request, Response } from 'express'
const connection = require('../database/connection')

function getProducts(request: Request, response: Response) {
    connection
        .select('*')
        .from('products')
        .then((result: any) =>
            response.status(200).send({ status: 200, info: result })
        )
        .catch((err: any) => {
            throw err
        })
}

module.exports = getProducts
