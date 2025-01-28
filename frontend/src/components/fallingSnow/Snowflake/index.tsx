import { useEffect, useRef, useState } from 'react'
import SnowflakeIcon from '@components/icons/SnowflakeIcon'

function Snowflake() {
    let particleRef = useRef<HTMLDivElement>(null)
    const [showSnowflake, setShowSnowflake] = useState(false)
    const colors = ['red', 'darkgreen', 'teal', '']
    const pickColor = () => colors[Math.floor(Math.random() * colors.length)]
    const delayBetweenRenders = Math.random() * 10000

    const regenerateData = () => {
        const size = generateSize()
        const style = {
            left: generateXCoord(),
            opacity: generateOpacity(),
        }
        setData({ ...data, size, style, color: pickColor() })
    }

    const delayRender = (delay: number) =>
        setTimeout(() => {
            setShowSnowflake(true)
        }, delay)

    const generateXCoord = () => {
        return window.innerWidth * Math.random()
    }

    const generateSize = () => {
        return Math.floor(Math.random() * 16) + 8
    }

    const generateOpacity = () => {
        return Math.random() * (1 - 0.5) + 0.5
    }

    const [data, setData] = useState({
        size: generateSize(),
        style: { left: generateXCoord(), opacity: generateOpacity() },
        color: pickColor(),
    })

    const getAnimationClass = (size: number) => {
        if (size >= 20) {
            return 'animate-fall-fast'
        } else if (data.size >= 10) {
            return 'animate-fall-med'
        } else {
            return 'animate-fall-slow'
        }
    }

    const handleVerticalAnimationStart = () => {
        setShowSnowflake(true)
    }

    const handleVerticalAnimationEnd = () => {
        setShowSnowflake(false)
        regenerateData()
        wobble.current = 0
    }

    const swayFactor = data.size >= 20 ? 0.3 : data.size >= 16 ? 0.6 : 1
    const wobble = useRef(0)
    const moveLaterally = () => {
        wobble.current += 0.02
        if (particleRef.current) {
            particleRef.current.style.left =
                parseFloat(particleRef.current.style.left) +
                Math.sin(wobble.current) * 2 * swayFactor +
                'px'

            if (
                particleRef?.current?.getBoundingClientRect().top <
                window.innerHeight
            )
                requestAnimationFrame(moveLaterally)
        }
    }

    useEffect(() => {
        if (!showSnowflake) {
            delayRender(delayBetweenRenders)
        }
        particleRef?.current?.addEventListener('animationstart', () =>
            handleVerticalAnimationStart(),
        )
        particleRef?.current?.addEventListener('animationend', () =>
            handleVerticalAnimationEnd(),
        )
        const animateLaterally = requestAnimationFrame(moveLaterally)

        return () => {
            particleRef?.current?.removeEventListener(
                'animationstart',
                handleVerticalAnimationStart,
            )
            particleRef?.current?.removeEventListener(
                'animationiteration',
                handleVerticalAnimationEnd,
            )
            cancelAnimationFrame(animateLaterally)
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
                        opacity: data.style.opacity,
                    }}
                >
                    <SnowflakeIcon data={data} />
                </div>
            )}
        </>
    )
}

export default Snowflake
