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
            street: '4545 1st Ave SE',
            city: 'Cedar Rapids',
            state: 'Iowa',
            zipCode: '52402',
            country: 'United States',
        },
        {
            street: '1400 N La Brea Ave',
            city: 'Inglewood',
            state: 'California',
            zipCode: '90302',
            country: 'United States',
        },
    ]
    return (
        <form action='' className='flex pt-3 flex-wrap gap-3 w-full'>
            <span className='font-semibold'>Delivery</span>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2 items-center py-2'>
                    <input
                        id='address-1'
                        type='checkbox'
                        defaultChecked={true}
                        readOnly={true}
                        value={'Address 1'}
                        className='self-start border rounded-full mt-2'
                    />
                    <label htmlFor='address-1'>
                        {formatAddress(mockAddresses[0])}
                    </label>
                </div>
                <div className='flex gap-2 items-center py-2'>
                    <input
                        type='checkbox'
                        readOnly={true}
                        value={'Address 2'}
                        className='self-start border rounded-full mt-2'
                    />
                    <label htmlFor='address-2 '>
                        {formatAddress(mockAddresses[1])}
                    </label>
                </div>
                <div className='flex flex-col'>
                    <div className='flex w-full gap-2 py-2'>
                        <div className='relative'>
                            <TextInput
                                name='first-name'
                                content='First name'
                                showLabel={false}
                            />
                        </div>
                        <div className='relative'>
                            <TextInput
                                name='last-name'
                                content='Last name'
                                showLabel={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <TextInput */}
            {/*     name={'Your Address'} */}
            {/*     content={'This is your address'} */}
            {/* /> */}
        </form>
    )
}

export default CheckoutForm
