import { writeFile } from 'fs'

const data = await fetch('https://fakestoreapi.com/products?limit=20').then(
    (res) => res.json()
)

writeFile(
    './.env',
    `
API_DATA = ${JSON.stringify(data)}
\n`,
    (err) => {
        if (err) throw err
        console.log('data has been saved')
        console.log(data)
    }
)
console.log('executing create-api')
