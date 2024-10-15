import * as React from 'react'
import { IProduct } from '../../@types/product'
import './index.css'
import CartSideMenuProduct from '../CartSideMenuProduct'

function CartSideMenuProducts(
    props: Readonly<{ shoppingCartProducts: IProduct[] }>
) {
    // console.log('products', props.shoppingCartProducts)
    return (
        <div
            id='cart-side-products-container'
            className={` ${
                props.shoppingCartProducts.length > 0
                    ? 'overflow-y-auto'
                    : 'justify-center items-center font-semibold text-lg'
            } flex flex-col h-[calc(100vh-200px)] my-2 pr-2`}
        >
            {props.shoppingCartProducts.length <= 0 && (
                <p>Please, add an item</p>
            )}
            {props.shoppingCartProducts.length > 0 &&
                props.shoppingCartProducts.map((product: IProduct, index) => (
                    <CartSideMenuProduct
                        product={product}
                        key={product.product_id}
                        index={index}
                        shoppingCartProducts={props.shoppingCartProducts}
                    />
                ))}
        </div>
    )
}

export default CartSideMenuProducts
