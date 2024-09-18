import React from 'react'
import { StoreContext } from '../../Context/context'
import { useNavigate } from 'react-router-dom'
import { StoreContextType } from '../../@types/store'
import useApi from '../../Hooks/useApi'

function CheckoutPage() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        calculateTotalPrice,
        addNewOrder,
    } = React.useContext(StoreContext) as StoreContextType
    const navigate = useNavigate()
    const { loadResource } = useApi()

    React.useEffect(() => {
        const validateShoppingCart = async () => {
            const cart = await loadResource('/load-cart')
            console.log('cart', cart)
            if (shoppingCartProducts !== cart) {
                setShoppingCartProducts(cart)
            }
        }
        validateShoppingCart()
    }, [])

    // console.log('orders', orders)
    if (!Array.isArray(shoppingCartProducts) || !shoppingCartProducts.length)
        return <p>You don&apos;t have any products yet</p>

    const products = [...shoppingCartProducts].reverse()
    console.log('products', products)

    return (
        <div className='flex flex-col'>
            <div className='border border-gray px-6 py-4 rounded-lg bg-gray-100'>
                <p className='font-semibold'>My cart</p>
                {products.map((product) => (
                    <div
                        key={product.product_id}
                        className='flex items-center my-3 p-2 justify-between bg-white border border-gray rounded-lg'
                    >
                        <div className='flex flex-1 items-center'>
                            <img
                                src={product.image}
                                alt={product.title}
                                className='w-12 h-12 rounded-lg'
                            />
                            <p className='flex-1 px-4 mr-8'>{product?.title}</p>
                            <div className='flex justify-between items-center h-8'>
                                <p className='flex items-center mr-8'>
                                    Quantity: {product?.product_quantity}
                                </p>
                            </div>
                            <p className='flex items-center w-16 justify-end'>
                                $
                                {product.product_quantity &&
                                    (
                                        product?.price *
                                        product.product_quantity
                                    ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
                <div className='w-full flex justify-end'>
                    <div className='w-32 px-2 py-2 flex justify-between'>
                        <p>Total:</p>
                        <p className='font-bold'>
                            ${calculateTotalPrice(products)}
                        </p>
                    </div>
                </div>
                <button
                    type='button'
                    className='border border-gray px-4 py-2 w-full bg-black text-white rounded-lg mt-4'
                    onClick={() => addNewOrder()}
                >
                    Place order
                </button>
            </div>
        </div>
    )
}

export default CheckoutPage
