import ProductReview from '../ProductReview'
import { useRef, useState } from 'react'
import { IProduct } from '@@types/product'
import Paginator from '@components/features/Paginator'

type Review = {
    reviewId: number
    username: string
    rating: string
    summary: string
    content: string
    date: string
}

function ProductReviewList(
    props: Readonly<{ product: IProduct; starToFilter: number | undefined }>
) {
    const { starToFilter } = props
    const reviewsContainer = useRef<HTMLDivElement | null>(null)
    const [lastFilteredStar, setLastFilteredStar] = useState<number | null>(
        null
    )
    const [shouldResetPaginator, setShouldResetPaginator] = useState(false)
    const filteredReviews = useRef<Review[] | null>(null)
    const [firstLoad, setFirstLoad] = useState(true)

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
            rating: '3',
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024'
        },
        {
            reviewId: 4,
            username: 'Ethna',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 5,
            username: 'Gaby',
            rating: '5',
            summary: 'Great experience!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 17, 2024'
        },
        {
            reviewId: 6,
            username: 'Blabla',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 7,
            username: 'Barbara',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 8,
            username: 'Rose',
            rating: '4.5',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 9,
            username: 'Fred',
            rating: '3',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 10,
            username: 'Dan',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 11,
            username: 'Hector',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 12,
            username: 'Rosa',
            rating: '4',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 13,
            username: 'Faby',
            rating: '5',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        },
        {
            reviewId: 14,
            username: 'Holly',
            rating: '5',
            summary: 'Not a bad purchase!!',
            content:
                'Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!\r\n Bought this bag for a touring trip, had a great time and felt amazing during all of it. This bag has enough space and more, you could easily store a cow in it!',
            date: 'Reviewed on October 18, 2024'
        }
    ])
    if (!mockedReviews.current.length) {
        return null
    }
    const [reviewsToShow, setReviewsToShow] = useState<Review[] | null>(
        mockedReviews.current
    )

    const scrollToTopAfterLoading = () => {
        window.scrollTo(0, 0)
    }

    // IDEA Reset Paginador to FIRST LOAD WHEN FILTERING
    const filterReviewsByStar = (star: number) => {
        console.log('filtering reviews')
        filteredReviews.current = mockedReviews.current.filter(
            ({ rating }) => star.toString() == rating
        )
        setLastFilteredStar(star)
        setReviewsToShow(filteredReviews.current)
        setShouldResetPaginator(true)
        scrollToTopAfterLoading()
        // when to turn this to false??
        setFirstLoad(true)
    }

    const resetFilter = () => {
        console.log('resetting filter')
        setLastFilteredStar(null)
        setReviewsToShow(mockedReviews.current)
        setShouldResetPaginator(true)
        scrollToTopAfterLoading()
        setFirstLoad(true)
    }
    if (starToFilter && starToFilter !== lastFilteredStar) {
        filterReviewsByStar(starToFilter)
    }
    if (!starToFilter && lastFilteredStar) {
        resetFilter()
    }

    //TODO fix scroll bug when using prev or next page buttons in paginatorcontrols
    const scrollToTopOfReviews = () => {
        console.log('scrolling to reviews')
        if (reviewsContainer.current) {
            console.log('OFFSET!', reviewsContainer.current.offsetTop)
            const offset = reviewsContainer.current.offsetTop - 64 //substracting navbar
            console.log('Scrolling')
            window.scroll({
                top: offset,
                behavior: 'smooth'
            })
        }
    }

    // use a key to reset all state from child component when key changes

    return (
        <div className="w-full flex flex-wrap pt-8" ref={reviewsContainer}>
            <div className="md:max-2xl:pr-[25%] w-full">
                <Paginator
                    content={reviewsToShow}
                    elementsPerPage={3}
                    scrollToTopOfReviews={scrollToTopOfReviews}
                    resourceToFilter={starToFilter}
                    shouldResetPaginator={shouldResetPaginator}
                    setShouldResetPaginator={setShouldResetPaginator}
                    firstLoad={firstLoad}
                    setFirstLoad={setFirstLoad}
                    render={content =>
                        content.map((review: Review) => (
                            <ProductReview
                                review={review}
                                key={review.reviewId}
                            />
                        ))
                    }
                ></Paginator>
            </div>
        </div>
    )
}

export default ProductReviewList
