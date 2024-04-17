import PropTypes from 'prop-types'
import Navbar from '../Navbar'
import CartSideMenu from '../CartSideMenu'

function Layout({ children }) {
    Layout.propTypes = {
        children: PropTypes.node,
    }
    return (
        <>
            <Navbar />
            <div className='w-full flex justify-center p-8 mt-20'>
                {children}
            </div>
            <CartSideMenu />
        </>
    )
}

export default Layout
