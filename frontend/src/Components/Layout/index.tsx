import React from 'react'
import Navbar from '../Navbar'
import CartSideMenu from '../CartSideMenu'
import { useLocation } from 'react-router-dom'
import MainContainer from '../MainContainer'

type props = { children: React.ReactNode }

function Layout({ children }: Readonly<props>) {
    const location = useLocation()
    const [isCheckout, setIsCheckout] = React.useState(true)

    if (location.pathname === '/checkout') {
        if (!isCheckout) setIsCheckout(true)
    } else if (isCheckout) setIsCheckout(false)

    return (
        <>
            {!isCheckout && <Navbar />}
            <MainContainer>{children}</MainContainer>
            {!isCheckout && <CartSideMenu />}
        </>
    )
}

export default Layout
