import { Request, Response } from 'express'
import { getText } from '../utils/scripts/readFile'

export async function getPrivacyPolicy(request: Request, response: Response) {
    try {
        const result = await getText(
            './public/static/privacy-policy.docx',
            'utf8'
        )
        console.log('resulting policy', result)
        return response.status(200).send({ info: result })
    } catch (error) {
        console.log(error)
    }
}
