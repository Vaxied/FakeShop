import React from 'react'
import { StoreContext } from '../../Context/context'
import useShoppingCart from '../../Hooks/useShoppingCart'

function ShoppingCart() {
    const { shoppingCartProducts } = React.useContext(StoreContext)

    const { removeProductFromShoppingCart, calculateTotalPrice } =
        useShoppingCart()

    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length) {
        return <p>You have not added any items</p>
    }
    const totalPrice = calculateTotalPrice(shoppingCartProducts).toFixed(2)

    return (
        <div className='flex flex-col'>
            <div className='border border-gray px-6 py-4 rounded-lg bg-gray-100'>
                <p>In Shopping Cart</p>
                {shoppingCartProducts.map((product, index) => (
                    <div
                        key={index}
                        className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                    >
                        <div className='flex flex-1 items-center'>
                            <img
                                src={product?.image}
                                alt={product.title}
                                className='w-12 h-12 rounded-lg'
                            />
                            <p className='flex-1 px-4 mr-8'>{product?.title}</p>
                        </div>
                        <div className='flex justify-between items-center h-8'>
                            <p className='flex items-center mr-8'>
                                Quantity: {product?.quantity}
                            </p>
                            <p className='flex items-center w-16 justify-end'>
                                $
                                {(product?.price * product.quantity).toFixed(2)}
                            </p>
                            <button
                                type='button'
                                className='ml-8 h-8'
                                onClick={() =>
                                    removeProductFromShoppingCart(index)
                                }
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M6 18 18 6M6 6l12 12'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                <div className='w-full flex justify-end'>
                    <div className='w-32 px-2 py-2 flex justify-between'>
                        <p>Total:</p>
                        <p className='font-bold'>${totalPrice}</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <button className='border border-gray px-4 py-2'>
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default ShoppingCart
