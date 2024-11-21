import StarIcon from '@components/icons/StarIcon'
import ProductReview from '../ProductReview'
import { ReactElement, useRef } from 'react'

type Review = {
    reviewId: number
    username: string
    rating: number
    summary: string
    content: string
    date: string
}

function ProductReviews(props: Readonly<{}>) {
    const reviewStars = useRef<{ id: number; stars?: ReactElement[] }[]>([])

    const buildStarArr = (rating: number, index: number) => {
        for (let i = 0; i < 5; i++) {
            switch (true) {
                case i < Math.floor(rating):
                    reviewStars.current[index].stars?.push(
                        <StarIcon isFilled={true} isHalved={false} />
                    )
                    break
                case rating - i > 0 && !Number.isInteger(rating):
                    reviewStars.current[index].stars?.push(
                        <StarIcon isFilled={true} isHalved={true} />
                    )
                    break
                default:
                    reviewStars.current[index].stars?.push(
                        <StarIcon isFilled={false} isHalved={false} />
                    )
            }
        }
    }

    const drawStars = () => {
        mockedReviews.current.forEach((review, index) => {
            reviewStars.current.push({ id: review.reviewId, stars: [] })
            buildStarArr(review.rating, index)
        })
    }
    const mockedReviews = useRef([
        {
            reviewId: 1,
            username: 'Ana',
            rating: 4,
            summary: 'Great experience!',
            content:
                'Bought this bag for my vacation, had a great time and felt amazing during all of it. This bag has enough space to store your essentials and carry them with you at all times!',
            date: 'Reviewed on October 5, 2024',
        },
        {
            reviewId: 2,
            username: 'Alfred',
            rating: 3,
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024',
        },
        {
            reviewId: 3,
            username: 'Daniel',
            rating: 3.5,
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024',
        },
        {
            reviewId: 4,
            username: 'Ethna',
            rating: 4.5,
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024',
        },
    ])
    if (!mockedReviews.current.length) {
        return null
    }

    if (mockedReviews.current.length && !reviewStars.current.length) {
        console.log('drawing stars')
        drawStars()
    }

    return (
        <div className='flex flex-wrap justify-center'>
            <p className='font-semibold text-2xl pb-4 w-full'>
                What do our customers say
            </p>
            <div className='md:max-2xl:w-3/5 md:max-2xl: w-full'>
                {mockedReviews.current.map((review, index) => (
                    <ProductReview
                        review={review}
                        reviewStars={reviewStars.current[index]}
                        key={review.reviewId}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductReviews
