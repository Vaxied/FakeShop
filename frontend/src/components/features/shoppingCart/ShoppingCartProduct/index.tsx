import * as React from 'react'
import { IProduct } from '@@types/product'
import Spinner from '@components/features/loading/Spinner'
import ProductListInfo from '@components/features/product/ProductList/ProductListInfo'

function ShoppingCartProduct(
    props: Readonly<{
        product: IProduct
        index?: number
        isLoadingAnimation?: boolean
        shoppingCartProducts?: IProduct[]
    }>
) {
    const { product, index, shoppingCartProducts } = props
    const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(
        shoppingCartProducts && index === shoppingCartProducts.length - 1
    )

    const stopLoadingAnimation = () =>
        setTimeout(() => setIsLoadingAnimation(false), 500)
    stopLoadingAnimation()

    if (
        isLoadingAnimation &&
        shoppingCartProducts &&
        index === shoppingCartProducts.length - 1
    ) {
        return <Spinner size={'4'} />
    }
    return <ProductListInfo product={product} />
}

export default ShoppingCartProduct
