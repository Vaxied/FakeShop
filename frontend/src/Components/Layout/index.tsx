import Navbar from '../Navbar'
import CartSideMenu from '../CartSideMenu'

type props = { children: React.ReactNode }

function Layout({ children }: props) {
    return (
        <>
            <Navbar />
            <div className='w-full flex justify-center p-8 min-h-[calc(100vh-70px)]'>
                {children}
            </div>
            <CartSideMenu />
        </>
    )
}

export default Layout
