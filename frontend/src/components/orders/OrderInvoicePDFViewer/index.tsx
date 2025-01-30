import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import OrderInvoice from '@components/orders/OrderInvoice'
import { Order } from '@@types/order'
import OrderSuccess from '@pages/OrderSuccess'

// Create styles

console.log('order invoice viewer')
function OrderInvoicePDFViewer({
    setShowInvoice,
}: {
    setShowInvoice: (boolean: boolean) => void
}) {
    return (
        <div
            id='invoice-container'
            className='fixed top-20 bottom-6 left-12 right-12 z-30 bg-black'
        >
            <div className='flex justify-end w-full h-[10%]'>
                <button
                    className='bg-white text-black rounded-full p-2 m-2'
                    onClick={() => setShowInvoice(false)}
                >
                    Close
                </button>
            </div>
            <PDFViewer>
                <OrderInvoice />
            </PDFViewer>
        </div>
    )
}

export default OrderInvoicePDFViewer
