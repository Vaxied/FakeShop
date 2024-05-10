import React from 'react'
// import { API } from '../api'

function useApi() {
    const DATA = JSON.parse(import.meta.env.VITE_API_DATA)
    console.log(import.meta.env.VITE_DB_PASSWORD)
    const [items, setItems] = React.useState(DATA || null)
    // console.log(items)
    React.useEffect(() => {
        try {
            console.log('trying')
            if (items) {
                console.log('data is preloaded')
                return
            }
            // fetch(API)
            //     .then((res) => res.json())
            //     .then((data) => setItems(data))
        } catch (error) {
            throw new Error(error)
        }
    }, [items])
    return { items, setItems }
}

export default useApi
