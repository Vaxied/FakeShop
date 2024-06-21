import React from 'react'
function TextInputBase(props) {
    const { inputProps, stateProps } = props
    console.log('input props:', inputProps)
    console.log('state props:', stateProps)
    return (
        <>
            <label htmlFor={inputProps.id} className='py-2 font-semibold'>
                {inputProps?.label}
            </label>
            <div
                className={`relative ${
                    stateProps?.showInputErr.password &&
                    inputProps?.id === 'password'
                        ? 'pb-16 mb-2'
                        : 'mb-2'
                }`}
            >
                <input
                    id={inputProps?.id}
                    name={inputProps?.name}
                    type={inputProps?.type}
                    placeholder={inputProps?.placeholder}
                    onChange={(event) => {
                        stateProps.setFormState({
                            ...stateProps?.formState,
                            [inputProps.value]: event.target.value,
                        })
                        stateProps.setShowInputErr({
                            ...stateProps?.showInputErr,
                            [inputProps.value]: !inputProps.validationFunc(
                                event.target.value
                            ),
                        })
                    }}
                    className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                />
                {typeof inputProps?.inputErr === 'string' && (
                    <span
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    stateProps.showInputErr[inputProps.value]
                        ? 'block'
                        : 'hidden'
                }`}
                    >
                        {inputProps?.inputErr}
                    </span>
                )}
                {typeof inputProps?.inputErr === 'object' && (
                    <p
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    stateProps.showInputErr?.password
                        ? 'flex flex-col'
                        : 'hidden'
                }`}
                    >
                        <span>{inputProps?.inputErr.length}</span>
                        <span>{inputProps?.inputErr.uppercase}</span>
                        <span>{inputProps?.inputErr.lowercase}</span>
                        <span>{inputProps?.inputErr.special}</span>
                    </p>
                )}
            </div>
        </>
    )
}

export default TextInputBase
