function CheckInput(props: Readonly<{ content: string; index: number }>) {
    const { content, index } = props
    return (
        <>
            <input
                id={content}
                type='checkbox'
                defaultChecked={index === 0}
                readOnly={true}
                value={'Address 1'}
                className='self-start border rounded-full mt-2'
            />
            <label htmlFor='address-1'>{content}</label>
        </>
    )
}

export default CheckInput
