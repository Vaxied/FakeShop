import React from 'react'
import { getData } from '../services/fetchWrapper'
import { StoreContext } from '../Context/context'
import { StoreContextType } from '../@types/store'

function useApi() {
    const API = import.meta.env.VITE_API
    const {
        items,
        setItems,
        shoppingCartProducts,
        setShoppingCartProducts,
        orders,
        setOrders,
        loggedIn,
    } = React.useContext(StoreContext) as StoreContextType

    const [tries, setTries] = React.useState(0)

    React.useEffect(() => {
        try {
            if (!Array.isArray(items) || !items.length) {
                const loadItems = async () => {
                    const items = await loadResource()
                    setItems(items.info)
                }
                loadItems()
            }
            if ((!Array.isArray(orders) || !orders.length) && loggedIn) {
                const loadOrders = async () => {
                    const orders = await loadResource('/get-orders')
                    setOrders(orders)
                }
                loadOrders()
            }
            if (
                (!Array.isArray(shoppingCartProducts) ||
                    !shoppingCartProducts.length) &&
                loggedIn
            ) {
                console.log('TRYING TO LOAD PRODUCTS')
                const loadCart = async () => {
                    const products = await loadResource('/load-cart')
                    setShoppingCartProducts(products)
                }
                loadCart()
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }, [items])

    async function loadResource(endpoint: string | null = null) {
        const resource = await fetchData(API, endpoint)
        return resource
    }

    const fetchData = async (API: string, endpoint: string | null) => {
        // tricky
        const url = endpoint ? `${API}${endpoint}` : API
        if (tries === 3) return 'Failed connection to API'
        console.log('getting data')
        const data = await getData(url)
        // console.log(tries)
        setTries(tries + 1)
        return data
    }

    return { items, setItems, loadResource }
}

export default useApi
