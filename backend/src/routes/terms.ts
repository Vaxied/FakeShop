import { Request, Response } from 'express'
import { getText } from '../utils/scripts/readFile'

export async function getTerms(request: Request, response: Response) {
    try {
        const result: any = await getText(
            './public/static/terms-and-conditions_html.txt',
            'utf8'
        )
        // console.log('resulting terms', result)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(result)
        response.end()
    } catch (error) {
        console.log(error)
    }
}
