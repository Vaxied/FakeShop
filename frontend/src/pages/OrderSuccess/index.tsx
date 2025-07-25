import { Order } from '@@types/order'
import ActionButton from '@components/common/buttons/ActionButton'
import PrimaryContainer from '@components/common/containers/PrimaryContainer'
import SectionHeaderText from '@components/common/text/SectionHeaderText'
import PrintIcon from '@components/icons/PrintIcon'
import OrderInvoicePDFViewer from '@components/orders/OrderInvoicePDFViewer'
import ProductList from '@components/product/ProductList'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function OrderSuccess() {
    const navigate = useNavigate()

    const [showInvoice, setShowInvoice] = useState(false)

    const { id } = useParams()
    const location = useLocation()
    const order = location.state

    useEffect(() => {
        if (!order) {
            navigate('/')
        }
    }, [])

    if (!order) {
        return null
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

    console.log('state: ', order)

    const calculateOrderData = (order: Order) => {
        const tax = (Number(order.totalPrice) * 0.08).toFixed(2)
        const shipping = (Number(order.totalPrice) * 0.05).toFixed(2)
        const total = (
            Number(order.totalPrice) +
            Number(shipping) +
            Number(tax)
        ).toFixed(2)
        return { tax, shipping, total }
    }
    const orderBreakdown = calculateOrderData(order)
    const key = Math.random()
    return (
        <PrimaryContainer>
            <div className='flex flex-col px-2 md:px-8 md:py-4 relative'>
                <div className='absolute top-0 md:top-4 right-2 md:right-8'>
                    <ActionButton
                        action={() => setShowInvoice(true)}
                        text={'Print'}
                    >
                        <PrintIcon />
                    </ActionButton>
                </div>
                {showInvoice && (
                    <OrderInvoicePDFViewer
                        key={key}
                        setShowInvoice={setShowInvoice}
                        order={order}
                        orderBreakdown={orderBreakdown}
                    />
                )}
                <SectionHeaderText text='Order details' />
                {/* <hr className='border-none mb-4 bg-gray-300 h-[1px]' /> */}
                <div className='text-sm'>
                    <div className='pb-4'>
                        <div className='pb-4'>
                            <p className='flex flex-wrap gap-x-2'>
                                <span>Order</span>
                                <span className='font-medium'>#{id}</span>
                            </p>
                            <p>
                                Paypal order reference:{' '}
                                {order?.PaypalOrderId ?? 'none'}
                            </p>
                        </div>
                        <p>
                            {order.date &&
                                `Placed on ${order.date.substring(0, 10)} at
                    ${order.date.substring(11, 16)}`}
                        </p>
                    </div>
                    <hr className='border-none mb-4 bg-gray-300 h-[1px]' />
                    <div className='w-full flex flex-wrap pb-4 gap-y-3'>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <span className='font-semibold'>Shipped to:</span>
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
                            <span className='font-semibold'>Billed to:</span>
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
                    <hr className='border-none mb-4 bg-gray-300 h-[1px]' />
                </div>
                <div className='pb-1'>
                    <p className='pb-4 font-semibold'>
                        Item list ( {order.productList.length} )
                    </p>
                    <ProductList products={order.productList} />
                </div>
                <div className='w-full flex justify-end font-light text-sm'>
                    <div className='flex w-64 justify-between gap-8 px-2'>
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
                            <span>${orderBreakdown.shipping}</span>
                            <span>${orderBreakdown.tax}</span>
                            <span className='text-base font-semibold'>
                                ${orderBreakdown.total}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </PrimaryContainer>
    )
}
export default OrderSuccess
