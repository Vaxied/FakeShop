type rotation = '-90' | '0' | '90' | '180'
type rotationValues = {
    [key: string]: string
}

function ArrowIcon({ rotation = '0' }: { rotation?: rotation }) {
    const rotationValues: rotationValues = {
        '-90': '-rotate-90',
        '0': 'rotate-0',
        '90': '-rotate-90',
        '180': 'rotate-180',
    }
    return (
        <>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className={`size-7 pr-2 ${rotationValues[rotation]}`}
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5 8.25 12l7.5-7.5'
                />
            </svg>
        </>
    )
}

export default ArrowIcon
