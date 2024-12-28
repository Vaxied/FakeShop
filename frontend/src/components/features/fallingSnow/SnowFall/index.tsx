import Snowflake from '@components/features/fallingSnow/Snowflake'
import { useEffect, useState } from 'react'

type WindData = {
    direction: 'right' | 'left'
    strength: 'light' | 'strong'
}
function SnowFall() {
    const particleNumber = 50
    const particles = Array.from({ length: particleNumber })
    const [windState, setWindState] = useState<WindData>({
        direction: 'right',
        strength: 'light'
    })

    const changeWindDirection = () => {
        const availableWindDirections = ['right', 'left']
        const availableWindForces = ['light', 'strong']
        const direction = availableWindDirections[Math.floor(Math.random() * 2)]
        const strength = availableWindForces[Math.floor(Math.random() * 2)]
        // console.log('new wind state: ', direction, strength)
        const newWindState = { direction: direction, strength: strength }
        setWindState(newWindState as WindData)
    }
    useEffect(() => {
        const interval = setInterval(changeWindDirection, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <>
            {particles.map((particle, index: number) => (
                <Snowflake key={index} windState={windState} />
            ))}
        </>
    )
}

export default SnowFall
