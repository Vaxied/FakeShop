import React from 'react'
import { StoreContext } from '../../Context/context'
import { useNavigate } from 'react-router-dom'
import { StoreContextType } from '../../@types/store'
import PrimaryContainer from '../PrimaryContainer'

function Orders() {
    const { orders } = React.useContext(StoreContext) as StoreContextType
    const navigate = useNavigate()
    console.log('orders', orders)
    if (!Array.isArray(orders) || !orders.length)
        return <p>You don&apos;t have any placed orders yet</p>

    const ordersHistory = [...orders].reverse()
    console.log('ordersHistory', ordersHistory)

    return (
        <PrimaryContainer>
            <p>My Orders</p>
            {orders.map((order) => (
                <div
                    key={order.orderId}
                    className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                >
                    <div className='flex flex-1 items-center'>
                        <img
                            src={order.productList[0].image}
                            alt={order.title}
                            className='w-12 h-12 rounded-lg'
                        />
                        <p className='flex-1 px-4 mr-8'>${order.totalPrice}</p>
                    </div>
                    <div className='flex justify-between items-center h-8'>
                        <p className='flex items-center mr-8'>
                            {order.productList.length} item(s)
                        </p>
                        <p className='flex items-center w-24 justify-end'>
                            {order.date && order.date.substring(0, 10)}
                        </p>
                        <button
                            type='button'
                            className='ml-8 h-8 py-2 px-4 bg-gray-500 text-white rounded-lg flex justify-center items-center'
                            onClick={() => navigate(`${order.orderId}`)}
                        >
                            View
                        </button>
                    </div>
                </div>
            ))}
        </PrimaryContainer>
    )
}

export default Orders
