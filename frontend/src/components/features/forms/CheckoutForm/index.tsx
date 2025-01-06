import CheckInput from '../CheckInput'
import TextInput from '../TextInput'

type CustomerAddress = {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

function CheckoutForm() {
    const formatAddress = (address: CustomerAddress) => {
        return Object.values(address).join(', ')
    }
    const mockAddresses = [
        {
            firstName: 'Andy',
            lastName: 'Rocks',
            street: '4545 1st Ave SE',
            city: 'Cedar Rapids',
            state: 'Iowa',
            zipCode: '52402',
            country: 'United States',
        },
        {
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
            placeholder: 'First Name',
            value: 'firstName',
            inputErr: '* Please input letters only',
            className: `col-span-3`,
            // validationFunc: isNameValid,
        },
        {
            id: 'last-name',
            name: 'lastName',
            label: 'last name',
            type: 'text',
            placeholder: 'Last Name',
            value: 'lastName',
            inputErr: '* Please input letters only',
            className: `col-span-3`,
            // validationFunc: isNameValid,
        },
        {
            id: 'address',
            name: 'address',
            label: '',
            type: 'text',
            placeholder: 'Address',
            value: 'address',
            inputErr: '',
            // validationFunc: isEmailValid,
        },
        {
            id: 'apt-suite',
            name: 'appSuite',
            label: 'appSuite',
            type: 'text',
            placeholder: 'Apartment, suite, etc. (optional)',
            value: 'appSuite',
            inputErr: '',
            // validationFunc: isEmailValid,
        },
        {
            id: 'city',
            name: 'city',
            label: 'city',
            type: 'text',
            placeholder: 'City',
            value: 'city',
            inputErr: '',
            className: `col-span-2`,
            // validationFunc: isEmailValid,
        },
        {
            id: 'zip-code',
            name: 'zipCode',
            label: 'zip-code',
            type: 'text',
            placeholder: 'Zip code',
            value: 'phone',
            inputErr: '',
            className: `col-span-2`,
            // validationFunc: isEmailValid,
        },
        {
            id: 'zip-code',
            name: 'zipCode',
            label: 'zip-code',
            type: 'text',
            placeholder: 'Zip code',
            value: 'phone',
            inputErr: '',
            className: `col-span-2`,
            // validationFunc: isEmailValid,
        },
        {
            id: 'phone',
            name: 'phone',
            label: 'phone',
            type: 'text',
            placeholder: 'Phone',
            value: 'phone',
            inputErr: '',
            // validationFunc: isEmailValid,
        },
    ]

    return (
        <form action='' className='flex pt-3 flex-wrap gap-3 w-full'>
            <span className='font-semibold'>Delivery</span>
            <div className='flex flex-col gap-3'>
                {mockAddresses.map(
                    (address: CustomerAddress, index: number) => (
                        <div className='flex gap-4 items-center py-2'>
                            <CheckInput
                                content={formatAddress(address)}
                                index={index}
                            />
                        </div>
                    ),
                )}
                <div className='grid grid-cols-6 gap-3'>
                    {deliveryFormStructure.map(field => {
                        return (
                            <div
                                className={`relative ${
                                    field.className ?? 'col-span-6'
                                }`}
                            >
                                <TextInput
                                    name={field.name}
                                    content={field.value}
                                    showLabel={false}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </form>
    )
}

export default CheckoutForm
