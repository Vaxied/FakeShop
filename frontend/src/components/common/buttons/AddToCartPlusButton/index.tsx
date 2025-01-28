import { IProduct } from '@@types/product'

function AddToCartPlusButton(
    props: Readonly<{
        product: IProduct
        addItemToShoppingCart: (
            event: React.MouseEvent<HTMLButtonElement>,
            product: IProduct
        ) => void
    }>
) {
    const { product, addItemToShoppingCart } = props
    return (
        <button
            type='button'
            onClick={(event) => addItemToShoppingCart(event, product)}
            className='bg-white flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 right-0 mt-1 mr-1 rounded-full p-1 cursor-pointer border border-gray'
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                />
            </svg>
        </button>
    )
}

export default AddToCartPlusButton
