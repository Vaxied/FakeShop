import { useEffect, useRef, useState } from 'react'
import SnowflakeIcon from '@components/icons/SnowflakeIcon'

type SnowflakeProps = {
    windState: { direction: 'right' | 'left'; strength: 'light' | 'strong' }
}

function Snowflake({ windState }: SnowflakeProps) {
    let particleRef = useRef<HTMLDivElement>(null)
    const [showSnowflake, setShowSnowflake] = useState(false)
    const [isMoving, setIsMoving] = useState(false)
    const colors = ['red', 'darkgreen', '']
    const pickColor = () => colors[Math.floor(Math.random() * 3)]
    const delayBetweenRenders = Math.random() * 10000
    const [lastWindState, setLastWindState] = useState(windState)

    const regenerateData = () => {
        const size = generateSize()
        const style = {
            left: generateXCoord(),
        }
        setData({ ...data, size, style, color: pickColor() })
    }

    const delayRender = (delay: number) =>
        setTimeout(() => {
            setShowSnowflake(true)
        }, delay)

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
            xCoord = shouldSpawnOnOppositeSide()
                ? spawnLeftSide
                : spawnRightSide
        } else if (windState.direction === 'left') {
            xCoord = shouldSpawnOnOppositeSide()
                ? spawnRightSide
                : spawnLeftSide
        }
        return xCoord
    }

    const generateSize = () => {
        return Math.floor(Math.random() * 16) + 8
    }

    const [data, setData] = useState({
        size: generateSize(),
        style: { left: generateXCoord() },
        color: pickColor(),
    })

    const getNewPosition = (position: number) => {
        const currentPosition = position
        const distance = getLateralDistance(data.size, windState.strength)
        const newPosition =
            windState.direction === 'right'
                ? currentPosition + distance
                : currentPosition - distance
        return newPosition
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
            setData({
                ...data,
                style: { left: getNewPosition(data.style.left) },
            })
        }
    }

    if (lastWindState !== windState) {
        updatePosition()
        setLastWindState(windState)
    }

    if (!showSnowflake) {
        delayRender(delayBetweenRenders)
    }

    const handleVerticalAnimationStart = (event: any) => {
        setShowSnowflake(true)
        updatePosition()
    }

    const handleVerticalAnimationEnd = (event: any) => {
        setShowSnowflake(false)
        regenerateData()
        setIsMoving(false)
    }

    const handleLateralTransitionStart = (event: any) => {
        if (event.propertyName !== 'left' || !particleRef.current) return
        if (isMoving) return
        setIsMoving(true)
    }
    const handleLateralTransitionEnd = (event: any) => {
        if (event.propertyName !== 'left' || !particleRef.current) return
        setIsMoving(false)
        updatePosition()
    }

    useEffect(() => {
        particleRef?.current?.addEventListener('transitionstart', event =>
            handleLateralTransitionStart(event),
        )
        particleRef?.current?.addEventListener('transitionend', event =>
            handleLateralTransitionEnd(event),
        )
        particleRef?.current?.addEventListener('animationstart', event =>
            handleVerticalAnimationStart(event),
        )
        particleRef?.current?.addEventListener('animationend', event =>
            handleVerticalAnimationEnd(event),
        )

        return () => {
            particleRef?.current?.removeEventListener(
                'transitionstart',
                handleLateralTransitionStart,
            )
            particleRef?.current?.removeEventListener(
                'transitionend',
                handleLateralTransitionEnd,
            )
            particleRef?.current?.removeEventListener(
                'animationstart',
                handleVerticalAnimationStart,
            )
            particleRef?.current?.removeEventListener(
                'animationiteration',
                handleVerticalAnimationEnd,
            )
        }
    }, [showSnowflake])

    return (
        <>
            {!!showSnowflake && (
                <div
                    className={`snow-particle fixed z-20 ${getAnimationClass(data.size)}`}
                    ref={particleRef}
                    style={{
                        left: `${data?.style?.left}px`,
                        transition: `left ${getTransitionDuration(data?.size, windState?.strength)} ease-out`,
                    }}
                >
                    <SnowflakeIcon data={data} />
                </div>
            )}
        </>
    )
}

export default Snowflake
