import React, { useRef } from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/containers/PrimaryContainer'
import OrderInfo from '../OrderInfo'
import Paginator from '@components/features/Paginator'

function OrderList() {
    const { orders } = React.useContext(StoreContext) as StoreContextType
    const ordersContainer = useRef<HTMLDivElement | null>(null)
    console.log('orders', orders)
    if (!Array.isArray(orders) || !orders.length)
        return <p>You don&apos;t have any placed orders yet</p>

    return (
        <PrimaryContainer>
            <div className="py-4" ref={ordersContainer}>
                <p>My Orders</p>
                <Paginator
                    content={orders}
                    contentContainer={ordersContainer.current}
                    render={(content: any) =>
                        content.map((order: any) => (
                            <OrderInfo order={order} key={order.orderId} />
                        ))
                    }
                    elementsPerPage={7}
                ></Paginator>
            </div>
        </PrimaryContainer>
    )
}

export default OrderList
