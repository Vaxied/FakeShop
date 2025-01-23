import React from 'react'
import { StoreContext } from '@components/Context/context'
import useShoppingCart from '@hooks/useShoppingCart'
import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import ActionButton from '@components/buttons/ActionButton'
import ShoppingCartProductList from '@features/shoppingCart/ShoppingCartProductList'

function ShoppingCart() {
    const { shoppingCartProducts } = React.useContext(
        StoreContext,
    ) as StoreContextType

    const { calculateTotalPrice } = useShoppingCart()

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
                    <ShoppingCartProductList closeButtonEnabled={true} />
                    <div className='w-full flex justify-end'>
                        <div className='w-32 px-2 py-2 flex justify-between'>
                            <p>Total:</p>
                            <p className='font-bold'>
                                ${totalPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <ActionButton
                        text={'Go to checkout'}
                        type='submit'
                        route={'/checkout'}
                        max={true}
                    />
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default ShoppingCart
