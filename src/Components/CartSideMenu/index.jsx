import React from 'react'
import { StoreContext } from '../../Context/context'
import useShoppingCart from '../../Hooks/useShoppingCart'

function CartSideMenu() {
    const {
        isCartSideMenuOpen,
        openCartSideMenu,
        closeCartSideMenu,
        shoppingCartProducts,
    } = React.useContext(StoreContext)

    const { calculateTotalPrice, removeProductFromShoppingCart } =
        useShoppingCart()

    // if (!isCartSideMenuOpen)
    return (
        <aside
            className={`${
                isCartSideMenuOpen ? '' : 'translate-x-[360px]'
            } fixed right-0 h-[calc(100vh-68px)] top-[68px] w-[360px] border border-gray rounded-lg bg-gray-100 transition-all duration-500 ease-in p-6`}
        >
            <div className='flex flex-col'>
                <button
                    type='button'
                    onClick={(event) => {
                        closeCartSideMenu(event)
                    }}
                    className='flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 left-0 mt-3 ml-3 p-1 bg-white cursor-pointer border border-gray rounded-full z-10'
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
                            d='M6 18 18 6M6 6l12 12'
                        />
                    </svg>
                </button>
                <div className='flex items-center justify-end text-sm'>
                    <span className='my-2'>
                        In Shopping Cart: $
                        {calculateTotalPrice(shoppingCartProducts).toFixed(2)}
                    </span>
                </div>
                <div className='flex flex-col overflow-y-scroll h-[500px]'>
                    {shoppingCartProducts.map((product, index) => (
                        <div
                            key={index}
                            className='flex items-center my-1 p-2 justify-between bg-white border border-gray rounded-lg text-xs'
                        >
                            <div className='flex flex-1 items-center'>
                                <img
                                    src={product?.image}
                                    alt={product.title}
                                    className='w-12 h-12 rounded-lg'
                                />
                                <p className='flex-1 px-4 w-32 truncate'>
                                    {product?.title}
                                </p>
                            </div>
                            <div className='flex justify-between items-center h-8'>
                                <p className='flex items-center'>
                                    Qty: {product?.quantity}
                                </p>
                                <p className='flex items-center w-16 justify-end'>
                                    $
                                    {(
                                        product?.price * product.quantity
                                    ).toFixed(2)}
                                </p>
                                <button
                                    type='button'
                                    className='ml-8 h-8'
                                    onClick={() => {
                                        removeProductFromShoppingCart(index)
                                        console.log('removing')
                                    }}
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
                </div>
            </div>
            <div className='flex w-full justify-end'>
                <button className='border border-gray px-4 py-2'>
                    Checkout
                </button>
            </div>
            <div
                className={`${
                    isCartSideMenuOpen ? 'opacity-0' : 'opacity-1'
                } absolute -left-4 top-1/2 w-4 h-32 bg-gray-500 -translate-y-1/2 rounded-l-md text-white transition-opacity duration-500`}
            >
                <span className='before:content-[""] block w-2 h-2 bg-gray-500 absolute top-[-8px] right-0'></span>
                <span className='before:content-[""] block w-4 h-4 bg-white absolute top-[-16px] rounded-full'></span>
                <button
                    onClick={(event) => openCartSideMenu(event)}
                    className='absolute block top-1/2 -translate-y-1/2 h-12'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5 8.25 12l7.5-7.5'
                        />
                    </svg>
                </button>
                <span className='after:content-[""] block w-4 h-4 bg-white absolute bottom-[-16px] rounded-full z-10'></span>
                <span className='after:content-[""] block w-2 h-2 bg-gray-500 absolute bottom-[-8px] right-0'></span>
            </div>
        </aside>
    )
}

export default CartSideMenu
