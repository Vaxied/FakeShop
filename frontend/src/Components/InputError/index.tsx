type props = { errMsg: string | object; condition: boolean }
function ErrorMsg({ errMsg, condition }: Readonly<props>) {
    console.log('input err check', errMsg, condition)
    return (
        <div
            className={`flex w-full justify-center items-center relative ${
                typeof errMsg === 'object' ? 'pb-16 mb-4' : 'mb-4'
            }`}
        >
            {typeof errMsg === 'string' && (
                <span
                    className={`text-red-500 
                text-sm ${condition ? 'block' : 'hidden'}`}
                >
                    {errMsg}
                </span>
            )}
            {typeof errMsg === 'object' && (
                <p
                    className={`text-red-500
                text-sm ${condition ? 'flex flex-col' : 'hidden'}
                `}
                >
                    {Object.values(errMsg).map((value: any) => (
                        <span key={value}>{value}</span>
                    ))}
                </p>
            )}
        </div>
    )
}

export default ErrorMsg
