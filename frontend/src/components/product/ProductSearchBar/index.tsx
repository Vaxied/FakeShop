import React from 'react'

type searchProps = {
    searchByTitle: string
    setSearchByTitle: (string: string) => void
}

function ProductSearchBar(props: Readonly<searchProps>) {
    const { searchByTitle, setSearchByTitle } = props
    return (
        <div className='flex justify-center items-center mb-8'>
            <div className='flex items-center gap-2 bg-white border-2 border-accent has-[:focus]:border-secondary rounded-lg px-4 py-2 outline-none w-80 text-lg'>
                <input
                    type='text'
                    placeholder='Search for a product'
                    value={searchByTitle}
                    onChange={event => {
                        setSearchByTitle(event.target.value)
                    }}
                    className=' indent-4 outline-none bg-transparent placeholder-primary-text-color flex-1 text-secondary peer focus:border-secondary focus:placeholder-secondary border-none'
                />
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 left-2 stroke-secondary peer-focus:stroke-accent'
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
