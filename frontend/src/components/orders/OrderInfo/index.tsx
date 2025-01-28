import { Order } from '@@types/order'
import ViewButton from '@components/common/buttons/ViewButton'

function OrderInfo(props: Readonly<{ order: Order }>) {
    const { order } = props
    return (
        <div
            key={order.orderId}
            className='w-full flex items-center mb-3 p-2 justify-between bg-white border border-gray rounded-lg gap-4 max-[600px]:text-sm'
        >
            <img
                src={order.productList[0].image}
                alt={order.title}
                className='w-12 h-12 rounded-lg min-w-12 min-h-12 object-contain'
            />
            <p className='w-[70px]'>${order.totalPrice}</p>
            <p className='flex items-center max-[600px]:justify-center'>
                <span className='pr-1'>{order.productList.length}</span>
                <span>item(s)</span>
            </p>
            <p className='flex items-center min-w-24'>
                {order.date && order?.date.substring(0, 10)}
            </p>
            {order.orderId && <ViewButton id={order.orderId} />}
        </div>
    )
}

export default OrderInfo
