import React from 'react'
import { StoreContext } from '../../Context/context'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { StoreContextType } from '../../@types/store'

function MyOrder() {
    const { orders } = React.useContext(StoreContext) as StoreContextType
    const orderId = useParams().id
    const navigate = useNavigate()

    console.log('params', orderId)
    console.log('orders', orders)
    const index = orders?.findIndex((order) => order.orderId == orderId)
    console.log('index', index)
    if (index === -1) return null
    const order = orders[index]
    console.log(order)
    return (
        <div className='flex flex-col'>
            <div className='border border-gray px-6 py-4 rounded-lg bg-gray-100'>
                <div className='flex items-center pb-2'>
                    <Link to='/my-orders'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-7 pr-2'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 19.5 8.25 12l7.5-7.5'
                            />
                        </svg>
                    </Link>
                    <p className='font-semibold'>My Order</p>
                </div>
                <p className='font-semibold'>order #{order.orderId}</p>
                <p>
                    {order.date &&
                        `Placed on ${order.date.substring(0, 10)} at
                    ${order.date.substring(11, 16)}`}
                </p>
                <p>{order.productList.length} item(s)</p>
                {order.productList.map((product, index) => (
                    <div
                        key={product.title}
                        className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                    >
                        <div className='flex flex-1 items-center'>
                            <img
                                src={product?.image}
                                alt={product.title}
                                className='w-12 h-12 rounded-lg'
                            />
                            <p className='flex-1 px-4 mr-8'>{product?.title}</p>
                        </div>
                        <div className='flex justify-between items-center h-8'>
                            <p className='flex items-center mr-8'>
                                Quantity: {product?.product_quantity}
                            </p>
                            <p className='flex items-center w-16 justify-end'>
                                ${product?.price}
                            </p>
                        </div>
                    </div>
                ))}
                <div className='w-full flex justify-end'>
                    <div className='w-32 py-2'>
                        <p className='font-semibold flex justify-end'>
                            Total: ${order.totalPrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
