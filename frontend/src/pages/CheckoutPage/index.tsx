import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import ShoppingCartProduct from '@features/shoppingCart/ShoppingCartProduct'
import ActionButton from '@components/buttons/ActionButton'
import TextInput from '@features/forms/TextInput'
import CheckoutForm from '@features/forms/CheckoutForm'

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
        <div>
            <PrimaryContainer>
                <div className='flex h-full'>
                    <div className='flex flex-col w-3/5 justify-between mr-8 text-sm'>
                        <div>
                            <p className='text-lg font-semibold mb-3'>
                                Order summary
                            </p>
                            {shoppingCartProducts.map(product => (
                                <ShoppingCartProduct
                                    product={product}
                                    key={product.product_id}
                                />
                            ))}
                        </div>
                        <CheckoutForm />
                    </div>
                    <div className='flex flex-wrap w-2/5 px-2 bg-teal-500'>
                        here goes info
                        <p>Total:</p>
                        <p className='font-bold'>
                            ${calculateTotalPrice(shoppingCartProducts)}
                        </p>
                        <div className='w-full flex self-start justify-center'>
                            <ActionButton
                                text={'Place order'}
                                type={'button'}
                                action={addNewOrder}
                                route={undefined}
                            />
                        </div>
                    </div>
                </div>
            </PrimaryContainer>
        </div>
    )
}

export default CheckoutPage
