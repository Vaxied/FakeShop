import { useEffect, useRef, useState } from 'react'
import SnowflakeIcon from '@components/icons/SnowflakeIcon'
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
    const colors = ['red', 'darkgreen', '']
    const pickedColor = colors[Math.floor(Math.random() * 3)]
    const delayBetweenRenders = Math.random() * 5000

    const regenerateData = () => {
        const size = generateSize()
        const style = {
            left: generateXCoord(),
        }
        setData({ ...data, size: size, style: style, color: pickedColor })
        setShowSnowflake(false)
        delayRender(delayBetweenRenders)
    }

    const delayRender = (delay: number) =>
        setTimeout(() => setShowSnowflake(true), delay)

    const generateXCoord = () => {
        const spawnRightSide = Math.floor(
            Math.random() +
                window.innerWidth / 2 +
                (Math.random() * window.innerWidth) / 2,
        )

        const spawnLeftSide = Math.floor(
            (Math.random() * window.innerWidth) / 2,
        )

        const shouldSpawnOnOppositeSide = () => {
            return Math.random() <= 0.75
        }
        let xCoord = 0
        if (windState.direction === 'right') {
            if (shouldSpawnOnOppositeSide()) xCoord = spawnLeftSide
            else xCoord = spawnRightSide
        } else if (windState.direction === 'left') {
            if (shouldSpawnOnOppositeSide()) {
                xCoord = spawnRightSide
            } else xCoord = spawnLeftSide
        }
        return xCoord
    }

    const generateSize = () => {
        return Math.floor(Math.random() * 16) + 8
    }

    const [data, setData] = useState({
        size: generateSize(),
        style: { left: generateXCoord() },
        color: pickedColor,
    })

    const getNewPosition = (position: string) => {
        const newPosition = parseInt(position.slice(0, position.length - 2))
        const distance = getLateralDistance(data.size, windState.strength)
        // return newPosition
        return windState.direction === 'right'
            ? `${newPosition + distance}px`
            : `${newPosition - distance}px`
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

    const updatePosition = () => {
        if (particleRef.current && showSnowflake) {
            particleRef.current.style.left = getNewPosition(
                particleRef.current.style.left,
            )
        }
    }

    useEffect(() => {
        updatePosition()
        const frameRequest = requestAnimationFrame(checkPosition)
        return () => {
            cancelAnimationFrame(frameRequest)
        }
    }, [windState])

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
                    transition: `left ${getTransitionDuration(data.size, windState.strength)} ease-out`,
                }
            }
        >
            <SnowflakeIcon data={data} />
        </div>
    )
}

export default Snowflake
