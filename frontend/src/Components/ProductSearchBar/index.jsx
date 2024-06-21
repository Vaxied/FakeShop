import React from 'react'

function ProductSearchBar(props) {
    const { searchByTitle, setSearchByTitle } = props
    return (
        <div className='flex justify-center items-center mb-8'>
            <div className='relative'>
                <input
                    type='text'
                    placeholder='Search a product'
                    value={searchByTitle}
                    onChange={(event) => {
                        setSearchByTitle(event.target.value)
                    }}
                    className='border border-gray-400 rounded-lg px-4 py-2 outline-none w-80 indent-6'
                />
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6 absolute left-2 top-[50%] translate-y-[-50%]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                </svg>
            </div>
        </div>
    )
}

export default ProductSearchBar
