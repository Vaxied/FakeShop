function DetailedProductDescription(props: Readonly<{}>) {
    return (
        <div className='w-full h-96 flex'>
            <div className='w-[50%] h-full font-semibold text-4xl pt-16 px-4'>
                Here goes some text
            </div>
            <div className='w-[50%] h-full'>
                <figure className='h-full'>
                    <img
                        className='w-full h-full object-cover'
                        src='
            https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt=''
                    />
                </figure>
            </div>
        </div>
    )
}

export default DetailedProductDescription
