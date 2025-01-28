import { useContext, useRef } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import RelatedProductCard from '../RelatedProductCard'
import { IProduct } from '@@types/product'
import './index.css'

function RelatedProducts(props: Readonly<{ featuredProduct: IProduct }>) {
    const cardScroller = useRef<null | HTMLDivElement>(null)
    const { featuredProduct } = props
    console.log('product', featuredProduct)
    const { items } = useContext(StoreContext) as StoreContextType

    const filterByCategory = (arr: IProduct[], category: string) => {
        return arr.filter((item) => item.category === category)
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
