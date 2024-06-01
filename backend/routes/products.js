const connection = require('../database/connection')

function getProducts(request, response) {
    connection
        .select('*')
        .from('products')
        .then((result) =>
            response.status(200).send({ status: 200, info: result })
        )
        .catch((err) => {
            throw err
        })
}

module.exports = getProducts
