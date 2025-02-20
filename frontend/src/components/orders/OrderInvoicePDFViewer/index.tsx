import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import OrderInvoice from '@components/orders/OrderInvoice'
import { Order } from '@@types/order'
import OrderSuccess from '@pages/OrderSuccess'

// Create styles

console.log('order invoice viewer')
function OrderInvoicePDFViewer({
    setShowInvoice,
    order,
    orderBreakdown,
}: {
    setShowInvoice: (boolean: boolean) => void
    order: Order
    orderBreakdown: {
        tax: string
        shipping: string
        total: string
    }
}) {
    return (
        <>
            <div className='fixed top-16 bottom-0 left-0 right-0 z-30 bg-gray p-6 backdrop-blur-md'>
                <div
                    id='invoice-container'
                    className='w-full h-full bg-black'
                    // className='fixed top-20 left-12 right-12 bottom-6 bg-black z-40'
                >
                    <div className='flex justify-end w-full'>
                        <button
                            className='bg-white text-black rounded-full p-2 m-2'
                            onClick={() => setShowInvoice(false)}
                        >
                            Close
                        </button>
                    </div>
                    <PDFViewer>
                        <OrderInvoice
                            order={order}
                            orderBreakdown={orderBreakdown}
                        />
                    </PDFViewer>
                </div>
            </div>
        </>
    )
}

export default OrderInvoicePDFViewer
