function DetailedProductDescription(props: Readonly<{}>) {
    const mockData = {
        imagesData: [
            {
                src: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'leather bag',
                desc: 'Carry Confidence, Embrace Elegance',
            },
            {
                src: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'leather bag',
                desc: 'Where Style Meets Function',
            },
            {
                src: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'leather bag',
                desc: 'Unleash Your Inner Fashionista',
            },
        ],
    }

    return (
        <div className='w-full flex flex-col border-2-gray-500'>
            {mockData.imagesData.map(({ src, alt, desc }, index) => {
                return index % 2 === 0 ? (
                    <div className='w-full h-96 flex'>
                        <div className='w-[50%] h-full px-4 pt-16 bg-secondary bg-gradient-to-tr from-accent'>
                            <span className='max-w-fit break-words font-bold text-4xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                                {desc}
                            </span>
                        </div>
                        <div className='w-[50%] h-full'>
                            <figure className='h-full'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={src}
                                    alt={alt}
                                />
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-96 flex'>
                        <div className='w-[50%] h-full'>
                            <figure className='h-full'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={src}
                                    alt={alt}
                                />
                            </figure>
                        </div>
                        <div className='flex justify-end items-start w-[50%] h-full pt-16 px-6 bg-accent bg-gradient-to-tr from-secondary'>
                            <span className='max-w-fit break-words font-bold text-white text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                                {desc}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailedProductDescription
