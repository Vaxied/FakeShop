import React from 'react'
type ProductImg = {
    src: string
    alt: string
}

function ProductImgSelector(
    props: Readonly<{
        productImages: ProductImg[]
        setImageToShow: (arg0: string) => void
    }>
) {
    const { productImages, setImageToShow } = props
    const [selectedImage, setSelectedImage] = React.useState<number>(0)

    const updateSelectedImage = (index: number, src: string) => {
        if (index === selectedImage) return
        setSelectedImage(index)
        setImageToShow(src)
    }
    return (
        <div className='flex flex-col w-12 max-h-[fit-content] gap-2'>
            {productImages.map(({ src, alt }, index) => (
                <div
                    className={`w-12 h-12 p-[0.125rem] rounded-lg cursor-pointer ${
                        selectedImage === index
                            ? 'border-secondary border-2'
                            : ''
                    }`}
                    onMouseEnter={() => updateSelectedImage(index, src)}
                >
                    <img
                        src={src}
                        alt={alt}
                        className='object-cover w-full h-full rounded-lg'
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductImgSelector
