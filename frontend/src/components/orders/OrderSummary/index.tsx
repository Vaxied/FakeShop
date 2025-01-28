import { StoreContextType } from '@@types/store'
import StoreProvider from '@components/Context'
import { StoreContext } from '@components/Context/context'
import ProductList from '@components/product/ProductList'
import useShoppingCart from '@hooks/useShoppingCart'
import { useContext } from 'react'

function OrderSummary() {
    const { shoppingCartProducts } = useContext(
        StoreContext,
    ) as StoreContextType
    const { calculateTotalPrice } = useShoppingCart()
    return (
        <div className='min-w-80'>
            <ProductList products={shoppingCartProducts} />
            <div className='flex w-full justify-end gap-x-12 md:justify-between self-start font-light pb-4 px-2'>
                <p className='flex gap-1 flex-col text-sm'>
                    <span>Subtotal</span>
                    <span>Shipping</span>
                    <span className='font-semibold'>Total</span>
                </p>

                <p className='flex gap-1 flex-col text-end text-sm'>
                    <span>
                        ${calculateTotalPrice(shoppingCartProducts).toFixed(2)}
                    </span>
                    <span>Enter shipping address</span>
                    <span className='font-semibold'>
                        ${calculateTotalPrice(shoppingCartProducts).toFixed(2)}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default OrderSummary
