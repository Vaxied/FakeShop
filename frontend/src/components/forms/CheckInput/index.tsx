function CheckInput(
    props: Readonly<{
        id?: string
        name: string
        content: string | string[]
        index: number
    }>,
) {
    const { id, name, content, index } = props
    return (
        <>
            <input
                id={id}
                name={name}
                type='radio'
                defaultChecked={index === 0}
                readOnly={true}
                value={content}
                className='border rounded-full hover:cursor-pointer'
            />
            {typeof content === 'string' ? (
                <label htmlFor={name}>{content}</label>
            ) : (
                <label htmlFor={name}>
                    {content.map(element => (
                        <span className='block'>{element}</span>
                    ))}
                </label>
            )}
        </>
    )
}

export default CheckInput
