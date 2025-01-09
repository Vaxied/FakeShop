import CheckInput from '../CheckInput'
import TextInput from '../TextInput'

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
    const formatAddress = (address: CustomerAddress) => {
        let fullAddress = []
        const fullName = address.firstName + ' ' + address.lastName
        const mainAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`
        fullAddress.push(fullName)
        fullAddress.push(mainAddress)
        fullAddress.push(address.country)

        return fullAddress
    }
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

    const paymentFormData = [
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
            <span className='font-semibold'>Your registered addresses</span>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-y-2'>
                    {mockAddresses.map(
                        (address: CustomerAddress, index: number) => (
                            <div className='flex items-center p-3 gap-4 bg-white border rounded-lg'>
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
                <span className='font-semibold'>Delivery</span>
                <div className='grid grid-cols-6 gap-2'>
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
