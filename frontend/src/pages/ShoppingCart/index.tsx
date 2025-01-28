import React from 'react'
import { StoreContext } from '@components/Context/context'
import useShoppingCart from '@hooks/useShoppingCart'
import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/common/containers/PrimaryContainer'
import ActionButton from '@components/common/buttons/ActionButton'
import ShoppingCartProductList from '@components/shoppingCart/ShoppingCartProductList'
import SectionHeaderText from '@components/common/text/SectionHeaderText'

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
            <div className='flex flex-col min-h-full justify-between'>
                <SectionHeaderText text='My Cart' />
                <div id='items-container'>
                    <ShoppingCartProductList closeButtonEnabled={true} />
                    <div className='w-full flex justify-end'>
                        <div className='w-32 px-2 py-2 flex justify-between'>
                            <p className='font-semibold'>Total:</p>
                            <p className='font-semibold'>
                                ${totalPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full flex justify-end mt-auto'>
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
