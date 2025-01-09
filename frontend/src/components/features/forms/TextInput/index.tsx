type TextInputProps = {
    name: string
    content: string
    showLabel?: boolean
}
function TextInput({ name, content, showLabel = true }: TextInputProps) {
    const inputStyle = `border border-gray-400 rounded-lg px-4 py-2 outline-none font-normal w-full max-w-full}`
    return (
        <>
            <label
                htmlFor='address'
                className={`flex flex-wrap py-2 font-semibold ${showLabel ? '' : 'absolute top-1/4 left-1/4 w-6'}`}
            >
                {showLabel && name}
            </label>
            <input
                className={inputStyle}
                id={name}
                type='text'
                placeholder={content}
                value={content}
            />
        </>
    )
}

export default TextInput
