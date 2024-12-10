import { useRef, ReactElement } from 'react'
import StarIcon from '../StarIcon'

function StarArray(props: Readonly<{ rating: string }>) {
    const { rating } = props
    const reviewStars = useRef<{ id: number; stars: ReactElement[] }>({
        id: Date.now(),
        stars: []
    })

    const buildStarArr = (arr: ReactElement[], rating: string) => {
        const parsedRating = parseFloat(rating)
        for (let i = 0; i < 5; i++) {
            switch (true) {
                case i < Math.floor(parsedRating):
                    arr.push(<StarIcon isFilled={true} isHalved={false} />)
                    break
                case parsedRating - i > 0 && !Number.isInteger(parsedRating):
                    arr.push(<StarIcon isFilled={true} isHalved={true} />)
                    break
                default:
                    arr.push(<StarIcon isFilled={false} isHalved={false} />)
            }
        }
    }

    if (!reviewStars.current.stars.length)
        buildStarArr(reviewStars.current.stars, rating)

    return (
        <>
            {reviewStars.current?.stars?.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </>
    )
}

export default StarArray
