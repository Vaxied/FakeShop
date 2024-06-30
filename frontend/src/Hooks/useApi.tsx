import React from 'react'
import { getData } from '../services/fetchWrapper'
import { StoreContext } from '../Context/context'
import { StoreContextType } from '../@types/store'
// import { API } from '../api'

function useApi() {
    // const DATA = JSON.parse(import.meta.env.VITE_API_DATA)
    // console.log('data', DATA)
    const API = import.meta.env.VITE_API
    // console.log('API', API)
    // const { items, setItems } = React.useContext(StoreContext)
    const {
        items,
        setItems,
        shoppingCartProducts,
        setShoppingCartProducts,
        orders,
        setOrders,
        loggedIn,
    } = React.useContext(StoreContext) as StoreContextType
    // console.log(items)
    const [tries, setTries] = React.useState(0)
    React.useEffect(() => {
        try {
            if (!Array.isArray(items) || !items.length) {
                async function loadItems() {
                    const products = await fetchData(API, null)
                    setItems(products.info)
                }
                loadItems()
            }
            if ((!Array.isArray(orders) || !orders.length) && loggedIn) {
                async function loadOrders() {
                    const orders = await fetchData(API, '/get-orders')
                    console.log(orders)
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
                async function loadCart() {
                    const something = await fetchData(API, '/load-cart')
                    console.log('RESULT FROM LOADING CART', something)
                    setShoppingCartProducts(something)
                }
                loadCart()
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }, [items])

    const fetchData = async (API: string, endPoint: string | null) => {
        // tricky
        const url = endPoint ? `${API}${endPoint}` : API
        if (tries === 3) return null
        console.log('getting data')
        const data = await getData(url)
        // console.log(tries)
        setTries(tries + 1)
        return data
    }

    return { items, setItems }
}

export default useApi
