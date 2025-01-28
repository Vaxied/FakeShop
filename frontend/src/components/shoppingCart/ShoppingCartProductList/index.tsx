import { StoreContextType } from '@@types/store'
import { StoreContext } from '@components/Context/context'
import ShoppingCartProduct from '@components/shoppingCart/ShoppingCartProduct'
import { useContext } from 'react'

type ShoppingCartProductListProps = {
    closeButtonEnabled?: boolean
}
function ShoppingCartProductList({
    closeButtonEnabled = false,
}: ShoppingCartProductListProps) {
    const { shoppingCartProducts } = useContext(
        StoreContext,
    ) as StoreContextType
    return (
        <>
            {shoppingCartProducts.map(product => {
                return (
                    <ShoppingCartProduct
                        product={product}
                        key={product.product_id}
                        closeButtonEnabled={closeButtonEnabled}
                    />
                )
            })}
        </>
    )
}

export default ShoppingCartProductList
