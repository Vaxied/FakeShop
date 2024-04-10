import PropTypes from 'prop-types'
import Navbar from '../Navbar'

function Layout({ children }) {
    Layout.propTypes = {
        children: PropTypes.node,
    }
    return (
        <>
            <Navbar />
            <div className='w-full flex justify-center items-center mt-20'>
                {children}
            </div>
        </>
    )
}

export default Layout
