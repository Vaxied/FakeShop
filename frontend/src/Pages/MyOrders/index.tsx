import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderList from '../../Components/OrderList'
import { StoreContextType } from '../../@types/store'
import { StoreContext } from '../../Context/context'

function MyOrders() {
    const navigate = useNavigate()
    const { shoppingCartProducts } = React.useContext(
        StoreContext
    ) as StoreContextType
    if (!Array.isArray(OrderList) || !shoppingCartProducts.length)
        return (
            <>
                <OrderList />
                <div className='w-full flex justify-end'>
                    <button
                        type='button'
                        className='border border-gray px-4 py-2'
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </>
        )
}

export default MyOrders
