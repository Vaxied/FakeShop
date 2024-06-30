import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from './context'
import { postData } from '../services/fetchWrapper'
import { Order } from '../@types/order'
import { IProduct } from '../@types/product'

type props = {
    children: React.ReactNode
}

function StoreProvider({ children }: props) {
    const API = import.meta.env.VITE_API
    const navigate = useNavigate()

    const [items, setItems] = React.useState<IProduct[] | []>([])
    const [shoppingCartProducts, setShoppingCartProducts] = React.useState<
        IProduct[] | []
    >([])

    const [isProductDetailOpen, setIsProductDetailOpen] = React.useState(false)
    const [productToShow, setProductToShow] = React.useState<IProduct | null>(
        null
    )

    const [isCartSideMenuOpen, setIsCartSideMenuOpen] = React.useState(false)
    const [orders, setOrders] = React.useState<Order[] | []>([])

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [username, setUsername] = React.useState('')

    const [searchByTitle, setSearchByTitle] = React.useState('')

    const productCategories = {
        men: "men's clothing",
        women: "women's clothing",
        electronics: 'electronics',
        jewelery: 'jewelery',
    }

    console.log('cart products', shoppingCartProducts)
    function openProductDetail(product: IProduct) {
        setIsProductDetailOpen(true)
        setProductToShow(product)
        setIsCartSideMenuOpen(false)
    }

    function closeProductDetail(event: React.MouseEvent) {
        event.stopPropagation()
        setIsProductDetailOpen(false)
        setProductToShow(null)
    }

    function openCartSideMenu(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        closeProductDetail(event)
        setIsCartSideMenuOpen(true)
    }

    function closeCartSideMenu() {
        setIsCartSideMenuOpen(false)
    }

    function calculateTotalPrice(items: IProduct[]) {
        let total = 0
        items.forEach((product) => {
            if (!product.product_quantity) return
            const price = product.price * product.product_quantity
            total = total + price
        })
        return total.toFixed(2)
    }
    async function addNewOrder() {
        if (
            !shoppingCartProducts.length ||
            !Array.isArray(shoppingCartProducts)
        )
            return
        const newOrder = {
            orderId: '',
            productList: shoppingCartProducts,
            title: '',
            image: '',
            productCount: shoppingCartProducts.length,
            totalPrice: calculateTotalPrice(shoppingCartProducts),
            date: new Date().toISOString(),
        }
        const response = await postData(`${API}/new-order`, newOrder)
        if (!response) console.log('no response')
        else if (response.status !== 200) console.log('Something went wrong')
        else {
            clearShoppingCart()
            closeCartSideMenu()
            newOrder.orderId = response.order_id
            setOrders([...orders, newOrder])
            navigate('/my-orders')
        }
    }

    function clearShoppingCart() {
        setShoppingCartProducts([])
    }

    function logOut() {
        localStorage.removeItem('accessToken')
        console.log('user has been logged out')
        setLoggedIn(false)
        setUsername('')
        setShoppingCartProducts([])
        navigate('/')
    }

    function navigateWithClosing(
        event: React.MouseEvent<HTMLAnchorElement>,
        to: string
    ) {
        closeCartSideMenu()
        closeProductDetail(event)
        navigate(to)
    }

    function filterItems(searchTerm = '', category = '') {
        console.log('searchTerm', searchTerm)
        console.log('category', category)
        const newItems = [...items]
        let filteredItems = newItems
        if (searchTerm && category) {
            console.log('filtrado doble')
            filteredItems = newItems.filter(
                (item: IProduct) =>
                    item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                    item.category.toLowerCase() === category.toLowerCase()
            )
            console.log('post filtro')
        } else if (searchTerm && !category) {
            filteredItems = newItems.filter((item: IProduct) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        } else if (!searchTerm && category) {
            filteredItems = newItems.filter(
                (item: IProduct) =>
                    item.category.toLowerCase() === category.toLowerCase()
            )
        }
        console.log('filteredItems', filteredItems)
        return filteredItems
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8
                return v.toString(16)
            }
        )
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
                setProductToShow,
                setIsProductDetailOpen,
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