import TextInputBase from '@features/forms/TextInputBase'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

import {
    FormState,
    ShowInputErr,
} from '@features/forms/TextInputBase/Interfaces'
import { useContext, useState } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import { IProduct } from '@@types/product'

function PaymentForm(props: any) {
    const { paymentFormData } = props

    const { addNewOrder, calculateTotalPrice, shoppingCartProducts } =
        useContext(StoreContext) as StoreContextType
    const [formState, setFormState] = useState<FormState>({
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
    })

    const [showInputErr, setShowInputErr] = useState<ShowInputErr>({
        nameOnCard: false,
        cardNumber: false,
        expirationDate: false,
        securityCode: false,
    })

    const stateProps = {
        formState,
        setFormState,
        showInputErr,
        setShowInputErr,
    }
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

    return (
        <div className='grid grid-cols-6 gap-2'>
            {paymentFormData.map((field: any) => {
                return (
                    <div
                        className={`relative ${
                            field.className ?? 'col-span-6'
                        }`}
                    >
                        <TextInputBase
                            inputProp={field}
                            stateProps={stateProps}
                            showLabel={field.showLabel ?? false}
                        />
                    </div>
                )
            })}
            <div className='col-span-6 flex items-center gap-2 px-2'>
                <input
                    id='billing-address'
                    name='billingAddress'
                    type='checkbox'
                    defaultChecked={true}
                />
                <label htmlFor='billingAddress' className='text-xs'>
                    Use shipping address as billing address
                </label>
            </div>
            <div className='w-full'>
                <PayPalScriptProvider options={initialPaymentOptions}>
                    <PayPalButtons
                        style={{
                            // shape: 'rect',
                            layout: 'vertical',
                            // color: 'gold',
                            label: 'paypal',
                        }}
                        createOrder={createPaypalOrder}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        onError={() => console.log('transaction error')}
                        onCancel={() => console.log('transaction canceled')}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    )
}

export default PaymentForm
