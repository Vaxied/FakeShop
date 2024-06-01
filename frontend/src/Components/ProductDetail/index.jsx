import PropTypes from 'prop-types'
import useShoppingCart from '../../Hooks/useShoppingCart'

function ProductDetail({
    item,
    image,
    title,
    price,
    description,
    category,
    closeProductDetail,
}) {
    ProductDetail.propTypes = {
        item: PropTypes.object.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        closeProductDetail: PropTypes.func.isRequired,
    }

    const { addItemToShoppingCart } = useShoppingCart()

    return (
        <aside className='flex flex-col fixed right-0 border-0.5 border-black w-[360px] h-[calc(100vh-68px)] top-[68px] bg-white rounded-lg'>
            <div className='bg-gray-100 bg-opacity-50 w-full h-full cursor-pointer border-2 border-gray rounded-lg px-4 overflow-y-scroll'>
                <button
                    type='button'
                    onClick={(event) => {
                        closeProductDetail(event)
                    }}
                    className='flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 left-0 mt-3 ml-3 p-1 bg-white cursor-pointer border border-gray rounded-full z-10'
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
                            d='M6 18 18 6M6 6l12 12'
                        />
                    </svg>
                </button>
                <p className='text-right py-2'>
                    <span>Detail</span>
                </p>
                <figure className='relative mb-2 w-full h-1/2'>
                    <img
                        className='w-full h-full object-cover rounded-lg border border-gray'
                        src={image}
                        alt={title}
                    />
                    <button
                        type='button'
                        onClick={(event) => {
                            addItemToShoppingCart(event, item)
                        }}
                        className='flex justify-center items-center absolute text-md h-6 bottom-0 right-0 mb-1 mr-1 p-3 bg-green-500 cursor-pointer border border-gray rounded-lg text-white'
                    >
                        <span className='mb-0.5 text-xs font-bold'>+</span>
                        <span className='scale-x-[-1] ml-1'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-4 h-4'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                                />
                            </svg>
                        </span>
                    </button>
                </figure>
                <p className='flex justify-between items-center p-2'>
                    <span className='text-sm text-black/60 font-bold mr-2'>
                        {title}
                    </span>
                    <span className='text-lg text-green-500 font-semibold'>
                        ${price}
                    </span>
                </p>
                <span className='px-2 border border-gray rounded-lg bg-gray-300 text-black'>
                    {category}
                </span>
                <p className='px-2 pb-4 pt-2'>{description}</p>
            </div>
        </aside>
    )
}

export default ProductDetail
