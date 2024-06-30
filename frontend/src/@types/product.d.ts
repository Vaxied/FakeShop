export interface IProduct {
    product_id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
    product_quantity?: number
}

export type Rating = {
    rate: number
    count: number
}
