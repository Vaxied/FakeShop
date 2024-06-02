import React from 'react'
import { StoreContext } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import { postData } from '../services/fetchWrapper'

function useShoppingCart() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        openCartSideMenu,
        calculateTotalPrice,
        loggedIn,
    } = React.useContext(StoreContext)

    const API = import.meta.env.VITE_API

    const navigate = useNavigate()
    async function addItemToShoppingCart(event, product) {
        event.stopPropagation()
        // console.log(product)
        if (!loggedIn) {
            navigate('/login')
            return
        }
        console.log('user is logged in')
        const index = isProductInShoppingCart(product)

        if (index >= 0) {
            console.log('item already in shopping cart')
            increaseShoppingCartProductQuantity(index)
        } else {
            product.quantity = 1
            const response = await postData(`${API}/add-cart-product`, product)
            console.log(response)
            if (!response) return
            console.log('item has been added')

            setShoppingCartProducts([...shoppingCartProducts, product])
        }
        openCartSideMenu(event)
    }
    function isProductInShoppingCart(product) {
        return shoppingCartProducts.findIndex(
            (item) => item.product_id === product.product_id
        )
    }

    function increaseShoppingCartProductQuantity(index) {
        console.log(index)
        const newValue = shoppingCartProducts
        newValue[index].quantity++
        setShoppingCartProducts([...newValue])
        console.log('quantity increased')
    }

    function removeProductFromShoppingCart(index) {
        let newValue = shoppingCartProducts
        const left = newValue.slice(0, index)
        const right = newValue.slice(index + 1, newValue.length)
        setShoppingCartProducts([...left, ...right])
    }

    // console.log(shoppingCartProducts)

    return {
        addItemToShoppingCart,
        isProductInShoppingCart,
        removeProductFromShoppingCart,
        calculateTotalPrice,
    }
}

export default useShoppingCart
