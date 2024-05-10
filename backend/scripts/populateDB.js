import { writeFile } from 'fs'
import { pool } from '../connection.js'
import getApiData from './getApiData.js'

const populate = async () => {
    const productsData = getApiData()
    console.log('productsData', productsData)

    const result = await pool.query('Select * from users')
    writeFile(`./products.csv`, productsData, (err) => {
        if (err) throw err
        console.log('csv has been created')
        console.log(productsData)
    })
    console.log('populating Database', result)
}

populate()
