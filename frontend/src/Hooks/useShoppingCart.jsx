import React from 'react'
import { StoreContext } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import { postData, updateData, deleteData } from '../services/fetchWrapper'

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
            product.product_quantity = 1
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

    async function increaseShoppingCartProductQuantity(index) {
        console.log(index)
        const newProducts = shoppingCartProducts
        newProducts[index].product_quantity++
        const product = newProducts[index]
        const response = await updateData(
            `${API}/increase-product-quantity`,
            product
        )
        if (!response) return
        setShoppingCartProducts([...newProducts])
        console.log('quantity increased')
    }

    async function removeProductFromShoppingCart(index) {
        let newProducts = shoppingCartProducts
        const product = newProducts[index]
        const response = await deleteData(`${API}/remove-product`, product)
        if (!response) return
        const left = newProducts.slice(0, index)
        const right = newProducts.slice(index + 1, newProducts.length)
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
