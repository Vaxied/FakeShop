import React from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../Context/context'
import { StoreContextType } from '../../@types/store'
function Navbar() {
    const activeStyle = 'underline underline-offset-4 font-semibold'
    const isLinkActive = (isActive: boolean) => {
        return isActive ? activeStyle : ''
    }

    const { username, shoppingCartProducts, loggedIn, logOut } =
        React.useContext(StoreContext) as StoreContextType

    return (
        <nav className='bg-white flex justify-between items-center fixed z-10 top-0 w-full h-16 py-5 px-8 text-sm font-light border-b border-gray'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/'>FakeShop</NavLink>
                </li>
                <li>
                    <NavLink
                        to='/category/men'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        Men
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/category/women'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        Women
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/category/electronics'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/category/jewelery'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        Jewelery
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                {loggedIn && <li className='text-black/80'>Hi, {username}!</li>}
                <li>
                    <NavLink
                        to='/my-orders'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/my-account'
                        className={({ isActive }) => isLinkActive(isActive)}
                    >
                        My Account
                    </NavLink>
                </li>
                {!loggedIn && (
                    <li>
                        <NavLink
                            to='/login'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Sign In
                        </NavLink>
                    </li>
                )}
                {loggedIn && (
                    <li>
                        <NavLink to={'/'} onClick={() => logOut()}>
                            Logout
                        </NavLink>
                    </li>
                )}
                <li className='relative'>
                    <NavLink to={`${loggedIn ? '/shopping-cart' : '/login'}`}>
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
                                d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                            />
                        </svg>
                        <span className='leading-4 absolute top-[-6px] right-[-6px] border bg-green-500 rounded-full w-4 text-xs text-center text-white font-semibold'>
                            {shoppingCartProducts.length}
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
