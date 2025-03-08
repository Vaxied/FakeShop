import PaymentForm from '@components/forms/PaymentForm'
import RadioInput from '../RadioInput'
import TextInputBase from '@components/forms/TextInputBase'
import useForms from '@hooks/useForms'
import { useState } from 'react'
import {
    AddressForm,
    FormState,
    ShowInputErr,
    userAddress,
} from '@components/forms/TextInputBase/Interfaces'
import SectionHeaderText from '@components/common/text/SectionHeaderText'

function CheckoutForm() {
    const mockAddresses = [
        {
            id: '1',
            firstName: 'Andy',
            lastName: 'Rocks',
            street: '4545 1st Ave SE',
            // suite: 'Apt. #1',
            city: 'Cedar Rapids',
            state: 'Iowa',
            zipCode: '52402',
            country: 'United States',
            phone: '(123) 456-7890',
        },
        {
            id: '2',
            firstName: 'Sandra',
            lastName: 'Mountain',
            street: '1400 N La Brea Ave',
            suite: 'Apt. #2',
            city: 'Inglewood',
            state: 'California',
            zipCode: '90302',
            country: 'United States',
            phone: '(123) 456-7890',
        },
    ]

    const formatFormState = (address: userAddress) => {
        const cleanAddress = getAddressWithoutId(address)
        console.log('address', cleanAddress)
        if (!cleanAddress.suite) return { ...cleanAddress, suite: '' }
        else return cleanAddress
    }

    const getAddressWithoutId = (address: userAddress): AddressForm => {
        const { id, ...rest } = address
        return rest
    }

    const [formState, setFormState] = useState<FormState>(
        formatFormState(mockAddresses[0]),
    )
    const [showInputErr, setShowInputErr] = useState<ShowInputErr>({
        firstName: false,
        lastName: false,
        street: false,
        suite: false,
        city: false,
        state: false,
        zipCode: false,
        country: false,
        phone: false,
    })

    const stateProps = {
        formState,
        setFormState,
        showInputErr,
        setShowInputErr,
    }

    const formatAddress = (address: userAddress) => {
        let fullAddress = []
        const fullName = address.firstName + ' ' + address.lastName
        const mainAddress = `${address.street}, ${address.city}`
        const stateZip = `${address.state}, ${address.zipCode}`
        fullAddress.push(fullName)
        fullAddress.push(mainAddress)
        fullAddress.push(stateZip)
        fullAddress.push(address.country)
        fullAddress.push(address.phone)
        return fullAddress
    }
    const { isNameValid } = useForms()
    const [selectedAddressId, setSelectedAddressId] = useState<string>(
        mockAddresses[0].id,
    )

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
            id: 'user-address',
            name: 'user-address',
            label: 'address',
            type: 'text',
            placeholder: 'Address',
            value: 'street',
            inputErr: 'Invalid address',
            validationFunc: isNameValid,
        },
        {
            id: 'suite',
            name: 'appSuite',
            label: 'app suite',
            type: 'text',
            placeholder: 'Apartment, suite, etc. (optional)',
            value: 'suite',
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
            className: `col-span-3`,
            validationFunc: isNameValid,
        },
        {
            id: 'code',
            name: 'zipCode',
            label: 'zip code',
            placeholder: 'ZIP code',
            value: 'zipCode',
            inputErr: 'Invalid ZIP code',
            className: `col-span-3`,
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

    console.log('formstate: ', formState)
    console.log(
        'selected address',
        getAddressWithoutId(mockAddresses[Number(selectedAddressId) - 1]),
    )

    const compareObjects = (obj1: any, obj2: any) => {
        for (const key in obj1) {
            if (obj1[key] !== obj2[key]) return false
        }
        return true
    }
    // TODO: Check for inputErr validations

    return (
        <>
            <div className='w-full'>
                <SectionHeaderText text='Order summary' />
            </div>
            <form action='' className='flex flex-wrap gap-3 w-full text-xs'>
                <span className='font-semibold text-sm'>
                    Choose your address
                </span>
                <div className='w-full'>
                    <div className='flex flex-wrap gap-3 pl-4'>
                        {mockAddresses.map(
                            (address: userAddress, index: number) => (
                                <div
                                    role='button'
                                    className='w-full border-2 hover:cursor-pointer flex items-center gap-3 p-3 md:gap-6 md:px-8 py-3 bg-white rounded-lg text-gray-700 hover:border-2 hover:border-accent has-[:checked]:bg-soft-accent has-[:checked]:text-white'
                                    onClick={() => {
                                        setSelectedAddressId(address.id)
                                        setFormState(formatFormState(address))
                                    }}
                                >
                                    <RadioInput
                                        key={address.id}
                                        id={address.id}
                                        address={address}
                                        name={'address'}
                                        content={formatAddress(address)}
                                        index={index}
                                        checked={
                                            address.id === selectedAddressId &&
                                            compareObjects(
                                                getAddressWithoutId(address),
                                                formState,
                                            )
                                        }
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <span className='block pb-4 font-semibold text-sm'>
                        Delivery
                    </span>
                    <div className='grid grid-cols-6 gap-3 pl-4 text-sm'>
                        {deliveryFormStructure.map(field => {
                            return (
                                <div
                                    className={`relative ${field.className ?? 'col-span-6'}`}
                                >
                                    <TextInputBase
                                        inputProp={field}
                                        stateProps={stateProps}
                                        showLabel={true}
                                        labelBgColor='bg-gradient-to-b from-container from-50% to-white to-50%'
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='w-full'>
                    <span className='block text-md font-semibold pb-2 text-sm'>
                        Shipping method
                    </span>
                    <div className='w-full pl-4'>
                        <div className='p-3 text-xs bg-accent text-white rounded-lg'>
                            Enter your shipping address to view available
                            shipping methods.
                        </div>
                    </div>
                </div>
                {/* <div className='w-full'> */}
                {/*     <div className='pb-2'> */}
                {/*         <p className='font-semibold text-sm'>Payment</p> */}
                {/*         <p className='font-light text-xs text-gray-400'> */}
                {/*             All transations are secure and encrypted */}
                {/*         </p> */}
                {/*     </div> */}
                {/* <PaymentForm paymentFormData={paymentFormData} /> */}
                {/* </div> */}
            </form>
        </>
    )
}

export default CheckoutForm
