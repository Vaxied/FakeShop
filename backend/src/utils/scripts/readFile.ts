import * as fs from 'fs'

// const text = getText().then((response) => response)
const readText = async (path: string, encoding: any) =>
    new Promise((resolve, reject) => {
        fs.readFile(
            path,
            // '../../static/privacy-policy.docx',
            { encoding: encoding },
            // { encoding: 'utf8' },
            (err: any, data: string) => {
                if (err) reject(new Error(err))
                resolve(data)
            }
        )
    })

export const getText = async (path: string, encoding: string) => {
    try {
        const result = await readText(path, encoding)
        return result
    } catch (error) {
        console.log(error)
    }
}
