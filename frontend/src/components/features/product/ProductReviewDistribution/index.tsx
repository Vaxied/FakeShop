import { useRef } from 'react'
import ReviewsStarDistribution from '../ReviewsStarDistribution'
import StarArray from '@components/icons/StarArray'

type StarData = {
    stars: number
    percentValue: string
}

type ProductReviewDistributionProps = {
    avgRating: string
    starToFilter?: number
    setStarToFilter?: (star: number) => void
}

function ProductReviewDistribution(
    props: Readonly<ProductReviewDistributionProps>
) {
    console.log(props)
    const { avgRating, starToFilter, setStarToFilter } = props

    const starDistribution = useRef<StarData[]>([])

    //TODO createFakeDistribution()

    //Object.entries was sorting the keys
    const calculateStarDistribution = () => {
        for (let i = 4; i >= 0; i--) {
            // TODO calculate percentvalue
            const star = {
                stars: i + 1,
                percentValue: Math.round(Math.random() * 100).toString()
            }
            starDistribution.current.push(star)
        }
        console.log('starDistribution')
    }

    if (!starDistribution.current.length) calculateStarDistribution()

    return (
        <div
            id="review-distribution"
            className="flex flex-col gap-2 pr-4 w-[35%] font-poppins"
        >
            <h2 className="font-semibold text-lg">Our Customer Reviews</h2>
            <div className="flex items-center gap-3">
                <div className="flex flex-wrap">
                    {avgRating && <StarArray rating={avgRating} />}
                </div>
                <span className="text-lg">
                    {parseFloat(avgRating).toFixed(1)} of 5
                </span>
            </div>
            <p className="w-full text-gray-700">136 verified reviews</p>
            <ReviewsStarDistribution
                starDistribution={starDistribution}
                {...props}
            />
            {!!starToFilter && setStarToFilter && (
                <div>
                    <button
                        className="px-4 py-2 bg-accent text-white rounded-3xl"
                        onClick={() => setStarToFilter(0)}
                    >
                        Reset filter
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductReviewDistribution
