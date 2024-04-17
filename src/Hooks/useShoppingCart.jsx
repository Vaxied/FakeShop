import React from 'react'
import { StoreContext } from '../Context/context'

function useShoppingCart() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        count,
        setCount,
        openCartSideMenu,
    } = React.useContext(StoreContext)

    function addItemToShoppingCart(event, product) {
        event.stopPropagation()
        const index = isProductInShoppingCart(product)

        if (index >= 0) {
            increaseShoppingCartProductQuantity(index)
        } else {
            product.quantity = 1
            setShoppingCartProducts([...shoppingCartProducts, product])
            setCount(count + 1)
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
        setCount(count - 1)
    }

    function calculateTotalPrice(items) {
        let total = 0
        items.forEach((product) => {
            const price = product.price * product.quantity
            total = total + price
        })
        return total
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
