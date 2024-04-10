function Card() {
    return (
        <div className='bg-white w-56 h-60 cursor-pointer'>
            <figure className='relative mb-2 w-full h-4/5'>
                <img
                    className='w-full h-full object-cover rounded-lg'
                    src='https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    alt='headphones'
                />
                <button
                    type='button'
                    className='flex justify-center items-center absolute text-md font-bold w-6 h-6 top-0 right-0 mt-1 mr-1 rounded-full p-1 bg-white cursor-pointer leading-none'
                >
                    +
                </button>
                <figcaption className='bg-white/60 text-md font-semibold absolute bottom-0 left-0 ml-1 mb-1 py-1 px-2 text-xs rounded-lg'>
                    Electronics
                </figcaption>
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-sm text-black/60'>Headphones</span>
                <span className='text-lg text-black font-semibold'>$300</span>
            </p>
        </div>
    )
}

export default Card
