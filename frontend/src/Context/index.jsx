import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from './context'
import { postData } from '../services/fetchWrapper'
import { useCookies } from 'react-cookie'

function StoreProvider({ children }) {
    StoreProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }
    const API = import.meta.env.VITE_API

    const navigate = useNavigate()

    const [cookie, setCookie, removeCookie] = useCookies(['refreshToken'])
    const [shoppingCartProducts, setShoppingCartProducts] = React.useState([])

    const [isProductDetailOpen, setIsProductDetailOpen] = React.useState(false)
    const [productToShow, setproductToShow] = React.useState(null)

    const [isCartSideMenuOpen, setIsCartSideMenuOpen] = React.useState(false)
    const [orders, setOrders] = React.useState([])

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [username, setUsername] = React.useState('')

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

    function calculateTotalPrice(items) {
        let total = 0
        items.forEach((product) => {
            const price = product.price * product.quantity
            total = total + price
        })
        return total
    }
    async function addNewOrder() {
        const newOrder = {
            productsList: shoppingCartProducts,
            // image: shoppingCartProducts.at(-1).image,
            // title: shoppingCartProducts.at(-1).title,
            productsCount: shoppingCartProducts.length,
            totalPrice: calculateTotalPrice(shoppingCartProducts),
            date: new Date().toISOString(),
        }
        const response = await postData(`${API}/new-order`, newOrder)
        if (!response) console.log('no response')
        // console.log('🚀 ~ handleSubmit ~ response:', response.status)
        else if (response.status !== 200) console.log('Something went wrong')
        else {
            navigate('/my-orders')
            clearShoppingCart()
            closeCartSideMenu()
            setOrders([...orders, newOrder])
        }
        return console.log('response', response)
    }

    function clearShoppingCart() {
        setShoppingCartProducts([])
    }

    function generateRandomUUID() {
        return self.crypto.randomUUID()
    }

    function logOut(event) {
        event.preventDefault()
        localStorage.removeItem('accessToken')
        console.log('user has been logged out')
        setLoggedIn(false)
        setUsername('')
        removeCookie('refreshToken')
        setShoppingCartProducts([])
        navigate('/')
        // const response = await postData('http://localhost:5600/logout')
        // console.log('response.status', response.status)
        // if (!response) console.log('no response')
        // // console.log('🚀 ~ handleSubmit ~ response:', response.status)
        // else if (response.status !== 200)
        //     // navigate('/login') //show error message
        //     console.log('An Error has ocurred')
        // else {
        //     setLoggedIn(false)
        //     navigate('/')
        // }
        // return console.log('response', response)
    }

    return (
        <StoreContext.Provider
            value={{
                isProductDetailOpen,
                productToShow,
                shoppingCartProducts,
                isCartSideMenuOpen,
                orders,
                loggedIn,
                openProductDetail,
                closeProductDetail,
                setShoppingCartProducts,
                openCartSideMenu,
                closeCartSideMenu,
                addNewOrder,
                calculateTotalPrice,
                setLoggedIn,
                logOut,
                setUsername,
                setCookie,
                setOrders,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
