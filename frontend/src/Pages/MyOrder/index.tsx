import React from 'react'
import { StoreContext } from '../../Context/context'
import { useParams, Link } from 'react-router-dom'
import { StoreContextType } from '../../@types/store'
import PrimaryContainer from '../../Components/PrimaryContainer'
import ProductList from '../../Components/ProductList'

function MyOrder() {
    const { orders } = React.useContext(StoreContext) as StoreContextType
    const orderId = useParams().id

    console.log('params', orderId)
    console.log('orders', orders)
    const index = orders?.findIndex((order) => order.orderId == orderId)
    console.log('index', index)
    if (index === -1) return null
    const order = orders[index]
    console.log(order)
    return (
        <PrimaryContainer>
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
            <p className='pb-4'>{order.productList.length} item(s)</p>
            <ProductList products={order.productList} />
            <div className='w-full flex justify-end'>
                <div className='w-32 py-2'>
                    <p className='font-semibold flex justify-end'>
                        Total: ${order.totalPrice}
                    </p>
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default MyOrder
