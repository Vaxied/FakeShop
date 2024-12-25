import Snowflake from '@components/icons/Snowflake'
import { ReactElement, useEffect, useRef, useState } from 'react'

type WindData = {
    direction: 'right' | 'left'
    strength: 'light' | 'strong'
}
function SnowFall() {
    const snowParticles = useRef<ReactElement[] | null>([])
    const particleNumber = 30
    const [windState, setWindState] = useState<WindData>({
        direction: 'right',
        strength: 'light'
    })

    function createSnowFallArr() {
        console.log('creating ARR')
        for (let i = 0; i < particleNumber; i++) {
            const data = gererateSnowParticleData()
            snowParticles.current?.push(
                <Snowflake key={i} data={data} windState={windState} />
            )
        }
    }

    function gererateSnowParticleData() {
        const particleData = {
            size: Math.floor(Math.random() * 24),
            xCoordinate: Math.random() * window.innerWidth
        }
        return particleData
    }
    const changeWindDirection = () => {
        const availableWindDirections = ['right', 'left']
        const availableWindForces = ['light', 'strong']
        const direction = availableWindDirections[Math.floor(Math.random() * 2)]
        const strength = availableWindForces[Math.floor(Math.random() * 2)]

        setWindState({ direction: direction, strength: strength } as WindData)
    }
    useEffect(() => {
        const interval = setInterval(changeWindDirection, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    if (!snowParticles.current?.length) createSnowFallArr()

    return <>{snowParticles.current?.map(particle => particle)}</>
}

export default SnowFall
