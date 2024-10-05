import React from 'react'
import { StoreContext } from '../../Context/context'
import useShoppingCart from '../../Hooks/useShoppingCart'
import { StoreContextType } from '../../@types/store'
import { useNavigate } from 'react-router-dom'
import ShoppingCartProduct from '../ShoppingCartProduct'
import PrimaryContainer from '../PrimaryContainer'
import ActionButton from '../ActionButton'

function ShoppingCart() {
    const { shoppingCartProducts } = React.useContext(
        StoreContext
    ) as StoreContextType

    const { calculateTotalPrice } = useShoppingCart()
    const navigate = useNavigate()

    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length) {
        return <p>You have not added any items</p>
    }
    const totalPrice = calculateTotalPrice(shoppingCartProducts)
    console.log('shopping cart', shoppingCartProducts)

    return (
        <PrimaryContainer>
            <div className='flex flex-col justify-between min-h-full'>
                <div>
                    <p className='font-semibold mb-3'>My Cart</p>
                    {shoppingCartProducts.map((product) => (
                        <ShoppingCartProduct
                            product={product}
                            key={product.product_id}
                        />
                    ))}
                    <div className='w-full flex justify-end'>
                        <div className='w-32 px-2 py-2 flex justify-between'>
                            <p>Total:</p>
                            <p className='font-bold'>${totalPrice}</p>
                        </div>
                    </div>
                </div>
                {/* <div className='w-full flex justify-end'>
                    <button
                        type='button'
                        className='border border-gray px-4 py-2 w-full bg-black text-white rounded-lg mt-4'
                        onClick={() => navigate('/checkout')}
                    >
                        Checkout
                    </button>
                </div> */}
                <div className='w-full flex justify-center'>
                    <ActionButton
                        text={'To my cart'}
                        type='submit'
                        action={undefined}
                        route={'/checkout'}
                    />
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default ShoppingCart
