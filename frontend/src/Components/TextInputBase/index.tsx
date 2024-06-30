import React from 'react'
import { InputProp, StateProps } from '../SignUpForm/Interfaces'

type props = {
    inputProp: InputProp
    stateProps: StateProps
}

function TextInputBase(props: props) {
    const { inputProp, stateProps } = props
    console.log('state props:', stateProps)
    return (
        <>
            <label htmlFor={inputProp.id} className='py-2 font-semibold'>
                {inputProp?.label}
            </label>
            <div
                className={`relative ${
                    stateProps?.showInputErr.password &&
                    inputProp?.id === 'password'
                        ? 'pb-16 mb-2'
                        : 'mb-2'
                }`}
            >
                <input
                    id={inputProp?.id}
                    name={inputProp?.name}
                    type={inputProp?.type}
                    placeholder={inputProp?.placeholder}
                    onChange={(event) => {
                        stateProps.setFormState({
                            ...stateProps?.formState,
                            [inputProp.value]: event.target.value,
                        })
                        stateProps.setShowInputErr({
                            ...stateProps?.showInputErr,
                            [inputProp.value]: !inputProp.validationFunc(
                                event.target.value
                            ),
                        })
                    }}
                    className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                />
                {typeof inputProp?.inputErr === 'string' && (
                    <span
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    stateProps.showInputErr[inputProp.value]
                        ? 'block'
                        : 'hidden'
                }`}
                    >
                        {inputProp?.inputErr}
                    </span>
                )}
                {typeof inputProp?.inputErr === 'object' && (
                    <p
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    stateProps.showInputErr?.password
                        ? 'flex flex-col'
                        : 'hidden'
                }`}
                    >
                        <span>{inputProp?.inputErr.length}</span>
                        <span>{inputProp?.inputErr.uppercase}</span>
                        <span>{inputProp?.inputErr.lowercase}</span>
                        <span>{inputProp?.inputErr.special}</span>
                    </p>
                )}
            </div>
        </>
    )
}

export default TextInputBase
