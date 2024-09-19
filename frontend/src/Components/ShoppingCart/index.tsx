import React from 'react'
import { StoreContext } from '../../Context/context'
import useShoppingCart from '../../Hooks/useShoppingCart'
import { StoreContextType } from '../../@types/store'
import { useNavigate } from 'react-router-dom'

function ShoppingCart() {
    const { shoppingCartProducts } = React.useContext(
        StoreContext
    ) as StoreContextType

    const { removeProductFromShoppingCart, calculateTotalPrice } =
        useShoppingCart()
    const navigate = useNavigate()

    React.useEffect(() => {}, [])
    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length) {
        return <p>You have not added any items</p>
    }
    const totalPrice = calculateTotalPrice(shoppingCartProducts)
    console.log('shopping cart', shoppingCartProducts)
    return (
        <div className='w-full flex flex-col min-w-[420px] max-w-[900px]'>
            <div className='w-full border border-gray px-6 py-4 rounded-lg bg-gray-100 max-w-[900px]'>
                <p className='font-semibold'>My Order</p>
                {shoppingCartProducts.map((product) => (
                    <div
                        key={product.product_id}
                        className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                    >
                        <div className='flex items-center min-w-[120px] gap-4 mr-8'>
                            <img
                                src={product?.image}
                                alt={product.title}
                                className='w-12 h-12 min-w-12 min-h-12 rounded-lg'
                            />
                            <p className='min-w-[90px] truncate'>
                                {product?.title}
                            </p>
                        </div>
                        <div className='flex justify-between items-center h-8 gap-4'>
                            <p className='min-w-[78px] ]flex flex-nowrap items-center'>
                                Quantity: {product?.product_quantity}
                            </p>
                            <p className='flex items-center w-16 justify-end'>
                                $
                                {product.product_quantity &&
                                    (
                                        product?.price *
                                        product.product_quantity
                                    ).toFixed(2)}
                            </p>
                            <button
                                type='button'
                                className='h-8'
                                onClick={() =>
                                    removeProductFromShoppingCart(
                                        product.product_id
                                    )
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
                <button
                    type='button'
                    className='border border-gray px-4 py-2 w-full bg-black text-white rounded-lg mt-4'
                    onClick={() => navigate('/checkout')}
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default ShoppingCart
