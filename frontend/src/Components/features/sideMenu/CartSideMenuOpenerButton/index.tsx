import { MouseEvent } from 'react'
import React from 'react'
import { StoreContext } from '../../Context/context'
import useShoppingCart from '../../Hooks/useShoppingCart'
import { StoreContextType } from '../../@types/store'

function CartSideMenuOpenerButton(
    props: Readonly<{
        isCartSideMenuOpen: boolean
        openCartSideMenu: (event: React.MouseEvent<HTMLButtonElement>) => void
    }>
) {
    // const { openCartSideMenu } = React.useContext(
    //     StoreContext
    // ) as StoreContextType
    return (
        <div
            className={`${
                props.isCartSideMenuOpen ? 'opacity-0' : 'opacity-1'
            } absolute -left-4 top-1/2 w-4 h-32 bg-gray-500 -translate-y-1/2 rounded-l-md text-white transition-opacity duration-500`}
        >
            <span className='before:content-[""] block w-2 h-2 bg-gray-500 absolute top-[-8px] right-0'></span>
            <span className='before:content-[""] block w-4 h-4 bg-white absolute top-[-16px] rounded-full'></span>
            <button
                onClick={(event) => props.openCartSideMenu(event)}
                className='absolute block top-1/2 -translate-y-1/2 h-12'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 19.5 8.25 12l7.5-7.5'
                    />
                </svg>
            </button>
            <span className='after:content-[""] block w-4 h-4 bg-white absolute bottom-[-16px] rounded-full z-10'></span>
            <span className='after:content-[""] block w-2 h-2 bg-gray-500 absolute bottom-[-8px] right-0'></span>
        </div>
    )
}

export default CartSideMenuOpenerButton
