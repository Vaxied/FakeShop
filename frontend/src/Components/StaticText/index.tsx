import useStaticText from '../../Hooks/useStaticText'

function StaticText(props: Readonly<{ responseText: string }>) {
    const { responseText } = props
    const { styleText, textArr } = useStaticText(responseText)

    return (
        <>
            {textArr.map((text, index) => (
                <p className={styleText(text, index)}>{text}</p>
            ))}
        </>
    )
}

export default StaticText
