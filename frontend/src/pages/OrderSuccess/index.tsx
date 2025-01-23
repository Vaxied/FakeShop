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
            <div className='flex flex-col relative'>
                <div className='absolute top-0 right-0'>
                    <button className=''>
                        <PrintIcon />
                    </button>
                </div>
                <h2 className='pb-4'>Order details</h2>
                <div className='text-sm'>
                    <p>Order #{id}</p>
                    <p>Paypal order id (for reference) : #somehting</p>
                    <p>
                        {order.date &&
                            `Placed on ${order.date.substring(0, 10)} at
                    ${order.date.substring(11, 16)}`}
                    </p>
                    <p className='pb-4'>{order.productList.length} item(s)</p>
                    <div className='flex justify-between pb-4'>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <span>Shipped to:</span>
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
                            <p className='py-3'>
                                To track this order insert link
                            </p>
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
                <ProductList products={order.productList} />
                <div className='w-full flex justify-end font-light text-sm'>
                    <div className='flex gap-8'>
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

                {/*     <div className='w-32 py-2'> */}
                {/*         <p className='font-semibold flex justify-end'> */}
                {/*             <span>Subtotal: </span> */}
                {/*             Total: ${order.totalPrice} */}
                {/*         </p> */}
                {/*     </div> */}
                {/* </div> */}
            </div>
        </PrimaryContainer>
    )
}
export default OrderSuccess
