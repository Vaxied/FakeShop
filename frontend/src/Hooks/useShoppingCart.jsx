import React from 'react'
import { StoreContext } from '../Context/context'
import { useNavigate } from 'react-router-dom'

function useShoppingCart() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        openCartSideMenu,
        calculateTotalPrice,
        loggedIn,
    } = React.useContext(StoreContext)

    const navigate = useNavigate()
    function addItemToShoppingCart(event, product) {
        event.stopPropagation()
        if (!loggedIn) {
            navigate('/login')
            return
        }
        const index = isProductInShoppingCart(product)

        if (index >= 0) {
            increaseShoppingCartProductQuantity(index)
        } else {
            product.quantity = 1
            setShoppingCartProducts([...shoppingCartProducts, product])
        }
        openCartSideMenu(event)

        console.log('item has been added')
    }

    function isProductInShoppingCart(product) {
        return shoppingCartProducts.findIndex((item) => item.id === product.id)
    }

    function increaseShoppingCartProductQuantity(index) {
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
