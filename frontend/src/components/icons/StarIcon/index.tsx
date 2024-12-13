type StarProps = {
    isFilled?: boolean
    isHalved?: boolean
}

function StarIcon(props: Readonly<StarProps>) {
    const { isFilled = true, isHalved = false } = props

    const getFilledOrEmpty = () => {
        return isFilled && !isHalved ? 'fill-[#677beb]' : 'fill-[#fff]'
    }

    return (
        <svg
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            color='#000000'
            strokeWidth='1'
        >
            <path
                d='M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z'
                // stroke='#ffcc00'
                stroke='#677beb'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`${
                    isFilled && isHalved
                        ? 'fill-[url(#starGradient)]'
                        : getFilledOrEmpty()
                }
                `}
            ></path>
            <defs>
                <linearGradient id='starGradient' x1={'0%'} x2={'100%'}>
                    <stop offset='50%' stopColor='#677beb' />
                    <stop offset='50%' stopColor='#fff' />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default StarIcon
