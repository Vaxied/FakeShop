import { UUID } from 'crypto'

type Order = {
    order_id: UUID
    product_quantity: number
    price: number
    title: string
    description: string
    image: string
    category: string
    average_rating: number
    rating_count: number
}
