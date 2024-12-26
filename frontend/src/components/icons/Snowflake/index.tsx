import { useEffect, useRef, useState } from 'react'
type SnowflakeProps = {
    windState: WindData
}

type WindData = {
    direction: 'right' | 'left'
    strength: 'light' | 'strong'
}

function Snowflake({ windState }: SnowflakeProps) {
    let particleRef = useRef<HTMLDivElement>(null)
    const [showSnowflake, setShowSnowflake] = useState(false)

    const regenerateData = () => {
        // const size = generateSize()
        const size = 24
        const style = {
            left: generateXCoord()
        }
        // console.log('setting new data')
        setData({ ...data, size: size, style: style })
        setShowSnowflake(false)
        const delay = Math.random() * 3000
        delayRender(delay)
    }

    const delayRender = (delay: number) =>
        setTimeout(() => setShowSnowflake(true), delay)

    const generateXCoord = () => {
        return Math.floor(Math.random() * window.innerWidth)
    }
    const generateSize = () => {
        return Math.floor(Math.random() * 25)
    }

    const [data, setData] = useState({
        size: generateSize(),
        style: { left: generateXCoord() }
    })

    // const changeDirection = (position: string) => {
    //     // console.log(position)
    //     const newPosition = parseInt(position.slice(0, position.length - 2))
    //     // console.log(newPosition)
    //     const direction = Math.random() < 0.5 ? -10 : 10
    //     // console.log('newPosition: ', newPosition, 'direction: ', direction)
    //     //
    //     // console.log(newPosition + direction)
    //     return `${newPosition + direction}px`
    // }

    const reachedBottom = () => {
        return (
            particleRef.current &&
            particleRef.current.getBoundingClientRect().top > window.innerHeight
        )
    }

    // console.log(reachedBottom())

    // console.log(
    //     'window: ',
    //     window.innerHeight,
    //     'particle: ',
    //     particleRef.current?.getBoundingClientRect()
    // )

    // console.log(particleRef.current?.style.left)
    const checkPosition = () => {
        setTimeout(() => {
            if (particleRef.current) {
                // console.log(particleRef.current.style.left)
                // particleRef.current.style.left = changeDirection(
                //     particleRef.current.style.left
                // )
                if (reachedBottom()) {
                    // console.log('regenerating')
                    regenerateData()
                }
            }
            requestAnimationFrame(checkPosition)
        }, 500)
    }

    const leftPosition = particleRef.current?.getBoundingClientRect().left

    const getAnimationClass = (
        size: any,
        windDirection: any,
        windStrength: any
    ) => {
        if (size >= 20) {
            return windDirection === 'right'
                ? windStrength === 'strong'
                    ? 'animate-fall-fast-right-strong'
                    : 'animate-fall-fast-right-light'
                : windStrength === 'strong'
                  ? 'animate-fall-fast-left-strong'
                  : 'animate-fall-fast-left-light'
        } else if (data.size >= 10) {
            return windDirection === 'right'
                ? windStrength === 'strong'
                    ? 'animate-fall-medium-right-strong'
                    : 'animate-fall-medium-right-light'
                : windStrength === 'strong'
                  ? 'animate-fall-medium-left-strong'
                  : 'animate-fall-medium-left-light'
        } else {
            return windDirection === 'right'
                ? windStrength === 'strong'
                    ? 'animate-fall-slow-right-strong'
                    : 'animate-fall-slow-right-light'
                : windStrength === 'strong'
                  ? 'animate-fall-slow-left-strong'
                  : 'animate-fall-slow-left-light'
        }
    }

    useEffect(() => {
        if (showSnowflake) {
            if (particleRef.current && reachedBottom()) {
                particleRef.current.style.top = '0px'
            }
        }
        requestAnimationFrame(checkPosition)
        return () => {
            cancelAnimationFrame(checkPosition as unknown as number)
        }
    }, [showSnowflake])

    if (!showSnowflake) {
        delayRender(Math.random() * 10000)
        return null
    }

    //
    // const test = 'animate-fall-fast-right-strong'
    // const directionTest =
    //     windState.direction === 'right'
    //         ? 'animate-fall-right'
    //         : 'animate-fall-left'
    return (
        <div
            className={`snow-particle fixed z-20 ${getAnimationClass(data.size, windState.direction, windState.strength)}`}
            ref={particleRef}
            style={
                showSnowflake && {
                    left: `${data.style.left}px`
                }
            }
        >
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
                    stroke=''
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={`stroke-secondary`}
                ></path>
            </svg>{' '}
        </div>
    )
}

export default Snowflake
