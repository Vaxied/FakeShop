import { IProduct } from '../../@types/product'
function CartProductCloseButton(
    props: Readonly<{
        product: IProduct
        removeProductFromShoppingCart: (id: number) => void
    }>
) {
    const { product, removeProductFromShoppingCart } = props
    return (
        <button
            type='button'
            className='h-8'
            onClick={() => removeProductFromShoppingCart(product.product_id)}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                />
            </svg>
        </button>
    )
}

export default CartProductCloseButton
