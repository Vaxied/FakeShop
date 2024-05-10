import React from 'react'
import { useNavigate } from 'react-router-dom'
import Orders from '../../Components/Orders'

function MyOrders() {
    const navigate = useNavigate()
    const { shoppingCartProducts } = React.useContext
    if (!Array.isArray(Orders) || !shoppingCartProducts.length)
        return (
            <>
                <div>
                    <Orders />
                    <div className='w-full flex justify-end'>
                        <button
                            type='button'
                            className='border border-gray px-4 py-2'
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </>
        )
}

export default MyOrders
