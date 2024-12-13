import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import ShoppingCartProduct from '@components/features/shoppingCart/ShoppingCartProduct'
import ActionButton from '@components/buttons/PrimaryButton'

function CheckoutPage() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        calculateTotalPrice,
        addNewOrder,
    } = React.useContext(StoreContext) as StoreContextType
    const { loadResource } = useApi()

    React.useEffect(() => {
        const validateShoppingCart = async () => {
            const cart = await loadResource('json', '/load-cart')
            console.log('cart', cart)
            if (shoppingCartProducts !== cart) {
                setShoppingCartProducts(cart)
            }
        }
        validateShoppingCart()
    }, [])

    // console.log('orders', orders)
    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length)
        return <p>You don&apos;t have any products yet</p>

    return (
        <PrimaryContainer>
            <div className='flex flex-col justify-between min-h-full'>
                <div>
                    <p className='font-semibold mb-3'>My Order</p>
                    {shoppingCartProducts.map((product) => (
                        <ShoppingCartProduct
                            product={product}
                            key={product.product_id}
                        />
                    ))}
                    <div className='w-full flex justify-end'>
                        <div className='w-32 px-2 py-2 flex justify-between'>
                            <p>Total:</p>
                            <p className='font-bold'>
                                ${calculateTotalPrice(shoppingCartProducts)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <ActionButton
                        text={'Place order'}
                        type={'button'}
                        action={addNewOrder}
                        route={undefined}
                    />
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default CheckoutPage
