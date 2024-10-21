import React from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import ShoppingCartIcon from '@features/shoppingCart/ShoppingCartIcon'

function Navbar() {
    const activeStyle = 'underline underline-offset-4 font-semibold'
    const isLinkActive = (isActive: boolean, content = '') => {
        if (content === 'FakeShop') return ''
        return isActive ? activeStyle : ''
    }

    const { username, shoppingCartProducts, loggedIn, logOut } =
        React.useContext(StoreContext) as StoreContextType

    const navLinksLeft = [
        {
            content: 'FakeShop',
            to: '/',
            className: 'font-semibold text-lg',
        },
        {
            content: 'Men',
            to: '/category/men',
            className: '',
        },
        {
            content: 'Women',
            to: '/category/women',
            className: '',
        },
        {
            content: 'Electronics',
            to: '/category/electronics',
            className: '',
        },
        {
            content: 'Jewelery',
            to: '/category/jewelery',
            className: '',
        },
    ]

    // const navLinksRight = [
    //     {
    //         content: 'My Orders',
    //         to: '/my-orders',
    //     },
    //     {
    //         content: 'My Account',
    //         to: '/my-account',
    //     },
    //     {
    //         content: 'Sign In',
    //         to: '/login',
    //     },
    //     {
    //         content: 'Sign Out',
    //         to: '/',
    //     },
    //     {
    //         content: (
    //             <ShoppingCartIcon numberOfItems={shoppingCartProducts.length} />
    //         ),
    //         to: '/shopping-cart',
    //     },
    // ]

    return (
        <nav className='bg-primary flex justify-between items-center fixed z-10 top-0 w-full h-16 py-5 px-8 text-sm font-light border-b border-gray'>
            <ul className='flex items-center gap-3'>
                {navLinksLeft.map(({ content, to, className }) => (
                    <li className={className}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                isLinkActive(isActive, content)
                            }
                        >
                            {content}
                        </NavLink>
                    </li>
                ))}
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
                        <ShoppingCartIcon
                            numberOfItems={shoppingCartProducts.length}
                        />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
