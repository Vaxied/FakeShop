import React from 'react'
import useShoppingCart from '@hooks/useShoppingCart'
import { IProduct } from '@@types/product'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@components/icons/StarIcon'
import AddToCartPlusButton from '@components/common/buttons/AddToCartPlusButton'
import CategoryLabel from '../CategoryLabel'
type props = {
    key: number
    product: IProduct
}

function Card({ product }: Readonly<props>) {
    const { addItemToShoppingCart } = useShoppingCart()
    const navigate = useNavigate()
    // console.log('product', product)
    return (
        <div
            role='button'
            className='flex flex-col bg-white w-60 aspect-[4/5] shadow-md shadow-secondary cursor-pointer rounded-lg border-2 border-accent hover:border-primary overflow-hidden group hover:shadow-primary'
            onClick={() =>
                navigate(`/products/${product.product_id}`, {
                    state: product,
                })
            }
        >
            <figure className='relative w-full h-56 p-4 overflow-hidden'>
                <img
                    className='w-full h-full object-contain transition-transform group-hover:scale-110'
                    src={product.image}
                    alt={product.title}
                />
                <AddToCartPlusButton
                    product={product}
                    addItemToShoppingCart={addItemToShoppingCart}
                />
                <CategoryLabel product={product} />
            </figure>
            <div className='flex flex-col flex-1 bg-primary-container justify-center p-2'>
                <div className='flex items-center h-7'>
                    <span className='font-medium pr-1'>
                        {product.average_rating.substring(0, 3)}
                    </span>
                    <span>
                        <StarIcon />
                    </span>
                    <span className='pl-1 text-primary-text-color'>
                        ({product.rating_count})
                    </span>
                </div>
                <p className='flex justify-between items-center'>
                    <span className='text-sm text-primary-text-color truncate mr-2'>
                        {product.title}
                    </span>
                    <span className='text-lg text-black font-medium'>
                        ${product.price}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Card
