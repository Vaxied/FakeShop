import React from 'react'
import { StoreContext } from '@components/Context/context'
import { postData, updateData, deleteData } from '@lib/services/fetchWrapper'
import { StoreContextType } from '@@types/store'
import { IProduct } from '@@types/product'
import { useNavigate } from 'react-router-dom'

function useShoppingCart() {
    const {
        shoppingCartProducts,
        setShoppingCartProducts,
        openCartSideMenu,
        calculateTotalPrice,
        loggedIn,
    } = React.useContext(StoreContext) as StoreContextType

    const API = import.meta.env.VITE_API

    const navigate = useNavigate()
    async function addItemToShoppingCart(
        event: React.MouseEvent<HTMLButtonElement>,
        product: IProduct
    ) {
        event.stopPropagation()
        console.log('product', product)
        if (!loggedIn) {
            navigate('/login')
            return
        }
        console.log('user is logged in')
        const index = isProductInShoppingCart(product)
        console.log('index number', index)

        if (index >= 0) {
            console.log('item already in shopping cart')
            increaseShoppingCartProductQuantity(index)
        } else {
            product.product_quantity = 1
            const response = await postData(`${API}/add-cart-product`, product)
            console.log(response)
            if (!response) return
            console.log('item has been added')

            setShoppingCartProducts([product, ...shoppingCartProducts])
        }
        openCartSideMenu(event)
    }
    function isProductInShoppingCart(product: IProduct) {
        return shoppingCartProducts.findIndex(
            (item) => item.product_id === product.product_id
        )
    }

    async function increaseShoppingCartProductQuantity(index: number) {
        console.log(index)
        if (!shoppingCartProducts.length) return null
        const newProducts = shoppingCartProducts
        const product = newProducts[index]
        if (product.product_quantity) product.product_quantity++
        const response = await updateData(
            `${API}/increase-product-quantity`,
            product
        )
        if (!response) return
        setShoppingCartProducts([...newProducts])
        console.log('quantity increased')
    }

    async function removeProductFromShoppingCart(id: number) {
        let newProducts = shoppingCartProducts
        const index = newProducts.findIndex(
            (element) => element.product_id === id
        )
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
