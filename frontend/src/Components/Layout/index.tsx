import React from 'react'
import Navbar from '../Navbar'
import CartSideMenu from '../CartSideMenu'
import { useLocation } from 'react-router-dom'
import MainContainer from '../MainContainer'
import Footer from '../Footer'

type props = { children: React.ReactNode }

function Layout({ children }: Readonly<props>) {
    const location = useLocation()
    const [isCheckout, setIsCheckout] = React.useState(false)

    if (location.pathname === '/checkout') {
        if (!isCheckout) setIsCheckout(true)
    } else if (isCheckout) setIsCheckout(false)

    if (!isCheckout) {
        return (
            <>
                <Navbar />
                <MainContainer>{children}</MainContainer>
                <CartSideMenu />
                <Footer />
            </>
        )
    } else {
        return <MainContainer>{children}</MainContainer>
    }
}

export default Layout
