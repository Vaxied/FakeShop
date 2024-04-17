import React from 'react'
import { API } from '../api'

function useApi() {
    const [items, setItems] = React.useState(null)
    React.useEffect(() => {
        try {
            console.log('trying')
            if (items) return
            fetch(API)
                .then((res) => res.json())
                .then((data) => setItems(data))
        } catch (error) {
            throw new Error(error)
        }
    }, [items])
    return { items, setItems }
}

export default useApi
