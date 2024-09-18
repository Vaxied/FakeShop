import { IProduct } from '../../@types/product'
import useShoppingCart from '../../Hooks/useShoppingCart'

function CartSideMenuProducts(
    props: Readonly<{ shoppingCartProducts: IProduct[] }>
) {
    console.log('products', props.shoppingCartProducts)
    const { removeProductFromShoppingCart } = useShoppingCart()
    return (
        <div
            className={` ${
                props.shoppingCartProducts.length > 0
                    ? 'overflow-y-auto'
                    : 'justify-center items-center font-semibold text-lg'
            } flex flex-col h-[500px] my-2`}
        >
            {props.shoppingCartProducts.length <= 0 && (
                <p>Please, add an item</p>
            )}
            {props.shoppingCartProducts.length > 0 &&
                props.shoppingCartProducts.map((product: IProduct) => (
                    <div
                        key={product.product_id}
                        className='flex items-center mb-2 p-2 justify-between bg-white border border-gray rounded-lg text-xs'
                    >
                        <div className='flex flex-1 items-center'>
                            <img
                                src={product?.image}
                                alt={product.title}
                                className='w-12 h-12 rounded-lg'
                            />
                            <p className='flex-1 px-4 w-32 truncate'>
                                {product?.title}
                            </p>
                        </div>
                        <div className='flex justify-between items-center h-8'>
                            <p className='flex items-center'>
                                Qty: {product?.product_quantity}
                            </p>
                            <p className='flex items-center w-16 justify-end'>
                                $
                                {product.product_quantity &&
                                    (
                                        product?.price *
                                        product.product_quantity
                                    ).toFixed(2)}
                            </p>
                            <button
                                type='button'
                                className='ml-8 h-8'
                                onClick={() => {
                                    removeProductFromShoppingCart(
                                        product.product_id
                                    )
                                    console.log('removing')
                                }}
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
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default CartSideMenuProducts
