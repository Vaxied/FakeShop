import React from 'react'
import {
    InputProp,
    StateProps,
} from '@components/forms/TextInputBase/Interfaces'

type props = {
    inputProp: InputProp
    stateProps: StateProps
    showLabel?: boolean
    labelBgColor?: labelBgColor
}

type labelBgColor = string | undefined

function TextInputBase(props: Readonly<props>) {
    const {
        inputProp,
        stateProps,
        labelBgColor = 'bg-gradient-to-b from-gray-100 from-50% to-white to-50%',
    } = props
    // console.log('state props:', stateProps)
    const [showLabel, setShowLabel] = React.useState(false)
    return (
        <div className='relative'>
            <label
                htmlFor={inputProp.id}
                className={`${labelBgColor} block font-semibold leading-none ${showLabel ? 'absolute -translate-y-1/2 left-3 text-secondary' : 'absolute top-1/4 left-1/4 w-6'}`}
            >
                {showLabel && inputProp.label}
            </label>
            <div className={`bg-white rounded-lg`}>
                <input
                    id={inputProp?.id}
                    name={inputProp?.name}
                    type={inputProp.type ?? 'text'}
                    placeholder={showLabel ? '' : inputProp?.placeholder}
                    onFocus={() => setShowLabel(true)}
                    onBlur={() => setShowLabel(false)}
                    onChange={event => {
                        stateProps.setFormState({
                            ...stateProps?.formState,
                            [inputProp.value]: event.target.value,
                        })
                        stateProps.setShowInputErr &&
                            stateProps.setShowInputErr({
                                ...stateProps?.showInputErr,
                                [inputProp.value]: !inputProp?.validationFunc(
                                    event.target.value,
                                ),
                            })
                    }}
                    className={`border outline-none border-gray-400 focus:border-secondary :focus:border-2 rounded-lg px-4 py-2 w-full text-gray-500 ${stateProps.showInputErr && stateProps.showInputErr[inputProp.value] ? 'border-red-500' : ''}`}
                />
                {typeof inputProp?.inputErr === 'string' &&
                inputProp?.inputErr !== '' ? (
                    <span
                        className={`pl-2 pt-2 block text-red-500
                 text-xs ${
                     stateProps.showInputErr &&
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
                     stateProps.showInputErr &&
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
        </div>
    )
}

export default TextInputBase
