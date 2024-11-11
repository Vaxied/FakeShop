import React, { useState } from 'react'

function ProductImgCarousel() {
    const productImages = React.useRef([
        {
            src: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1484527273420-c598cb0601f8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1531938716357-224c16b5ace3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: '',
        },
    ])

    const imgTranslateValues = React.useRef({
        left: 'transition-all translate-x-[0%]',
        mid: 'transition-none -translate-x-[100%]',
        right: 'transition-all -translate-x-[200%]',
    })

    const [carouselPosition, setCarouselPosition] = useState<
        'left' | 'mid' | 'right'
    >('mid')

    const [index, setIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(1)
    const [prevIndex, setPrevIndex] = useState(productImages.current.length - 1)

    const imagesToRender = [
        { id: 'left', data: productImages.current[prevIndex] },
        { id: 'mid', data: productImages.current[index] },
        { id: 'right', data: productImages.current[nextIndex] },
    ]

    const nextImage = (index: number) => {
        const last = productImages.current.length - 1
        setCarouselPosition('right')
        setTimeout(() => {
            if (index < last) {
                nextIndex < last ? setNextIndex(nextIndex + 1) : setNextIndex(0)
                prevIndex < last ? setPrevIndex(prevIndex + 1) : setPrevIndex(0)
                setIndex((prevIndex) => prevIndex + 1)
            } else {
                setIndex(0)
                setPrevIndex(last)
                setNextIndex(1)
            }
            setCarouselPosition('mid')
        }, 1000)
    }
    const prevImage = (index: number) => {
        const last = productImages.current.length - 1
        setCarouselPosition('left')
        setTimeout(() => {
            if (index > 0) {
                prevIndex > 0 ? setPrevIndex(prevIndex - 1) : setPrevIndex(last)
                nextIndex > 0 ? setNextIndex(nextIndex - 1) : setNextIndex(last)
                setIndex((prevIndex) => prevIndex - 1)
            } else {
                setPrevIndex(prevIndex - 1)
                setIndex(last)
                setNextIndex(nextIndex - 1)
            }
            setCarouselPosition('mid')
        }, 1100)
    }
    console.log('carouselPosition:', carouselPosition)
    console.log('indices: ', prevIndex, index, nextIndex)

    if (productImages.current.length > 0)
        return (
            <div
                id='carousel-container'
                className='w-full h-[500px] max-h-[500px] overflow-hidden relative'
            >
                <button
                    className={`w-12 h-12 rounded-lg absolute top-1/2 left-8 translate-y-[-1/2] bg-secondary border-2 border-black cursor-pointer z-10 
                    ${carouselPosition === 'mid' ? '' : 'disabled:bg-gray-400'}
                    ${productImages.current.length < 2 ? 'hidden' : ''}
                    `}
                    onClick={() => {
                        prevImage(index)
                    }}
                    disabled={carouselPosition !== 'mid'}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='white'
                        className='stroke-gray-200 hover:stroke-white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5 8.25 12l7.5-7.5'
                        />
                    </svg>
                </button>
                {productImages.current.length < 2 ? (
                    <img
                        src={productImages.current[0].src}
                        alt={productImages.current[0].alt}
                        className='w-full h-full object-cover'
                    ></img>
                ) : (
                    <div id='carousel-slider' className='h-full flex'>
                        {imagesToRender.map(({ id, data }) => (
                            <figure
                                key={id}
                                className={`w-full h-full duration-1000 ease-out flex-shrink-0 ${imgTranslateValues.current[carouselPosition]}`}
                            >
                                <img
                                    className='w-full h-full object-cover'
                                    src={data.src}
                                    alt={data.alt}
                                />
                            </figure>
                        ))}
                    </div>
                )}
                <button
                    className={`w-12 h-12 rounded-lg absolute top-1/2 right-8 translate-y-[-1/2] bg-secondary border-2 border-black z-10
                    ${carouselPosition === 'mid' ? '' : 'disabled:bg-gray-400'}
                    
                    ${productImages.current.length < 2 ? 'hidden' : ''}
                    `}
                    onClick={() => {
                        nextImage(index)
                    }}
                    disabled={carouselPosition !== 'mid'}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='white'
                        className='rotate-180 stroke-gray-200 hover:stroke-white
                    '
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5 8.25 12l7.5-7.5'
                        />
                    </svg>
                </button>
            </div>
        )
}

export default ProductImgCarousel
