import PaymentForm from '@features/forms/PaymentForm'
import CheckInput from '../CheckInput'
import TextInput from '../TextInput'
import TextInputBase from '@features/forms/TextInputBase'
import useForms from '@hooks/useForms'
import { useState } from 'react'
import {
    FormState,
    ShowInputErr,
} from '@features/forms/TextInputBase/Interfaces'

type CustomerAddress = {
    id?: string
    firstName: string
    lastName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

function CheckoutForm() {
    const [formState, setFormState] = useState<FormState>({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    })
    const [showInputErr, setShowInputErr] = useState<ShowInputErr>({
        firstName: false,
        lastName: false,
        street: false,
        city: false,
        state: false,
        zipCode: false,
        country: false,
    })

    const stateProps = {
        formState,
        setFormState,
        showInputErr,
        setShowInputErr,
    }

    const formatAddress = (address: CustomerAddress) => {
        let fullAddress = []
        const fullName = address.firstName + ' ' + address.lastName
        const mainAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`
        fullAddress.push(fullName)
        fullAddress.push(mainAddress)
        fullAddress.push(address.country)

        return fullAddress
    }
    const { isNameValid } = useForms()
    const mockAddresses = [
        {
            id: '1',
            firstName: 'Andy',
            lastName: 'Rocks',
            street: '4545 1st Ave SE',
            city: 'Cedar Rapids',
            state: 'Iowa',
            zipCode: '52402',
            country: 'United States',
        },
        {
            id: '2',
            firstName: 'Sandra',
            lastName: 'Mountain',
            street: '1400 N La Brea Ave',
            city: 'Inglewood',
            state: 'California',
            zipCode: '90302',
            country: 'United States',
        },
    ]

    const deliveryFormStructure = [
        {
            id: 'first-name',
            name: 'firstName',
            label: 'first name',
            type: 'text',
            placeholder: 'First name',
            value: 'firstName',
            inputErr: 'Please input letters only',
            className: `col-span-3`,
            validationFunc: isNameValid,
        },
        {
            id: 'last-name',
            name: 'lastName',
            label: 'last name',
            type: 'text',
            placeholder: 'Last name',
            value: 'lastName',
            inputErr: 'Please input letters only',
            className: `col-span-3`,
            validationFunc: isNameValid,
        },
        {
            id: 'address',
            name: 'address',
            label: '',
            type: 'text',
            placeholder: 'Address',
            value: 'address',
            inputErr: 'Invalid address',
            validationFunc: isNameValid,
        },
        {
            id: 'apt-suite',
            name: 'appSuite',
            label: 'appSuite',
            type: 'text',
            placeholder: 'Apartment, suite, etc. (optional)',
            value: 'appSuite',
            inputErr: 'Invalid address',
            validationFunc: isNameValid,
        },
        {
            id: 'city',
            name: 'city',
            label: 'city',
            type: 'text',
            placeholder: 'City',
            value: 'city',
            inputErr: 'Invalid city',
            className: `col-span-2`,
            validationFunc: isNameValid,
        },
        {
            id: 'code',
            name: 'zipCode',
            label: 'ZIP code',
            placeholder: 'ZIP code',
            value: 'zipCode',
            inputErr: 'Invalid ZIP code',
            className: `col-span-2`,
            validationFunc: isNameValid,
        },
        {
            id: 'zip-code',
            name: 'zipCode',
            label: 'zip-code',
            type: 'text',
            placeholder: 'Zip code',
            value: 'phone',
            inputErr: 'Invalid ZIP code',
            className: `col-span-2`,
            validationFunc: isNameValid,
        },
        {
            id: 'phone',
            name: 'phone',
            label: 'phone',
            type: 'text',
            placeholder: 'Phone',
            value: 'phone',
            inputErr: 'Invalid phone number',
            validationFunc: isNameValid,
        },
    ]

    const paymentFormData = [
        {
            id: 'name-on-card',
            name: 'nameOnCard',
            label: 'Name on card',
            placeholder: 'Name on card',
            value: '',
            inputErr: 'Please input letters only',
            validationFunc: isNameValid,
        },
        {
            id: 'card-number',
            name: 'cardNumber',
            label: 'Card number',
            placeholder: 'Card number',
            value: 'cardNumber',
            inputErr: 'Invalid credit card number',
            validationFunc: isNameValid,
        },
        {
            id: 'expiration-date',
            name: 'expirationDate',
            label: 'Expiration Date',
            placeholder: 'Expiration date (MM/YY)',
            value: 'expirationDate',
            inputErr: 'Invalid expiration date',
            validationFunc: isNameValid,
            className: 'col-span-3',
        },
        {
            id: 'security-code',
            name: 'securityCode',
            label: 'Security code',
            placeholder: 'Security code',
            value: 'securityCode',
            inputErr: 'Invalid CVC number',
            validationFunc: isNameValid,
            className: 'col-span-3',
        },
    ]

    return (
        <form action='' className='flex flex-wrap gap-3 w-full'>
            <span className='font-semibold'>Your registered addresses</span>
            <div className='w-full'>
                <div className='flex flex-col gap-y-2'>
                    {mockAddresses.map(
                        (address: CustomerAddress, index: number) => (
                            <div className='flex items-center p-3 gap-4 bg-container border rounded-lg text-gray-700 text-sm'>
                                <CheckInput
                                    id={address.id}
                                    name={'address'}
                                    content={formatAddress(address)}
                                    index={index}
                                />
                            </div>
                        ),
                    )}
                </div>
            </div>
            <div className='w-full'>
                <span className='block pb-2 font-semibold'>Delivery</span>
                <div className='grid grid-cols-6 gap-2'>
                    {deliveryFormStructure.map(field => {
                        return (
                            <div
                                className={`relative ${
                                    field.className ?? 'col-span-6'
                                }`}
                            >
                                <TextInputBase
                                    inputProp={field}
                                    stateProps={stateProps}
                                    showLabel={false}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='w-full'>
                <span className='block text-md font-semibold pb-2'>
                    Shipping method
                </span>
                <div className='p-3 text-xs bg-container rounded-lg'>
                    Enter your shipping address to view available shipping
                    methods.
                </div>
            </div>
            <div className='w-full'>
                <div className='pb-2'>
                    <p className='font-semibold'>Payment</p>
                    <p className='font-light text-xs text-gray-400'>
                        All transations are secure and encrypted
                    </p>
                </div>
                <PaymentForm paymentFormData={paymentFormData} />
            </div>
        </form>
    )
}

export default CheckoutForm
