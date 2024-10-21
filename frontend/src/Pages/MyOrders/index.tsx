import React from 'react'
import OrderList from '@components/features/orders/OrderList'
import { StoreContextType } from '@@types/store'
import { StoreContext } from '@components/Context/context'

function MyOrders() {
    const { shoppingCartProducts } = React.useContext(
        StoreContext
    ) as StoreContextType
    if (!Array.isArray(OrderList) || !shoppingCartProducts.length)
        return <OrderList />
}

export default MyOrders
