export interface IProduct {
    product_id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
    product_quantity?: number
    average_rating: string
    rating_count: string
}

export type Rating = {
    rate: number
    count: number
}
