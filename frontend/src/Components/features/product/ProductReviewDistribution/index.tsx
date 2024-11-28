import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { ReactElement, useCallback, useRef, useState } from 'react'

type StarData = {
    stars: number
    percentValue: string
}

type ProductReviewDistributionProps = {
    buildStars: (arr: ReactElement[], rating: string) => void
    avgRating: string
    productId: number
}

function ProductReviewDistribution(
    props: Readonly<ProductReviewDistributionProps>
) {
    const { buildStars, avgRating } = props
    const starDistributionContainer = useRef<HTMLDivElement | null>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    const HandleAnimation = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            console.log('checking for target')
            if (entry.isIntersecting) {
                // Custom Action
                setHasAnimated(true)
                unobserve(starDistributionContainer.current)
            }
        },
        []
    )

    const avgStars = useRef<ReactElement[] | []>([])
    if (avgRating && !avgStars.current.length) {
        buildStars(avgStars.current, avgRating)
    }

    const starDistribution = useRef<StarData[]>([])

    //TODO createFakeDistribution()

    //Object.entries was sorting the keys
    const calculateStarDistribution = () => {
        for (let i = 4; i >= 0; i--) {
            // TODO calculate percentvalue
            const star = {
                stars: i + 1,
                percentValue: Math.round(Math.random() * 100).toString(),
            }
            starDistribution.current.push(star)
        }
        console.log('starDistribution')
    }

    const { observe, unobserve } = useIntersectionObserver(HandleAnimation, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    })

    if (starDistribution.current.length && !hasAnimated)
        observe(starDistributionContainer.current)
    if (!starDistribution.current.length) calculateStarDistribution()

    const singularOrPlural = (number: number) => {
        return number > 1 ? `${number} stars` : `${number} star`
    }

    return (
        <div
            id='review-distribution'
            className='flex flex-col gap-2 pr-4 w-[35%] font-poppins'
        >
            <h2 className='font-semibold text-lg'>Our Customer Reviews</h2>
            <div className='flex items-center gap-3'>
                <div className='flex flex-wrap'>
                    {avgStars.current?.map((star, index) => (
                        <span key={index}>{star}</span>
                    ))}
                </div>
                <span className='text-lg'>
                    {parseFloat(avgRating).toFixed(1)} of 5
                </span>
            </div>
            <p className='w-full text-gray-700'>136 verified reviews</p>
            <div id='stars-container' ref={starDistributionContainer}>
                <ul className='flex flex-wrap gap-3'>
                    {starDistribution.current.map(({ stars, percentValue }) => (
                        <li
                            key={stars}
                            className='flex w-full gap-3 text-secondary hover:text-accent hover:underline underline-offset-2 cursor-pointer text-sm'
                        >
                            <span className='min-w-12'>
                                {singularOrPlural(stars)}
                            </span>
                            <div className='w-60 border-2 border-gray-500 bg-white rounded-lg overflow-hidden'>
                                <div
                                    className={`w-full h-full bg-gradient-to-r from-secondary to-secondary transition-transform origin-left duration-[1.5s] ease-linear
                                    }`}
                                    style={
                                        !hasAnimated
                                            ? { transform: 'scaleX(0)' }
                                            : {
                                                  transform: `scaleX(${percentValue}%)`,
                                              }
                                    }
                                ></div>
                            </div>
                            <span className='min-w-8 text-end'>
                                {percentValue}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductReviewDistribution
