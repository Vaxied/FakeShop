import React, { useContext } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import ShoppingCartProduct from '@features/shoppingCart/ShoppingCartProduct'
import ActionButton from '@components/buttons/ActionButton'
import CheckoutForm from '@features/forms/CheckoutForm'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@@types/product'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

function CheckoutPage() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        calculateTotalPrice,
        addNewOrder,
        orders,
    } = React.useContext(StoreContext) as StoreContextType
    const { loadResource } = useApi()
    const navigate = useNavigate()

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

    const initialPaymentOptions = {
        clientId: import.meta.env.VITE_CLIENT_ID,
        'enable-funding': 'venmo',
        'buyer-country': 'US',
        currency: 'USD',
        components: 'buttons',
    }
    console.log(initialPaymentOptions)

    const onApprove = async (data: any, actions: any) => {
        try {
            const orderDetails = await actions.order.capture()
            console.log('orderDetails', orderDetails)
            const { orderID } = data
            console.log('orderID', orderID)
            addNewOrder()
            console.log('ADDED NEW ORDER')
        } catch (err) {
            console.log('error', err)
        }
    }

    // const shippingCost = '10.00'
    // const taxCost = '10.00'
    const totalOrderAmount =
        calculateTotalPrice(shoppingCartProducts).toFixed(2)

    console.log(calculateTotalPrice(shoppingCartProducts).toString())

    const createPaypalOrderRequestSchema = (data: IProduct[]) => {
        return data.map((item: IProduct) => {
            return {
                name: item.title,
                quantity: item.product_quantity.toString(),
                unit_amount: {
                    currency_code: 'USD',
                    value: item.price.toString(),
                },
                category: 'PHYSICAL_GOODS',
                image_url: item.image,
            }
        })
    }
    console.log(createPaypalOrderRequestSchema(shoppingCartProducts))

    const createPaypalOrder = (data: any, actions: any) => {
        // TODO format this properly
        return actions.order.create({
            purchase_units: [
                {
                    description: 'FakeShop',
                    amount: {
                        currency_code: 'USD',
                        value: totalOrderAmount.toString(), // Total price
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: totalOrderAmount, // Total price
                            },
                        },
                    },
                    items: createPaypalOrderRequestSchema(shoppingCartProducts),
                },
            ],
        })
    }

    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length)
        return <p>You don&apos;t have any products yet</p>

    // TODO MOVE ORDER SUMMARY TO THE TOP ON SMALL SCREENS
    return (
        <PrimaryContainer>
            <div>
                <div className='flex flex-wrap gap-6 md:flex-nowrap h-full text-xs'>
                    <div className='flex flex-col w-full md:w-1/2 justify-between'>
                        <CheckoutForm />
                    </div>
                    <div className='flex items-start flex-wrap w-full md:w-1/2'>
                        <div className='flex flex-wrap min-w-80'>
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-3'>
                                    Order summary
                                </p>
                                <div className='min-w-80'>
                                    {shoppingCartProducts.map(product => (
                                        <ShoppingCartProduct
                                            product={product}
                                            key={product.product_id}
                                        />
                                    ))}
                                </div>
                                <div className='w-full flex justify-between self-start font-light'>
                                    <p className='flex gap-1 flex-col text-sm'>
                                        <span>Subtotal</span>
                                        <span>Shipping</span>
                                        <span className='font-semibold'>
                                            Total
                                        </span>
                                    </p>

                                    <p className='flex gap-1 flex-col text-end text-sm'>
                                        <span>
                                            $
                                            {calculateTotalPrice(
                                                shoppingCartProducts,
                                            ).toFixed(2)}
                                        </span>
                                        <span>Enter shipping address</span>
                                        <span className='font-semibold'>
                                            $
                                            {calculateTotalPrice(
                                                shoppingCartProducts,
                                            ).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap self-end justify-end pt-6 text-sm'>
                            <div className='w-full'>
                                <PayPalScriptProvider
                                    options={initialPaymentOptions}
                                >
                                    <PayPalButtons
                                        style={{
                                            // shape: 'rect',
                                            height: 40,
                                            layout: 'vertical',
                                            // color: 'gold',
                                            label: 'paypal',
                                        }}
                                        createOrder={createPaypalOrder}
                                        onApprove={(data, actions) =>
                                            onApprove(data, actions)
                                        }
                                        onError={() =>
                                            console.log('transaction error')
                                        }
                                        onCancel={() =>
                                            console.log('transaction canceled')
                                        }
                                    />
                                </PayPalScriptProvider>
                            </div>
                            <ActionButton
                                text={'Place order'}
                                type={'button'}
                                // action={addNewOrder}
                                // testing order success
                                action={() =>
                                    navigate(
                                        `/orderSuccess/${orders[0].orderId}`,
                                        { state: orders[0] },
                                    )
                                }
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
