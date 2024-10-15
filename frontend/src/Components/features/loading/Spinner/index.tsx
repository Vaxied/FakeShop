function Spinner(props: Readonly<{ size: string | undefined }>) {
    const { size } = props
    return (
        <div className='w-full h-[60px] flex items-center justify-center'>
            <div
                className={`${
                    size ? `w-${size} h-${size}` : 'w-8 h-8'
                } border-gray-100 border-4 rounded-full border-t-gray-600 border-r-gray-600 animate-spin`}
            ></div>
        </div>
    )
}

export default Spinner
