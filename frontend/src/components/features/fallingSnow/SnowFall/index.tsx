import Snowflake from '@features/fallingSnow/Snowflake'

function SnowFall() {
    const particleNumber = 50
    const particles = Array.from({ length: particleNumber })
    const showSnowFall = false

    return (
        <>
            {showSnowFall &&
                particles.map((particle, index: number) => (
                    <Snowflake key={index} />
                ))}
        </>
    )
}

export default SnowFall
