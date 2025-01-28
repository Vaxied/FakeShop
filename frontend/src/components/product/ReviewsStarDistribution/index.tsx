import { useRef, useCallback, useState, useEffect } from 'react'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { useLocation } from 'react-router-dom'
type StarData = {
    stars: number
    percentValue: string
}

type ReviewStarDistributionProps = {
    starDistribution: React.MutableRefObject<StarData[]>
    starToFilter?: number
    setStarToFilter?: (star: number) => void
}

function ReviewsStarDistribution(props: Readonly<ReviewStarDistributionProps>) {
    const { starDistribution, starToFilter, setStarToFilter } = props
    const starDistributionContainer = useRef<HTMLDivElement | null>(null)
    const location = useLocation()

    const isPathInReviews = () => {
        return location.pathname.includes('reviews')
    }

    const [hasAnimated, setHasAnimated] = useState(false)

    const handleAnimation = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            console.log('checking for target')
            if (entry.isIntersecting) {
                // Custom Action
                setHasAnimated(true)
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
        threshold: 1.0
    })

    const filterByStar = (stars: number) => {
        console.log(stars)
        if (!starToFilter && !setStarToFilter) return
        if (stars && setStarToFilter) setStarToFilter(stars)
    }

    if (starDistribution.current.length && !hasAnimated)
        observe(starDistributionContainer.current)

    // TODO Fix loading bar animation
    useEffect(() => {
        if (isPathInReviews()) return
        observe(starDistributionContainer.current)
        // cleanupObserver
        return unobserve(starDistributionContainer.current)
    }, [])
    return (
        <div id='stars-container' ref={starDistributionContainer}>
            <ul className='flex flex-wrap'>
                {starDistribution.current.map(({ stars, percentValue }) => (
                    <li
                        key={stars}
                        className={`flex px-2 py-1 rounded-lg w-full gap-3 cursor-pointer text-sm ${starToFilter === stars ? 'bg-container' : 'hover:text-accent hover:underline underline-offset-2'}
                      ${!starToFilter ? 'text-secondary' : ''}`}
                        onClick={() => filterByStar(stars)}
                    >
                        <span className='min-w-12'>
                            {singularOrPlural(stars)}
                        </span>
                        <div className='w-60 border-2 border-gray-400 bg-white rounded-lg overflow-hidden'>
                            <div
                                className={`w-full h-full bg-gradient-to-r from-secondary to-secondary transition-transform origin-left duration-[1.5s] ease-linear
                                    } ${isPathInReviews() ? 'w-[percentValue]' : ''}`}
                                style={
                                    !hasAnimated && !isPathInReviews()
                                        ? { transform: 'scaleX(0)' }
                                        : {
                                              transform: `scaleX(${percentValue}%)`
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
