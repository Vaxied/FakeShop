import React from 'react'
import { getData } from '../services/fetchWrapper'
import { StoreContext } from '../Context/context'
import { StoreContextType } from '../@types/store'
import { useNavigate } from 'react-router-dom'

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
        policy,
        setPolicy,
    } = React.useContext(StoreContext) as StoreContextType

    // const navigate = useNavigate()
    const [tries, setTries] = React.useState(0)
    // const [firstLoad, setFirstLoad] = React.useState(true)
    React.useEffect(() => {
        // if (!firstLoad) return
        // setFirstLoad(false)
        try {
            if (loggedIn) {
                if (!Array.isArray(orders) || !orders.length) {
                    const loadOrders = async () => {
                        setTries(0)
                        setIsLoading(true)
                        const orders = await loadResource('json', '/get-orders')
                        setOrders(orders)
                    }
                    loadOrders()
                }
                if (
                    !Array.isArray(shoppingCartProducts) ||
                    !shoppingCartProducts.length
                ) {
                    console.log('TRYING TO LOAD PRODUCTS')
                    const loadCart = async () => {
                        setTries(0)
                        const products = await loadResource(
                            'json',
                            '/load-cart'
                        )
                        products
                            ? setShoppingCartProducts(products)
                            : console.log(
                                  "User has no products in cart or products couldn't be fetched"
                              )
                    }
                    loadCart()
                }
            } else {
                if (!username) {
                    const checkIfUser = async () => {
                        setIsLoading(true)
                        setTries(0)
                        const user = await loadResource('json', '/refresh-user')
                        if (user.error) {
                            localStorage.removeItem('accessToken')
                        }
                        console.log('response.status', user?.status)
                        if (user?.first_name) {
                            console.log('RETURNED USER AFTER FIRST LOAD', user)
                            setUsername(user.first_name)
                            setLoggedIn(true)
                        }
                    }
                    checkIfUser()
                    if (!Array.isArray(items) || !items.length) {
                        const loadItems = async () => {
                            setTries(0)
                            setIsLoading(true)
                            const items = await loadResource('json')
                            setItems(items.info)
                        }
                        loadItems()
                    }
                }
                const loadStatic = async () => {
                    await loadStaticElements()

                    console.log('LOADED PRIVACY POLICY')
                }
                loadStatic()
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }, [loggedIn])

    async function loadResource(
        responseType: 'json' | 'text',
        endpoint: string | null = null,
        headerOpts = { 'Content-type': 'application/json' }
    ) {
        const url = endpoint ? `${API}${endpoint}` : API
        setTimeout(() => setTries(tries + 1), 1000)
        const resource = await getData(url, responseType, headerOpts)
        if (tries === 3) return false
        return resource
    }

    async function loadStaticElements() {
        const policyData = await loadResource('text', '/privacy-policy')
        console.log('LOADING PRIVACY POLICY')
        if (policyData) setPolicy(policyData)
        // {'Content-type': 'text/html',}
    }

    return { items, setItems, loadResource, policy, setPolicy }
}

export default useApi
