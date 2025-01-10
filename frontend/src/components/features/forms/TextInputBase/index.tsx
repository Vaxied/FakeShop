import React from 'react'
import { InputProp, StateProps } from '@features/forms/TextInputBase/Interfaces'

type props = {
    inputProp: InputProp
    stateProps: StateProps
    showLabel?: boolean
}

function TextInputBase(props: Readonly<props>) {
    const { inputProp, stateProps, showLabel = true } = props
    // console.log('state props:', stateProps)
    return (
        <div className='relative'>
            <label
                htmlFor={inputProp.id}
                className={`block pb-1 font-semibold ${showLabel ? '' : 'absolute top-1/4 left-1/4 w-6'}`}
            >
                {showLabel && inputProp.label}
            </label>
            <input
                id={inputProp?.id}
                name={inputProp?.name}
                type={inputProp.type ?? 'text'}
                placeholder={inputProp?.placeholder}
                onChange={event => {
                    stateProps.setFormState({
                        ...stateProps?.formState,
                        [inputProp.value]: event.target.value,
                    })
                    stateProps.setShowInputErr({
                        ...stateProps?.showInputErr,
                        [inputProp.value]: !inputProp?.validationFunc(
                            event.target.value,
                        ),
                    })
                }}
                className={`border border-gray-400 rounded-lg text-sm px-2 py-2 outline-none w-full ${stateProps.showInputErr[inputProp.value] ? 'border-red-500' : ''}`}
            />
            {typeof inputProp?.inputErr === 'string' ? (
                <span
                    className={`pl-2 pt-2 block text-red-500
                 text-xs ${
                     stateProps.showInputErr[inputProp.value]
                         ? 'block'
                         : 'hidden'
                 }`}
                >
                    * {inputProp?.inputErr}
                </span>
            ) : (
                <p
                    className={`pl-2 pt-2 flex flex-col text-red-500
                 text-xs ${
                     stateProps.showInputErr[inputProp.value]
                         ? 'block'
                         : 'hidden'
                 }`}
                >
                    {Object.values(inputProp.inputErr).map(err => (
                        <span>* {err}</span>
                    ))}
                </p>
            )}
        </div>
    )
}

export default TextInputBase
