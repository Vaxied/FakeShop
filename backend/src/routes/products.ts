import { Request, Response } from 'express'
import { knex } from '../database/connection'

export function getProducts(request: Request, response: Response) {
    knex('products')
        .select('*')
        .then((result: any) =>
            response.status(200).send({ status: 200, info: result })
        )
        .catch((err: any) => {
            throw err
        })
}

// module.exports = getProducts
