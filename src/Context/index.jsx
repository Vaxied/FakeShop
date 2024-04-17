import React from 'react'
import PropTypes from 'prop-types'
import { StoreContext } from './context'

function StoreProvider({ children }) {
    StoreProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }
    const [shoppingCartProducts, setShoppingCartProducts] = React.useState([])
    const [count, setCount] = React.useState(0)

    const [isProductDetailOpen, setIsProductDetailOpen] = React.useState(false)
    const [productToShow, setproductToShow] = React.useState(null)

    const [isCartSideMenuOpen, setIsCartSideMenuOpen] = React.useState(false)

    function openProductDetail(product) {
        setIsProductDetailOpen(true)
        setproductToShow(product)
        setIsCartSideMenuOpen(false)
    }

    function closeProductDetail(event) {
        event.stopPropagation()
        setIsProductDetailOpen(false)
        setproductToShow(null)
    }

    function openCartSideMenu(event) {
        event.stopPropagation()
        closeProductDetail(event)
        setIsCartSideMenuOpen(true)
    }

    function closeCartSideMenu() {
        setIsCartSideMenuOpen(false)
    }
    return (
        <StoreContext.Provider
            value={{
                isProductDetailOpen,
                productToShow,
                openProductDetail,
                closeProductDetail,
                shoppingCartProducts,
                setShoppingCartProducts,
                count,
                setCount,
                isCartSideMenuOpen,
                openCartSideMenu,
                closeCartSideMenu,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
