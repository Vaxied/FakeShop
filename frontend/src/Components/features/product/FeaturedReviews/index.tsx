import { Link } from 'react-router-dom'
import ProductReview from '../ProductReview'
import { useRef } from 'react'
import ProductReviewDistribution from '../ProductReviewDistribution'
import { IProduct } from '@@types/product'

type Review = {
    reviewId: number
    username: string
    rating: string
    summary: string
    content: string
    date: string
}

function FeaturedReviews(props: Readonly<{ product: IProduct }>) {
    const { product } = props

    const mockedReviews = useRef<Review[]>([
        {
            reviewId: 1,
            username: 'Ana',
            rating: '4',
            summary: 'Great experience!',
            content:
                'Bought this bag for my vacation, had a great time and felt amazing during all of it. This bag has enough space to store your essentials and carry them with you at all times!',
            date: 'Reviewed on October 5, 2024'
        },
        {
            reviewId: 2,
            username: 'Alfred',
            rating: '3',
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024'
        },
        {
            reviewId: 3,
            username: 'Daniel',
            rating: '3.5',
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024'
        },
        {
            reviewId: 4,
            username: 'Ethna',
            rating: '4.5',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        }
    ])
    if (!mockedReviews.current.length) {
        return null
    }

    return (
        <div className="w-full flex flex-wrap pt-8">
            <ProductReviewDistribution avgRating={product.average_rating} />
            <div className="md:max-2xl:w-3/5 w-full flex-1">
                {mockedReviews.current.map((review, index) => (
                    <ProductReview review={review} key={review.reviewId} />
                ))}
                <Link
                    to={`/products/${product.product_id}/reviews`}
                    state={{ product, mockedReviews }}
                >
                    <button>View all reviews</button>
                </Link>
            </div>
        </div>
    )
}

export default FeaturedReviews
