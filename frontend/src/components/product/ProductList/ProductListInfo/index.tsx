import { IProduct } from '@@types/product'
import CartProductCloseButton from '@components/shoppingCart/CartProductCloseButton'
import useShoppingCart from '@hooks/useShoppingCart'

function ProductListInfo(
    props: Readonly<{ product: IProduct; closeButtonEnabled?: boolean }>,
) {
    const { product, closeButtonEnabled } = props
    const { removeProductFromShoppingCart } = useShoppingCart()
    return (
        <div
            key={product.product_id}
            className='h-[60px] flex items-center mb-3 p-2 justify-between bg-white border border-gray-300 rounded-lg gap-4 text-xs'
        >
            <div className='flex items-center min-w-[120px] gap-4'>
                <img
                    src={product?.image}
                    alt={product.title}
                    className='w-12 h-12 min-w-12 min-h-12 rounded-lg object-contain'
                />
                <p className='overflow-hidden text-ellipsis line-clamp-2'>
                    {product?.title}
                </p>
            </div>
            <div className='flex items-center h-8 gap-2 md:gap-4'>
                <p className='min-w-[48px] flex flex-nowrap items-center'>
                    Qty: {product?.product_quantity}
                </p>
                <p className='flex w-16 justify-end items-center'>
                    $
                    {product.product_quantity &&
                        (product?.price * product.product_quantity).toFixed(2)}
                </p>
                {closeButtonEnabled && (
                    <CartProductCloseButton
                        id={product.product_id}
                        removeProductFromShoppingCart={
                            removeProductFromShoppingCart
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default ProductListInfo
