function RadioInput(
    props: Readonly<{
        id?: string
        address: any
        name: string
        content: string | string[]
        index: number
        checked: boolean
    }>,
) {
    const { id, name, content, checked } = props
    return (
        <>
            <input
                id={id}
                name={name}
                type='radio'
                readOnly={true}
                value={content}
                className='border rounded-full hover:cursor-pointer'
                checked={checked}
            />
            {typeof content === 'string' ? (
                <label htmlFor={name} className='cursor-pointer'>
                    {content}
                </label>
            ) : (
                <label htmlFor={name} className='cursor-pointer'>
                    {content.map(element => (
                        <span className='block'>{element}</span>
                    ))}
                </label>
            )}
        </>
    )
}

export default RadioInput
