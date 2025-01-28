import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@components/navigation/Navbar'
import CartSideMenu from '@components/sideMenu/CartSideMenu'
import MainContainer from '@components/common/containers/MainContainer'
import Footer from '@components/navigation/Footer'
import SnowFall from '@components/fallingSnow/SnowFall'

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
                <SnowFall />
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
