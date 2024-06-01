import React from 'react'
import { StoreContext } from '../../Context/context'
import { useNavigate } from 'react-router-dom'

function Orders() {
    const { orders } = React.useContext(StoreContext)
    const navigate = useNavigate()
    console.log('orders', orders)
    if (!Array.isArray(orders) || !orders.length)
        return <p>You don&apos;t have any placed orders yet</p>

    const ordersHistory = [...orders].reverse()

    return (
        <div className='flex flex-col'>
            <div className='border border-gray px-6 py-4 rounded-lg bg-gray-100'>
                <p>My Orders</p>
                {ordersHistory.map((order, index) => (
                    <div
                        key={index}
                        className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                    >
                        <div className='flex flex-1 items-center'>
                            <img
                                src={order.productList[0].image}
                                alt={order.title}
                                className='w-12 h-12 rounded-lg'
                            />
                            <p className='flex-1 px-4 mr-8'>
                                ${order.totalPrice}
                            </p>
                        </div>
                        <div className='flex justify-between items-center h-8'>
                            <p className='flex items-center mr-8'>
                                {order.productsCount} item(s)
                            </p>
                            <p className='flex items-center w-24 justify-end'>
                                {order.date.substring(0, 10)}
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
            </div>
        </div>
    )
}

export default Orders
