import NotFound from '@pages/NotFound'
import useShoppingCart from '@hooks/useShoppingCart'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// type props = {
//     product: IProduct
//     closeProductDetail: (event: React.MouseEvent) => void
// }

function ProductDetail() {
    //check if product.id exists or send to notfound
    const { addItemToShoppingCart } = useShoppingCart()
    const navigate = useNavigate()
    const { state } = useLocation()
    const product = state
    const params = useParams()
    console.log('params', params)
    const id = params['productId']
    console.log('product id is: ', id)
    if (!product) {
        return <NotFound />
    }

    return (
        <div className='flex bg-gray-100 bg-opacity-50 w-full h-full px-8'>
            <div className='flex justify-center w-[33%] h-full'>
                <div>
                    <figure className='relative mb-2 w-full h-[300px]'>
                        <img
                            className='w-full h-full object-contain rounded-lg'
                            src={product.image}
                            alt={product.title}
                        />
                    </figure>
                </div>
            </div>
            <div className='w-[calc(100%-33%)]'>
                <p>
                    <span className='text-md text-black/60 font-bold'>
                        {product.title}
                    </span>
                </p>
                <span className='px-2 w-[8rem] border border-gray rounded-lg bg-gray-300 text-black'>
                    {product.category}
                </span>
                <hr className='mt-2'></hr>
                <p className='flex items-start pt-2 text-3xl leading-none'>
                    <span className='text-sm'>US$</span>
                    <span>{product.price.split('.')[0]}</span>
                    <span className='text-sm'>
                        {product.price.split('.')[1]}
                    </span>
                </p>
                <p className='flex items-center text-lg text-black font-semibold py-2'>
                    <button
                        type='button'
                        onClick={(event) => {
                            addItemToShoppingCart(event, product)
                        }}
                        className='flex justify-center items-center text-md h-6 bg-black cursor-pointer border border-gray rounded-lg text-white p-4'
                    >
                        <span className='text-sm font-semibold'>
                            Add to cart
                        </span>
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
                </p>
                <p className='pb-4'>{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetail
