import React from 'react'
import useShoppingCart from '@hooks/useShoppingCart'
import { IProduct } from '@@types/product'
import { useNavigate } from 'react-router-dom'

type props = {
    key: number
    product: IProduct
}

function Card({ product }: Readonly<props>) {
    const { addItemToShoppingCart } = useShoppingCart()
    const navigate = useNavigate()

    return (
        <div
            role='button'
            className='bg-secondary/50 bg-opacity-50 w-56 h-60 cursor-pointer border-2 border-gray rounded-lg'
            // onClick={() => openProductDetail(product)}
            onClick={() =>
                navigate(`/products/${product.product_id}`, {
                    state: product,
                })
            }
        >
            <figure className='relative mb-2 w-full h-4/5'>
                <img
                    className='w-full h-full object-cover'
                    src={product.image}
                    alt={product.title}
                />
                <button
                    type='button'
                    onClick={(event) => addItemToShoppingCart(event, product)}
                    className='bg-white flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 right-0 mt-1 mr-1 rounded-full p-1 cursor-pointer border border-gray'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 4.5v15m7.5-7.5h-15'
                        />
                    </svg>
                </button>
                <figcaption className='bg-accent text-md font-semibold absolute bottom-0 left-0 ml-1 mb-1 py-1 px-2 text-xs rounded-lg truncate'>
                    {product.category}
                </figcaption>
            </figure>
            <p className='flex justify-between items-center px-2'>
                <span className='text-sm text-black/60 truncate mr-2'>
                    {product.title}
                </span>
                <span className='text-lg text-black font-semibold'>
                    ${product.price}
                </span>
            </p>
        </div>
    )
}

export default Card
