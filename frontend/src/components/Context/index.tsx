import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from './context'
import { getData } from '@lib/services/fetchWrapper'
import { Order } from '@@types/order'
import { IProduct } from '@@types/product'

type props = {
    children: React.ReactNode
}

function StoreProvider({ children }: Readonly<props>) {
    const API = import.meta.env.VITE_API
    const navigate = useNavigate()

    const [items, setItems] = React.useState<IProduct[] | []>([])
    const [shoppingCartProducts, setShoppingCartProducts] = React.useState<
        IProduct[] | []
    >([])

    const [productToShow, setProductToShow] = React.useState<IProduct | null>(
        null,
    )

    const [isCartSideMenuOpen, setIsCartSideMenuOpen] = React.useState(false)
    const [orders, setOrders] = React.useState<Order[] | []>([])

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [username, setUsername] = React.useState('')

    const [searchByTitle, setSearchByTitle] = React.useState('')

    const [isLoading, setIsLoading] = React.useState(true)
    const [policy, setPolicy] = React.useState('')
    const [terms, setTerms] = React.useState('')

    const productCategories = {
        men: "men's clothing",
        women: "women's clothing",
        electronics: 'electronics',
        jewelery: 'jewelery',
    }

    function openCartSideMenu(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        setIsCartSideMenuOpen(true)
    }

    function closeCartSideMenu() {
        setIsCartSideMenuOpen(false)
    }

    function calculateTotalPrice(items: IProduct[]) {
        let total = 0
        items.forEach(product => {
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
        const response = await getData(`${API}/new-order`)
        if (!response) console.log('no response')
        else if (response.status !== 200) console.log('Something went wrong')
        else {
            clearShoppingCart()
            closeCartSideMenu()
            setIsLoading(true)
            const orders = await getData(`${API}/get-orders`)
            setOrders(orders)
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
        to: string,
    ) {
        closeCartSideMenu()
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
                    item.category.toLowerCase() === category.toLowerCase(),
            )
            console.log('post filtro')
        } else if (searchTerm && !category) {
            filteredItems = newItems.filter((item: IProduct) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        } else if (!searchTerm && category) {
            filteredItems = newItems.filter(
                (item: IProduct) =>
                    item.category.toLowerCase() === category.toLowerCase(),
            )
        }
        console.log('filteredItems', filteredItems)
        return filteredItems
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                let r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8
                return v.toString(16)
            },
        )
    }

    const value = {
        items,
        username,
        productToShow,
        shoppingCartProducts,
        isCartSideMenuOpen,
        orders,
        loggedIn,
        searchByTitle,
        productCategories,
        setItems,
        setProductToShow,
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
        isLoading,
        setIsLoading,
        policy,
        setPolicy,
        terms,
        setTerms,
    }

    const values = useMemo(() => value, [value])
    return (
        <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
    )
}

export default StoreProvider
