import React from 'react'
import useShoppingCart from '@hooks/useShoppingCart'
import { IProduct } from '@@types/product'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@components/icons/StarIcon'
import AddToCartPlusButton from '@components/buttons/AddToCartPlusButton'
import CategoryLabel from '../CategoryLabel'
type props = {
    key: number
    product: IProduct
}

function Card({ product }: Readonly<props>) {
    const { addItemToShoppingCart } = useShoppingCart()
    const navigate = useNavigate()
    console.log('product', product)
    return (
        <div
            role='button'
            className='bg-white w-56 cursor-pointer rounded-lg border-2 border-accent overflow-hidden group'
            onClick={() =>
                navigate(`/products/${product.product_id}`, {
                    state: product,
                })
            }
        >
            <figure className='relative w-full h-56 p-2 overflow-hidden'>
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
            <div className='flex flex-col bg-secondary/60 justify-center h-17 p-2'>
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
                <p className='flex justify-between items-center'>
                    <span className='text-sm text-black/60 truncate mr-2'>
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
