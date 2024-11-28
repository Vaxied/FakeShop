import React from 'react'
import NotFound from '@pages/NotFound'
import useShoppingCart from '@hooks/useShoppingCart'
import { useLocation, useParams } from 'react-router-dom'
import ProductImgCarousel from '@components/features/carousel/ProductImgCarousel'
import StarIcon from '@components/icons/StarIcon'
import ProductImgSelector from '../ProductImageSelector'
import DetailedProductDescription from '../DetailedProductDescription'
import RelatedProducts from '../RelatedProducts'
import ProductReviews from '../ProductReviews'

function ProductDetail() {
    const { addItemToShoppingCart } = useShoppingCart()
    const { state } = useLocation()
    const product = state
    const params = useParams()
    console.log('params', params)
    const id = params['productId']
    console.log('product id is: ', id)

    // TODO
    // Save images in db/fs and fetch it once to stop making a call each time image is updated
    const productImages = React.useRef([
        {
            src: product.image,
            alt: 'something',
        },
        {
            src: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'something',
        },
        {
            src: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'something',
        },
        {
            src: 'https://images.unsplash.com/photo-1484527273420-c598cb0601f8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'something',
        },
        {
            src: 'https://images.unsplash.com/photo-1531938716357-224c16b5ace3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'something',
        },
        {
            src: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'something',
        },
    ])

    const [imageToShow, setImageToShow] = React.useState(product.image)
    if (!product) {
        return <NotFound />
    }

    return (
        <>
            <div className='flex gap-4 bg-gray-100 bg-opacity-50 w-full min-h-96] pb-4'>
                <div className='flex w-[30%] mr-4'>
                    <div className='flex w-full top-[96px] sticky self-start gap-4'>
                        <ProductImgSelector
                            productImages={productImages.current}
                            setImageToShow={setImageToShow}
                        />
                        <div className='flex justify-center max-h-[30rem] flex-1'>
                            <figure className='flex justify-center mb-2 w-full h-[300px]'>
                                <img
                                    className='min-w-52 w-full h-full object-contain'
                                    src={imageToShow}
                                    alt={product.title}
                                />
                            </figure>
                        </div>
                    </div>
                </div>
                <div className='w-[45%]'>
                    <p className='flex flex-wrap pb-2'>
                        <span className='w-full text-md text-black/60 font-bold'>
                            {product.title}
                        </span>
                        <span className='px-2 py-1 text-sm border border-gray rounded-lg bg-accent/70 text-black'>
                            {product.category}
                        </span>
                    </p>
                    <div className='flex items-center h-7 pb-3'>
                        <span className='font-medium pr-1'>
                            {product.average_rating.substring(0, 3)}
                        </span>
                        <span>
                            <StarIcon isFilled={true} isHalved={false} />
                        </span>
                        <span className='pl-1 font-normal'>
                            ({product.rating_count})
                        </span>
                    </div>
                    <hr className='mb-3'></hr>
                    <p className='flex items-start text-3xl pb-3 leading-none'>
                        <span className='text-sm'>US$</span>
                        <span>{product.price.split('.')[0]}</span>
                        <span className='text-sm'>
                            {product.price.split('.')[1]}
                        </span>
                    </p>
                    <p className='pb-4'>{product.description}</p>
                    <ul className='pb-4 list-disc ml-4'>
                        <li>Material: Premium leather</li>
                        <li>
                            Hardware: Gold-tone Interior: Spacious with multiple
                            pockets
                        </li>
                        <li>
                            Versatile Use: Ideal for day-to-night transitions
                        </li>
                        <li>Style: Adds a touch of luxury to any outfit</li>
                    </ul>
                    <p className='pb-4'>
                        Step out in style with this sophisticated elegance
                        handbag. Crafted from premium leather, its sleek design
                        features a chic silhouette complemented by gold-tone
                        hardware. The spacious interior, complete with multiple
                        pockets, ensures all your essentials are organized and
                        easily accessible. Perfect for day-to-night transitions,
                        this handbag adds a touch of luxury to any outfit.
                    </p>
                </div>
                <div className='w-[25%]'>
                    <div className='flex flex-wrap bg-container p-4 rounded-lg'>
                        <p className='pb-4'>
                            Get it delivered to your doorstep by 25th Oct.
                        </p>
                        <div className='flex justify-end w-full'>
                            <button
                                type='button'
                                onClick={(event) => {
                                    addItemToShoppingCart(event, product)
                                }}
                                className='flex justify-center items-center text-md h-6 bg-secondary cursor-pointer border border-gray rounded-lg text-white p-4 self-center'
                            >
                                <span className='text-sm text-center font-semibold'>
                                    Add to cart
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DetailedProductDescription />
            <ProductImgCarousel />
            <RelatedProducts featuredProduct={product} />
            <ProductReviews product={product} />
        </>
    )
}

export default ProductDetail
