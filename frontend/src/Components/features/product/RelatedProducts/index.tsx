import { useContext, useRef } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import RelatedProductCard from '../RelatedProductCard'
import { IProduct } from '@@types/product'
import './index.css'

function RelatedProducts(props: Readonly<{ featuredProduct: IProduct }>) {
    const cardScroller = useRef<null | HTMLDivElement>(null)
    const lastScrollPosition = useRef(0)
    const scrollPosition = useRef(0)
    const { featuredProduct } = props
    console.log('product', featuredProduct)
    const { items } = useContext(StoreContext) as StoreContextType

    const filterByCategory = (arr: IProduct[], category: string) => {
        return arr.filter((item) => item.category === category)
    }

    // Full width container scroll feature with debouncing
    const handleScroll = () => {
        console.log('SCROLLINNNNNNG!')
        let scrollOffset
        let displacement
        if (!cardScroller.current || cardScroller.current.scrollLeft === 0)
            return
        console.log(
            'current',
            cardScroller.current.scrollLeft,
            'last',
            lastScrollPosition.current,
            'scrollWidth',
            cardScroller.current.scrollWidth,
            'client width',
            cardScroller.current.clientWidth
        )
        // TODO
        // Percentage needs to consider card width in different resolutions, only works when is desktop right now.
        // To fix above, RelatedProducts needs to assign the card width property depending on the resolution
        // That way the slider displacement can adjust itself properly to the card.

        if (cardScroller.current.clientWidth > 640) {
            displacement = cardScroller.current.clientWidth * (82.5 / 100) + 48
        } else {
            displacement = cardScroller.current.clientWidth * (82.5 / 100) + 16
        }

        scrollPosition.current = cardScroller.current?.scrollLeft
        if (lastScrollPosition.current < scrollPosition.current) {
            scrollOffset = handleScrollRight(
                scrollPosition.current,
                displacement
            )
        } else if (lastScrollPosition.current > scrollPosition.current) {
            scrollOffset = handleScrollLeft(
                scrollPosition.current,
                displacement
            )
        } else {
            console.log('reached edge of scroll')
        }
        if (scrollOffset !== undefined && scrollOffset !== null)
            cardScroller.current.scrollTo({
                left: scrollOffset,
                behavior: 'smooth',
            })
        if (scrollOffset) scrollPosition.current = scrollOffset
    }

    const handleScrollLeft = (position: number, displacement: number) => {
        console.log('scrolling left')
        if (!cardScroller.current) return
        let newPosition = lastScrollPosition.current
        console.log('starting position', cardScroller.current?.scrollLeft)
        if (position - cardScroller.current.clientWidth < 0) newPosition = 0
        else newPosition -= displacement
        console.log('ending position', newPosition)
        lastScrollPosition.current = newPosition
        return newPosition
    }

    const handleScrollRight = (position: number, displacement: number) => {
        console.log('scrolling right')
        if (!cardScroller.current) return
        if (
            cardScroller.current.scrollLeft ===
            cardScroller.current?.scrollWidth
        )
            return
        let newPosition = lastScrollPosition.current
        console.log('starting position', cardScroller.current?.scrollLeft)
        if (
            position + cardScroller.current.clientWidth >
            cardScroller.current.scrollWidth
        ) {
            newPosition = cardScroller.current.scrollWidth
        } else {
            newPosition += displacement
        }
        lastScrollPosition.current = newPosition
        console.log('ending position', newPosition)
        return newPosition
    }

    const debounce = (func: Function, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined

        return (...args: any[]) => {
            if (!timeoutId) {
                func.apply(func, args)
            }
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                timeoutId = undefined
            }, delay)
        }
    }

    const relatedItems = filterByCategory(items, featuredProduct.category)
    console.log('relatedItems', relatedItems)
    if (items && relatedItems)
        return (
            <div className='w-full flex flex-wrap mt-4'>
                <div>
                    <p className='text-2xl font-semibold'>
                        Related items for you
                    </p>
                </div>
                <div
                    className='w-full flex overflow-x-scroll py-4 gap-4 hidden-scrollbar snap-mandatory snap-x'
                    // onScroll={debounce(handleScroll, 150)}
                    ref={cardScroller}
                >
                    {items.map((item) => (
                        <RelatedProductCard
                            product={item}
                            key={item.product_id}
                        ></RelatedProductCard>
                    ))}
                </div>
            </div>
        )
}

export default RelatedProducts
