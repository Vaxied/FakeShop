import React, { useEffect, useState } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'
import PrimaryContainer from '@components/common/containers/PrimaryContainer'
import ActionButton from '@components/common/buttons/ActionButton'
import CheckoutForm from '@components/forms/CheckoutForm'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@@types/product'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderSummary from '@components/orders/OrderSummary'
import SectionHeaderText from '@components/common/text/SectionHeaderText'

type Func = (...args: any[]) => void

function CheckoutPage() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        calculateTotalPrice,
        addNewOrder,
        orders,
    } = React.useContext(StoreContext) as StoreContextType
    const { loadResource } = useApi()
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)
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
        window.addEventListener('load', debouncedResize)
        return () => {
            window.removeEventListener('load', debouncedResize)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', debouncedResize)
        return () => {
            window.removeEventListener('resize', debouncedResize)
        }
    }, [isSmallScreen])

    const debounce = (func: Func, wait: number) => {
        let timeout: number
        return function (this: any, ...args: any) {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }

    const resize = () => {
        console.log('resize entering')
        console.log('screen width', window.innerWidth)
        if (isSmallScreen && window.innerWidth <= 768) return
        if (!isSmallScreen && window.innerWidth > 768) return
        if (isSmallScreen && window.innerWidth > 768) {
            console.log('resizing small')
            setIsSmallScreen(false)
        }
        if (!isSmallScreen && window.innerWidth <= 768) {
            console.log('resizing large')
            setIsSmallScreen(true)
        }
        console.log('resize')
    }

    const debouncedResize = debounce(resize, 100)

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

    console.log(isSmallScreen, 'is small screen')
    // TODO MOVE ORDER SUMMARY TO THE TOP ON SMALL SCREENS
    return (
        <PrimaryContainer>
            <div className='w-full'>
                <SectionHeaderText text='Order summary' />
            </div>
            <div>
                <div className='flex flex-wrap md:flex-nowrap gap-6 h-full text-xs'>
                    <div className='flex flex-col w-full md:w-1/2'>
                        {isSmallScreen && (
                            <div id='order-summary' className='w-full'>
                                <span className='block font-semibold text-sm pb-2'>
                                    Your cart
                                </span>
                                <OrderSummary />
                            </div>
                        )}
                        <CheckoutForm />
                    </div>
                    <div className='flex items-start flex-wrap w-full md:w-1/2'>
                        <div className='flex flex-wrap min-w-80 w-full'>
                            {!isSmallScreen && (
                                <div id='order-summary' className='w-full'>
                                    <span className='block font-semibold text-sm pb-2'>
                                        Your cart
                                    </span>
                                    <OrderSummary />
                                </div>
                            )}
                        </div>
                        <div className='w-full flex flex-wrap self-end text-sm'>
                            <span className='block font-semibold text-sm pb-2'>
                                Choose your payment method
                            </span>
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
