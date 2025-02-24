import React, { useContext } from 'react'
import Navbar from '@components/navigation/Navbar'
import CartSideMenu from '@components/sideMenu/CartSideMenu'
import MainContainer from '@components/common/containers/MainContainer'
import Footer from '@components/navigation/Footer'
import SnowFall from '@components/fallingSnow/SnowFall'
import Loader from '@components/loading/Loader'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import { useLocation } from 'react-router-dom'
import useApi from '@hooks/useApi'

type props = { children: React.ReactNode }

function Layout({ children }: Readonly<props>) {
    const location = useLocation()
    const [isCheckout, setIsCheckout] = React.useState(false)
    const { firstLoad, setFirstLoad } = useContext(
        StoreContext,
    ) as StoreContextType

    if (location.pathname === '/checkout') {
        if (!isCheckout) setIsCheckout(true)
    } else if (isCheckout) setIsCheckout(false)

    useApi()
    React.useEffect(() => {
        if (firstLoad) setTimeout(() => setFirstLoad(false), 250)
        console.log('stopped loading')
    }, [])

    if (!isCheckout) {
        return (
            <>
                {firstLoad ? (
                    <Loader />
                ) : (
                    <>
                        <Navbar />
                        <MainContainer>{children}</MainContainer>
                        <CartSideMenu />
                        <Footer />
                    </>
                )}
            </>
        )
    } else {
        return (
            <>
                {firstLoad ? (
                    <Loader />
                ) : (
                    <MainContainer>{children}</MainContainer>
                )}
            </>
        )
    }
}

export default Layout
