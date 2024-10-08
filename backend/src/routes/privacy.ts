import { Request, Response } from 'express'
import { getText } from '../utils/scripts/readFile'

export async function getPrivacyPolicy(request: Request, response: Response) {
    try {
        const result: any = await getText('./public/static/policy.txt', 'utf8')
        console.log('resulting policy', result)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(result)
        response.end()
    } catch (error) {
        console.log(error)
    }
}
