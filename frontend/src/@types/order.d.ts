// import { UUID } from 'crypto'
import { IProduct } from './product.d.ts'

export type Order = {
    orderId?: string
    productList: IProduct[]
    image?: string
    title?: string
    productCount: number
    totalPrice: string
    date?: string
}
