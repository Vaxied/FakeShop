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

    const [items, setItems] = React.useState([] || null)
    const [cookie, setCookie, removeCookie] = useCookies(['refreshToken'])
    const [shoppingCartProducts, setShoppingCartProducts] = React.useState([])

    const [isProductDetailOpen, setIsProductDetailOpen] = React.useState(false)
    const [productToShow, setproductToShow] = React.useState(null)

    const [isCartSideMenuOpen, setIsCartSideMenuOpen] = React.useState(false)
    const [orders, setOrders] = React.useState([])

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [username, setUsername] = React.useState('')

    const [searchByTitle, setSearchByTitle] = React.useState('')

    const productCategories = {
        men: "men's clothing",
        women: "women's clothing",
        electronics: 'electronics',
        jewelry: 'jewelery',
    }
    console.log('cart products', shoppingCartProducts)
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
            const price = product.price * product.product_quantity
            total = total + price
        })
        return total.toFixed(2)
    }
    async function addNewOrder() {
        const newOrder = {
            productList: shoppingCartProducts,
            // image: shoppingCartProducts.at(-1).image,
            // title: shoppingCartProducts.at(-1).title,
            productCount: shoppingCartProducts.length,
            totalPrice: calculateTotalPrice(shoppingCartProducts),
            date: new Date().toISOString(),
        }
        const response = await postData(`${API}/new-order`, newOrder)
        if (!response) console.log('no response')
        // console.log('🚀 ~ handleSubmit ~ response:', response.status)
        else if (response.status !== 200) console.log('Something went wrong')
        else {
            clearShoppingCart()
            closeCartSideMenu()
            newOrder.orderId = response.order_id
            setOrders([...orders, newOrder])
        }
        navigate('/my-orders')
        return console.log('response', response)
    }

    function clearShoppingCart() {
        setShoppingCartProducts([])
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
    }

    function navigateWithClosing(to) {
        closeCartSideMenu()
        closeProductDetail()
        navigate(to)
    }

    function filterItems(searchTerm = '', category = '') {
        console.log('searchTerm', searchTerm)
        console.log('category', category)
        const newItems = [...items]
        let filteredItems
        if (searchTerm && category) {
            console.log('filtrado doble')
            filteredItems = newItems.filter(
                (item) =>
                    item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                    item.category.toLowerCase() === category.toLowerCase()
            )
            console.log('post filtro')
        } else if (searchTerm && !category) {
            filteredItems = newItems.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        } else if (!searchTerm && category) {
            filteredItems = newItems.filter(
                (item) => item.category.toLowerCase() === category.toLowerCase()
            )
        }
        console.log('filteredItems', filteredItems)
        return filteredItems
    }

    return (
        <StoreContext.Provider
            value={{
                items,
                username,
                isProductDetailOpen,
                productToShow,
                shoppingCartProducts,
                isCartSideMenuOpen,
                orders,
                loggedIn,
                searchByTitle,
                productCategories,
                setItems,
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
                navigateWithClosing,
                setSearchByTitle,
                filterItems,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
