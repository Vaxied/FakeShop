import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { StoreContext } from '../../Context/context'
import ProductDetail from '../ProductDetail'
import useShoppingCart from '../../Hooks/useShoppingCart'
import CartSideMenu from '../CartSideMenu'

function Card({ product }) {
    Card.propTypes = {
        product: PropTypes.object.isRequired,
    }
    const {
        productToShow,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
    } = React.useContext(StoreContext)

    const { addItemToShoppingCart } = useShoppingCart()

    return (
        <div
            className='bg-gray-100 bg-opacity-50 w-56 h-60 cursor-pointer border-2 border-gray rounded-lg'
            onClick={() => openProductDetail(product)}
        >
            <figure className='relative mb-2 w-full h-4/5'>
                <img
                    className='w-full h-full object-cover'
                    src={product.image}
                    alt={product.title}
                />
                <button
                    type='button'
                    onClick={(event) => addItemToShoppingCart(event, product)}
                    className='flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 right-0 mt-1 mr-1 rounded-full p-1 bg-white cursor-pointer border border-gray'
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
                <figcaption className='bg-white/60 text-md font-semibold absolute bottom-0 left-0 ml-1 mb-1 py-1 px-2 text-xs rounded-lg truncate'>
                    {product.category}
                </figcaption>
            </figure>
            <p className='flex justify-between items-center px-2'>
                <span className='text-sm text-black/60 truncate mr-2'>
                    {product.title}
                </span>
                <span className='text-lg text-black font-semibold'>
                    ${product.price}
                </span>
            </p>
            {productToShow === product &&
                isProductDetailOpen &&
                createPortal(
                    <ProductDetail
                        item={product}
                        image={product.image}
                        price={product.price}
                        title={product.title}
                        description={product.description}
                        category={product.category}
                        closeProductDetail={closeProductDetail}
                    />,
                    document.body
                )}
        </div>
    )
}

export default Card
