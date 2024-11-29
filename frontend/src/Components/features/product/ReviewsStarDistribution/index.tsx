import { useRef, useCallback, useState } from 'react'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
type StarData = {
    stars: number
    percentValue: string
}

type ReviewStarDistributionProps = {
    starDistribution: React.MutableRefObject<StarData[]>
}

function ReviewsStarDistribution(props: Readonly<ReviewStarDistributionProps>) {
    const { starDistribution } = props
    const starDistributionContainer = useRef<HTMLDivElement | null>(null)

    const [hasAnimated, setHasAnimated] = useState(false)
    const handleAnimation = useCallback(
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
    const singularOrPlural = (number: number) => {
        return number > 1 ? `${number} stars` : `${number} star`
    }
    const { observe, unobserve } = useIntersectionObserver(handleAnimation, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    })

    if (starDistribution.current.length && !hasAnimated)
        observe(starDistributionContainer.current)

    return (
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
    )
}
export default ReviewsStarDistribution
