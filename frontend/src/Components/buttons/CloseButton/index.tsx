function CloseButton({ id }: Readonly<{ id: string }>) {
    return (
        <button
            type='button'
            // onClick={(event) => {
            // closeProductDetail(event)
            // }}
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
    )
}

export default CloseButton
