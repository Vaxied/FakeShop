import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import ShoppingCartProduct from '@features/shoppingCart/ShoppingCartProduct'
import ActionButton from '@components/buttons/ActionButton'
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

    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length)
        return <p>You don&apos;t have any products yet</p>

    return (
        <PrimaryContainer>
            <div>
                <div className='flex flex-wrap gap-4 md:flex-nowrap h-full'>
                    <div className='flex flex-col w-full md:w-1/2 justify-between text-sm'>
                        <CheckoutForm />
                    </div>
                    <div className='flex items-start flex-wrap w-full md:w-1/2'>
                        <div className='flex flex-wrap min-w-80'>
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-3'>
                                    Order summary
                                </p>
                                <div className='text-sm min-w-80'>
                                    {shoppingCartProducts.map(product => (
                                        <ShoppingCartProduct
                                            product={product}
                                            key={product.product_id}
                                        />
                                    ))}
                                </div>
                                <div className='w-full flex justify-between self-start font-light text-sm'>
                                    <p className='flex gap-2 flex-col'>
                                        <span>Subtotal</span>
                                        <span>Shipping</span>
                                        <span className='text-base font-semibold'>
                                            Total
                                        </span>
                                    </p>

                                    <p className='flex gap-2 flex-col text-end'>
                                        <span>
                                            $
                                            {calculateTotalPrice(
                                                shoppingCartProducts,
                                            )}
                                        </span>
                                        <span>Enter shipping address</span>
                                        <span className='text-base font-semibold'>
                                            $
                                            {calculateTotalPrice(
                                                shoppingCartProducts,
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex self-end justify-end pt-3'>
                            <ActionButton
                                text={'Place order'}
                                type={'button'}
                                action={addNewOrder}
                                route={undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default CheckoutPage
