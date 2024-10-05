import React from 'react'
import { getData } from '../services/fetchWrapper'
import { StoreContext } from '../Context/context'
import { StoreContextType } from '../@types/store'

function useApi() {
    const API = import.meta.env.VITE_API
    const {
        username,
        items,
        shoppingCartProducts,
        loggedIn,
        orders,
        setItems,
        setShoppingCartProducts,
        setOrders,
        setIsLoading,
        setUsername,
        setLoggedIn,
    } = React.useContext(StoreContext) as StoreContextType

    const [tries, setTries] = React.useState(0)

    React.useEffect(() => {
        try {
            if (!loggedIn && !username) {
                const checkIfUser = async () => {
                    setIsLoading(true)
                    const user = await loadResource('/refresh-user')
                    console.log('RETURNED USER AFTER FIRST LOAD', user)
                    if (user?.first_name) {
                        setUsername(user.first_name)
                        setLoggedIn(true)
                    }
                }
                checkIfUser()
            }
            if (!Array.isArray(items) || !items.length) {
                const loadItems = async () => {
                    setIsLoading(true)
                    const items = await loadResource()
                    setItems(items.info)
                }
                loadItems()
            }
            if ((!Array.isArray(orders) || !orders.length) && loggedIn) {
                const loadOrders = async () => {
                    setIsLoading(true)
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
                    products
                        ? setShoppingCartProducts(products)
                        : console.log(
                              "User has no products in cart or products couldn't be fetched"
                          )
                }
                loadCart()
                const loadPrivacyPolicy = async () => {
                    const policy = await loadResource('/privacy-policy')
                    console.log('privacy policy', policy.info)
                }
                loadPrivacyPolicy()
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }, [items, orders, shoppingCartProducts, loggedIn])

    async function loadResource(endpoint: string | null = null) {
        const resource = await fetchData(API, endpoint)
        return resource
    }

    const fetchData = async (API: string, endpoint: string | null) => {
        // tricky
        const url = endpoint ? `${API}${endpoint}` : API
        if (tries === 3) return false
        console.log('getting data')
        const data = await getData(url)
        // console.log(tries)
        setTries(tries + 1)
        return data
    }

    return { items, setItems, loadResource }
}

export default useApi
