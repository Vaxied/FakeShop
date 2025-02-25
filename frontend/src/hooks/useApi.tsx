import React from 'react'
import { getData } from '../lib/services/fetchWrapper'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'

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
        terms,
        setTerms,
        logOut,
        firstLoad,
    } = React.useContext(StoreContext) as StoreContextType

    const [tries, setTries] = React.useState(0)

    const getOrders = async () => {
        setIsLoading(true)
        try {
            const orders = await loadResource('json', '/get-orders')
            setOrders(orders)
        } catch (error: any) {
            console.log('error getting orders', error)
        }
    }

    const getCart = async () => {
        try {
            const products = await loadResource('json', '/load-cart')
            products
                ? setShoppingCartProducts(products)
                : console.log(
                      "User has no products in cart or products couldn't be fetched",
                  )
        } catch (error: any) {
            console.log('error getting cart', error)
        }
    }

    const getUser = async () => {
        setIsLoading(true)
        try {
            const user = await loadResource('json', '/refresh-user')
            if (user) {
                if (user.error) {
                    logOut()
                }
                console.log('response.status', user?.status)
                if (user?.first_name) {
                    console.log('RETURNED USER AFTER FIRST LOAD', user)
                    setUsername(user.first_name)
                    setLoggedIn(true)
                }
            }
        } catch (error: any) {
            console.log('error getting user', error)
        }
    }

    const getItems = async () => {
        setTries(0)
        setIsLoading(true)
        try {
            const items = await loadResource('json')
            if (items) {
                setItems(items.info)
            }
        } catch (error: any) {
            console.log('error getting items', error)
        }
    }

    React.useEffect(() => {
        try {
            if (loggedIn) {
                if (!Array.isArray(orders) || !orders.length) {
                    const loadOrders = async () => await getOrders()
                    loadOrders()
                }
                if (
                    !Array.isArray(shoppingCartProducts) ||
                    !shoppingCartProducts.length
                ) {
                    console.log('TRYING TO LOAD PRODUCTS')
                    const loadCart = async () => await getCart()
                    loadCart()
                }
            } else {
                if (!username && firstLoad) {
                    const checkIfUser = async () => await getUser()
                    checkIfUser()

                    console.log('CHECKING IF USER EXISTS')
                    if (!Array.isArray(items) || !items.length) {
                        const loadItems = async () => await getItems()
                        loadItems()
                    }
                }
                //TODO: remove this and add individual components to load static elements
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

    //TODO: handle tries properly, maybe with an interval
    async function loadResource(
        responseType: 'json' | 'text',
        endpoint: string | null = null,
        headerOpts = { 'Content-type': 'application/json' },
    ) {
        const retries = 3
        const delay = 75
        const url = endpoint ? `${API}${endpoint}` : API
        for (let i = 0; i < retries; i++) {
            try {
                const resource = await getData(url, responseType, headerOpts)
                if (resource) {
                    return resource
                }
            } catch (error) {
                if (i < retries - 1) {
                    console.log('Failed to load resource, retrying...')
                    await new Promise(resolve => setTimeout(resolve, delay))
                } else {
                    throw new Error('Failed to load resource')
                }
            }
        }
    }

    async function loadStaticElements() {
        if (!policy) {
            const policyData = await loadResource('text', '/privacy-policy')
            console.log('LOADING PRIVACY POLICY')
            if (policyData) setPolicy(policyData)
        }
        if (!terms) {
            const termsData = await loadResource(
                'text',
                '/terms-and-conditions',
            )
            console.log('LOADING TERMS AND CONDITIONS')
            if (termsData) setTerms(termsData)
        }
    }

    return { items, setItems, loadResource, policy, setPolicy, getData }
}

export default useApi
