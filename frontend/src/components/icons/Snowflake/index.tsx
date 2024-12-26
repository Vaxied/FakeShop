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
    const wobble = useRef(0)

    const regenerateData = () => {
        const size = generateSize() + 5
        const style = {
            left: generateXCoord()
        }
        setData({ ...data, size: size, style: style })
        setShowSnowflake(false)
        const delay = Math.random() * 5000
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

    const changeDirection = (position: string) => {
        wobble.current += 0.02
        const newPosition = parseInt(position.slice(0, position.length - 2))
        const distance = getLateralDistance(data.size, windState.strength)
        return windState.direction === 'right'
            ? `${newPosition + distance + Math.sin(wobble.current) * 2}px`
            : `${newPosition - distance + Math.sin(wobble.current) * 2}px`
    }

    const reachedBottom = () => {
        return (
            particleRef.current &&
            particleRef.current.getBoundingClientRect().top > window.innerHeight
        )
    }

    const checkPosition = () => {
        setTimeout(() => {
            if (particleRef.current) {
                if (reachedBottom()) {
                    regenerateData()
                }
            }
            requestAnimationFrame(checkPosition)
        }, 500)
    }

    const getLateralDistance = (size: any, windStrength: any) => {
        const width = window.innerWidth
        if (size >= 20) {
            return windStrength === 'strong' ? width * 0.3 : width * 0.1
        } else if (size >= 10)
            return windStrength === 'strong' ? width * 0.4 : width * 0.125
        else return windStrength === 'strong' ? width * 0.5 : width * 0.25
    }
    const getTransitionDuration = (size: any, windStrength: any) => {
        if (size >= 20) {
            return windStrength === 'strong' ? '10s' : '20s'
        } else if (size >= 10) return windStrength === 'strong' ? '8s' : '16s'
        else return windStrength === 'strong' ? '5s' : '10s'
    }

    const getAnimationClass = (size: number) => {
        if (size >= 20) {
            return 'animate-fall-fast'
        } else if (data.size >= 10) {
            return 'animate-fall-med'
        } else {
            return 'animate-fall-slow'
        }
    }

    useEffect(() => {
        if (showSnowflake) {
            if (particleRef.current && reachedBottom()) {
                particleRef.current.style.top = '0px'
            }
        }
        if (particleRef.current) {
            // console.log(particleRef.current.style.left)
            particleRef.current.style.left = changeDirection(
                particleRef.current.style.left
            )
        }

        requestAnimationFrame(checkPosition)
        return () => {
            cancelAnimationFrame(checkPosition as unknown as number)
        }
    }, [showSnowflake, windState])

    if (!showSnowflake) {
        delayRender(Math.random() * 15000)
        return null
    }

    return (
        <div
            className={`snow-particle fixed z-20 ${getAnimationClass(data.size)}`}
            ref={particleRef}
            style={
                showSnowflake && {
                    left: `${data.style.left}px`,
                    transition: `left ${getTransitionDuration(data.size, windState.strength)} ease-out`
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
