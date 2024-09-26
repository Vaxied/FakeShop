import React from 'react'
import { StoreContext } from '../../Context/context'
import CartSideMenuProducts from '../CartSideMenuProducts'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContextType } from '../../@types/store'
import CartSideMenuOpenerButton from '../CartSideMenuOpenerButton'

function CartSideMenu() {
    const {
        isCartSideMenuOpen,
        openCartSideMenu,
        closeCartSideMenu,
        shoppingCartProducts,
        loggedIn,
    } = React.useContext(StoreContext) as StoreContextType

    const location = useLocation()
    const navigate = useNavigate()

    if (
        location.pathname === '/my-order' ||
        location.pathname === '/shopping-cart' ||
        !loggedIn
    )
        return null
    return (
        <aside
            className={`${
                isCartSideMenuOpen ? 'flex flex-col' : 'translate-x-[380px]'
            } fixed right-0 h-[calc(100vh-68px)] top-[68px] w-[380px] border border-gray rounded-lg rounded-r-none bg-gray-100 transition-all duration-500 ease-out px-6 py-3`}
        >
            <div className='flex flex-col'>
                <div
                    className='w-full
                    flex justify-between text-sm'
                >
                    <button
                        type='button'
                        onClick={() => {
                            closeCartSideMenu()
                        }}
                        className='flex justify-center items-center text-md font-bold w-6 h-6 p-1 mr-auto bg-white cursor-pointer border border-gray rounded-full z-10'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18 18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                    <span className='my-2 font-semibold text-base'>
                        My Order
                    </span>
                </div>
                <CartSideMenuProducts
                    shoppingCartProducts={shoppingCartProducts}
                />
            </div>
            <div
                className={`${
                    shoppingCartProducts.length > 0 ? 'block' : 'hidden'
                } w-full self-center`}
            >
                <button
                    type='button'
                    className='border border-gray px-4 py-2 w-full bg-black text-white rounded-lg'
                    onClick={() => navigate('/shopping-cart')}
                >
                    Go to Shopping Cart
                </button>
            </div>
            <CartSideMenuOpenerButton
                isCartSideMenuOpen={isCartSideMenuOpen}
                openCartSideMenu={openCartSideMenu}
            />
        </aside>
    )
}

export default CartSideMenu
