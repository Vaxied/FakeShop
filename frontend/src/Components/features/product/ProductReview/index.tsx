import { ReactElement, useRef, useState } from 'react'
import UserIcon from '@components/icons/UserIcon'
type Review = {
    reviewId?: number
    username?: string
    rating?: string
    summary?: string
    content?: string
    date?: string
}

function ProductReview(
    props: Readonly<{
        review: Review
        reviewStars: { id: number; stars?: ReactElement[] }
    }>
) {
    const { review, reviewStars } = props
    const [isExpanded, setIsExpanded] = useState(false)
    const [hasBeenExpanded, setHasBeenExpanded] = useState(false)

    const reviewContentRef = useRef<null | HTMLParagraphElement>(null)
    if (!reviewContentRef) return

    const isContentOverflowing = () => {
        if (!reviewContentRef.current) return false
        if (
            reviewContentRef.current.clientHeight &&
            !!reviewContentRef.current.scrollHeight
        ) {
            return (
                reviewContentRef.current?.scrollHeight >
                    reviewContentRef.current?.clientHeight || hasBeenExpanded
            )
        }
        return false
    }

    return (
        <div
            className='flex flex-col py-4 bg-container mb-4 px-4 rounded-lg'
            key={review.reviewId}
        >
            <p className='flex pb-1 items-center'>
                {<UserIcon />}
                <span className='pl-2'>{review.username}</span>
            </p>
            <p className='flex'>
                {reviewStars.stars?.map((stars, index) => (
                    <span key={index}>{stars}</span>
                ))}
                <span className='pl-2 font-semibold line-clamp-6 truncate'>
                    {review.summary}
                </span>
            </p>
            <span className='text-gray-500'>{review.date}</span>
            <p
                ref={reviewContentRef}
                className={`w-full mb-2 ${!isExpanded ? 'line-clamp-4' : ''}`}
            >
                {review.content}
            </p>
            {isContentOverflowing() && (
                <div className='flex justify-center'>
                    <button
                        className='px-4 py-2 text-gray-600 cursor-pointer outline-none'
                        onClick={() => {
                            setIsExpanded((prevState) => !prevState)
                            if (!hasBeenExpanded) setHasBeenExpanded(true)
                        }}
                    >
                        {!isExpanded ? 'Read more...' : 'Read less...'}
                    </button>
                </div>
            )}
            <div>
                <button className='py-2 px-4 rounded-3xl text-sm text-white bg-secondary mr-2'>
                    Helpful
                </button>
                <button className='py-2 px-4 rounded-3xl text-sm text-white bg-accent'>
                    Report
                </button>
            </div>
        </div>
    )
}

export default ProductReview
