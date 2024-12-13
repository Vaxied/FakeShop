import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@components/features/navigation/Navbar'
import CartSideMenu from '@components/features/sideMenu/CartSideMenu'
import MainContainer from '@components/containers/MainContainer'
import Footer from '@components/features/navigation/Footer'

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
