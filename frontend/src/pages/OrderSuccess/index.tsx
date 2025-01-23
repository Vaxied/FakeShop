import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import { StoreContext } from '@components/Context/context'
import PrintIcon from '@components/icons/PrintIcon'
import ProductList from '@features/product/ProductList'
import useApi from '@hooks/useApi'
import { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function OrderSuccess() {
    const api = import.meta.env.VITE_API
    const { orders } = useContext(StoreContext) as StoreContextType
    const { loadResource } = useApi()
    const getOrders = async () => {
        return await loadResource('json', '/get-orders')
    }

    const { id } = useParams()
    const location = useLocation()
    const order = location.state

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
    // if (!params) {
    //     try {
    // const orderData = await getData()
    // } catch (err) {
    // console.log(err)
    // }
    // }

    console.log('state: ', order)

    return (
        <PrimaryContainer>
            <div className='flex flex-col p-3 md:p-8 relative'>
                <div className='absolute top-0 right-0'>
                    <button className=''>
                        <PrintIcon />
                    </button>
                </div>
                <h2 className='pb-4 font-semibold'>Order details</h2>
                <div className='text-sm'>
                    <div className='pb-4'>
                        <p className='flex flex-wrap gap-x-2'>
                            <span>Order</span>
                            <span className='font-medium'>#{id}</span>
                        </p>
                        <p>Paypal order reference: #somehting</p>
                        <p>
                            {order.date &&
                                `Placed on ${order.date.substring(0, 10)} at
                    ${order.date.substring(11, 16)}`}
                        </p>
                    </div>
                    <div className='flex flex-wrap pb-4 gap-y-3'>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <span className='font-medium'>Shipped to:</span>
                            <span>
                                {mockAddresses[0].firstName}{' '}
                                {mockAddresses[0].lastName}
                            </span>
                            <p className=''>
                                <span>
                                    {mockAddresses[0].street},{' '}
                                    {mockAddresses[0].city}
                                </span>
                            </p>
                            <p>
                                <span>
                                    {mockAddresses[0].zipCode},{' '}
                                    {mockAddresses[0].state}
                                </span>
                            </p>
                            <span>{mockAddresses[0].country}</span>
                        </div>
                        <div className='flex flex-col md:w-1/2 w-full'>
                            <span>Billed to:</span>
                            <span>
                                {mockAddresses[0].firstName}{' '}
                                {mockAddresses[0].lastName}
                            </span>
                            <p className=''>
                                <span>
                                    {mockAddresses[0].street},{' '}
                                    {mockAddresses[0].city}
                                </span>
                            </p>
                            <p>
                                <span>
                                    {mockAddresses[0].zipCode},{' '}
                                    {mockAddresses[0].state}
                                </span>
                            </p>
                            <span>{mockAddresses[0].country}</span>
                        </div>
                    </div>
                </div>
                <p className='py-3 font-semibold'>
                    item list ( {order.productList.length} )
                </p>
                <ProductList products={order.productList} />
                <div className='w-full flex justify-end font-light text-sm'>
                    <div className='flex w-64 justify-between gap-8 p-2'>
                        <p className='flex gap-2 flex-col'>
                            <span>Subtotal</span>
                            <span>Shipping</span>
                            <span>Tax</span>
                            <span className='text-base font-semibold'>
                                Total
                            </span>
                        </p>

                        <p className='flex gap-2 flex-col text-end'>
                            <span>${order.totalPrice}</span>
                            <span>$7.69</span>
                            <span>$1.99</span>
                            <span className='text-base font-semibold'>
                                ${order.totalPrice}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </PrimaryContainer>
    )
}
export default OrderSuccess
