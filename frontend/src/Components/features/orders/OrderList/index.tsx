import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import OrderInfo from '../OrderInfo'

function OrderList() {
    const { orders } = React.useContext(StoreContext) as StoreContextType
    console.log('orders', orders)
    if (!Array.isArray(orders) || !orders.length)
        return <p>You don&apos;t have any placed orders yet</p>

    return (
        <PrimaryContainer>
            <p>My Orders</p>
            {orders.map((order) => (
                <OrderInfo order={order} key={order.orderId} />
            ))}
        </PrimaryContainer>
    )
}

export default OrderList
