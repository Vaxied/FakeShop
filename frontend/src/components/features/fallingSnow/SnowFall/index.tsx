import Snowflake from '@components/features/fallingSnow/Snowflake'

function SnowFall() {
    const particleNumber = 50
    const particles = Array.from({ length: particleNumber })

    return (
        <>
            {particles.map((particle, index: number) => (
                <Snowflake key={index} />
            ))}
        </>
    )
}

export default SnowFall
