import TextInputBase from '@features/forms/TextInputBase'
import {
    FormState,
    ShowInputErr,
} from '@features/forms/TextInputBase/Interfaces'
import { useState } from 'react'

function PaymentForm(props: any) {
    const { paymentFormData } = props

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

    return (
        <form className='grid grid-cols-6 gap-2'>
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
        </form>
    )
}

export default PaymentForm
