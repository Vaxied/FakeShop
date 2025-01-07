import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import ShoppingCartIcon from '@features/shoppingCart/ShoppingCartIcon'

interface NavLink {
    content: ReactElement | string
    to: string
    className?: string
    action?: () => void
}

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
        },
        {
            content: 'Women',
            to: '/category/women',
        },
        {
            content: 'Electronics',
            to: '/category/electronics',
        },
        {
            content: 'Jewelry',
            to: '/category/jewelry',
        },
    ]

    const navLinksRight: { isLoggedIn: NavLink[]; isNotLoggedIn: NavLink[] } = {
        isLoggedIn: [
            {
                content: 'My Orders',
                to: '/my-orders',
            },
            {
                content: 'My Account',
                to: '/my-account',
            },
            {
                content: 'Sign Out',
                to: '/',
                action: logOut,
            },
            {
                content: (
                    <ShoppingCartIcon
                        numberOfItems={shoppingCartProducts.length}
                        loggedIn={loggedIn}
                    />
                ),
                to: `${loggedIn ? '/shopping-cart' : '/login'}`,
                className: 'relative',
            },
        ],
        isNotLoggedIn: [
            {
                content: 'My Orders',
                to: '/my-orders',
            },
            {
                content: 'My Account',
                to: '/my-account',
            },
            {
                content: 'Sign In',
                to: '/login',
            },
            {
                content: (
                    <ShoppingCartIcon
                        numberOfItems={shoppingCartProducts.length}
                        loggedIn={loggedIn}
                    />
                ),
                to: `${loggedIn ? '/shopping-cart' : '/login'}`,
                className: 'relative',
            },
        ],
    }

    const rightNavElements = loggedIn
        ? navLinksRight.isLoggedIn
        : navLinksRight.isNotLoggedIn

    return (
        <nav className='bg-primary flex justify-between items-center fixed top-0 w-full h-16 py-5 px-8 text-sm font-light z-20'>
            <ul className='flex items-center gap-3'>
                {navLinksLeft.map(({ content, to, className = '' }, index) => (
                    <li key={index} className={className}>
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
                {rightNavElements.map(
                    ({ content, to, className = '', action }, index) => (
                        <li
                            key={index}
                            className={className}
                            onClick={() => {
                                if (action) action()
                            }}
                        >
                            <NavLink to={to}>{content}</NavLink>
                        </li>
                    ),
                )}
            </ul>
        </nav>
    )
}

export default Navbar
