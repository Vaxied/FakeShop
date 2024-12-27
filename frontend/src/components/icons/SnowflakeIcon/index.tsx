type SnowflakeIconProps = {
    data: SnowflakeData
}

type SnowflakeData = {
    size: number
    style: { left: number }
    color?: string
}
function SnowflakeIcon(props: Readonly<SnowflakeIconProps>) {
    const { data } = props
    return (
        <>
            <svg
                width={data?.size}
                height={data?.size}
                strokeWidth='1.5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                color='#000000'
            >
                <path
                    d='M3 7L6.5 9M21 17L17.5 15M12 12L6.5 9M12 12L6.5 15M12 12V5M12 12V18.5M12 12L17.5 15M12 12L17.5 9M12 2V5M12 22V18.5M21 7L17.5 9M3 17L6.5 15M6.5 9L3 10M6.5 9L6 5.5M6.5 15L3 14M6.5 15L6 18.5M12 5L9.5 4M12 5L14.5 4M12 18.5L14.5 20M12 18.5L9.5 20M17.5 15L18 18.5M17.5 15L21 14M17.5 9L21 10M17.5 9L18 5.5'
                    stroke={`${data.color}`}
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={`${!data.color ? 'stroke-secondary' : ''}`}
                ></path>
            </svg>{' '}
        </>
    )
}

export default SnowflakeIcon
