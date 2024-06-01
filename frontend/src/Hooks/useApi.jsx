import React from 'react'
import { getData } from '../services/fetchWrapper'
import { StoreContext } from '../Context/context'
// import { API } from '../api'

function useApi() {
    // const DATA = JSON.parse(import.meta.env.VITE_API_DATA)
    const API = import.meta.env.VITE_API
    // const [items, setItems] = React.useState(DATA || null)
    const [items, setItems] = React.useState([] || null)
    const { orders, setOrders, loggedIn } = React.useContext(StoreContext)
    // console.log(items)
    const [tries, setTries] = React.useState(0)
    React.useEffect(() => {
        try {
            if (!Array.isArray(items) || !items.length) {
                async function loadItems() {
                    const products = await fetchData(API)
                    setItems(products.info)
                }
                loadItems()
            }
            if ((!Array.isArray(orders) || !orders.length) && loggedIn) {
                async function loadOrders() {
                    const orders = await getOrders()
                    console.log(orders)
                    setOrders(orders)
                }
                loadOrders()
            }
        } catch (error) {
            throw new Error(error)
        }
    }, [items])

    const fetchData = async (url) => {
        if (tries === 3) return null
        const data = await getData(url)
        // console.log(tries)
        setTries(tries + 1)
        return data
    }

    const getOrders = async () => {
        try {
            const data = await fetchData(`${API}/get-orders`)
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return { items, setItems, getOrders }
}

export default useApi
