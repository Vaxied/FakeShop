export type Product = {
    product_id: number
    product_quantity?: number
    price: number
    title: string
    description: string
    image: string
    category: string
    average_rating: rating
    rating_count: number
    created_at?: string
}

type rating = {
    count: number
    rate: number
}
