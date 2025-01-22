import * as React from 'react'
import { IProduct } from '@@types/product'
import useShoppingCart from '@hooks/useShoppingCart'
import Spinner from '@features/loading/Spinner'
import './index.css'
import CartProductCloseButton from '@features/shoppingCart/CartProductCloseButton'

function CartSideMenuProduct(
    props: Readonly<{
        product: IProduct
        index?: number
        isLoadingAnimation?: boolean
        shoppingCartProducts?: IProduct[]
    }>,
) {
    const { removeProductFromShoppingCart } = useShoppingCart()
    const { product, index, shoppingCartProducts } = props
    const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(
        shoppingCartProducts && index === 0,
    )

    const stopLoadingAnimation = () =>
        setTimeout(() => {
            if (isLoadingAnimation) setIsLoadingAnimation(false)
        }, 500)
    stopLoadingAnimation()

    return (
        <div
            key={product.product_id}
            className='h-[60px] flex items-center mb-3 p-2 justify-between bg-white border border-gray rounded-lg gap-4 text-sm'
        >
            {isLoadingAnimation && shoppingCartProducts && index === 0 ? (
                <Spinner size={'4'} />
            ) : (
                <>
                    <div className='flex items-center min-w-[120px] gap-4'>
                        <img
                            src={product?.image}
                            alt={product.title}
                            className='w-12 h-12 min-w-12 min-h-12 rounded-lg'
                        />
                        <p id='side-product-title' className='max-w-[122px]'>
                            {product?.title}
                        </p>
                    </div>
                    <div className='flex-col items-center justify-center gap-4'>
                        <p className='min-w-[48px] flex flex-nowrap items-center text-xs'>
                            Qty: {product?.product_quantity}
                        </p>
                        <p className='flex w-16 items-center'>
                            $
                            {product.product_quantity &&
                                (
                                    product?.price * product.product_quantity
                                ).toFixed(2)}
                        </p>
                    </div>
                    <CartProductCloseButton
                        id={product.product_id}
                        removeProductFromShoppingCart={
                            removeProductFromShoppingCart
                        }
                    />
                </>
            )}
        </div>
    )
}

export default CartSideMenuProduct
