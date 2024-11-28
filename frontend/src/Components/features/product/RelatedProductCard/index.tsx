import React from 'react'
import useShoppingCart from '@hooks/useShoppingCart'
import { IProduct } from '@@types/product'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@components/icons/StarIcon'
type props = {
    key: number
    product: IProduct
}

function RelatedProductCard({ product }: Readonly<props>) {
    const { addItemToShoppingCart } = useShoppingCart()
    const navigate = useNavigate()
    // console.log('product', product)
    return (
        <div
            role='button'
            className='w-[75%] md:max-2xl:w-[27.5%] sm:max-md:w-[45%] cursor-pointer rounded-lg border-2 border-accent overflow-hidden shadow-secondary shadow-md flex-shrink-0 snap-center'
            onClick={() =>
                navigate(`/products/${product.product_id}`, {
                    state: product,
                })
            }
        >
            <figure className='relative w-full h-56 p-2 overflow-hidden bg-white'>
                <img
                    className='w-full h-full object-contain'
                    src={product.image}
                    alt={product.title}
                />
            </figure>
            <div className='flex flex-col bg-secondary/60 justify-center p-2'>
                <div className='flex items-center h-7'>
                    <span className='font-medium pr-1'>
                        {product.average_rating.substring(0, 3)}
                    </span>
                    <span>
                        <StarIcon />
                    </span>
                    <span className='pl-1 font-normal'>
                        ({product.rating_count})
                    </span>
                </div>
                <p className='flex justify-between h-10 overflow-hidden text-ellipsis line-clamp-2'>
                    <span className='text-sm text-black/60 line-clamp-2 mr-2'>
                        {product.title}
                    </span>
                    <span className='text-lg text-black font-medium'>
                        ${product.price}
                    </span>
                </p>
                <div className='w-full flex pt-2 justify-end'>
                    <button
                        type='button'
                        onClick={(event) => {
                            addItemToShoppingCart(event, product)
                        }}
                        className='flex justify-center items-center text-md h-6 bg-secondary cursor-pointer rounded-lg text-white p-4 self-center'
                    >
                        <span className='text-sm text-center font-medium'>
                            Add to cart
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RelatedProductCard
