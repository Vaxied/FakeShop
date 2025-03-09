import React, { useEffect } from 'react'
import {
    InputProp,
    StateProps,
} from '@components/forms/TextInputBase/Interfaces'

type props = {
    inputProp: InputProp
    stateProps: StateProps
    labelBgColor?: labelBgColor
}

type labelBgColor = string | undefined

function TextInputBase(props: Readonly<props>) {
    const {
        inputProp,
        stateProps,
        labelBgColor = 'bg-gradient-to-b from-gray-100 from-55% to-white to-55%',
    } = props

    const [moveLabel, setMoveLabel] = React.useState(false)
    const [changeLabelBgColor, setChangeLabelBgColor] = React.useState(false)

    const bgDelay = 100
    const transitionDurationClass = 'duration-150'

    const updateBgColorWithDelay = (bool: boolean, delay = 0) => {
        setTimeout(() => {
            setChangeLabelBgColor(bool)
            console.log('changeLabelBgColor', bool)
        }, delay)
    }

    const determineLabelContent = () => {
        if (stateProps.formState[inputProp.value] && !moveLabel) {
            return ''
        }
        if (
            (stateProps.formState[inputProp.value] && moveLabel) ||
            (!stateProps.formState[inputProp.value] && moveLabel)
        ) {
            return inputProp.label
        } else if (!stateProps.formState[inputProp.value] && !moveLabel) {
            return inputProp.placeholder ?? inputProp.label
        } else {
            return ''
        }
    }

    useEffect(() => {
        if (moveLabel && !stateProps.formState[inputProp.value])
            updateBgColorWithDelay(true, bgDelay)
        else if (moveLabel && stateProps.formState[inputProp.value])
            updateBgColorWithDelay(true)
        else updateBgColorWithDelay(false)
    }, [moveLabel])

    return (
        <div className='relative'>
            <label
                htmlFor={inputProp.id}
                className={`block leading-none absolute transition-all px-2 left-4 -translate-y-1/2 ${transitionDurationClass} ${moveLabel ? 'top-0 text-secondary font-semibold text-xs' : 'text-gray-500 top-1/2 cursor-text'} ${changeLabelBgColor ? labelBgColor : ''} ${stateProps.formState[inputProp.value] ? 'transition-none' : ''}`}
            >
                {determineLabelContent()}
            </label>
            <div>
                <div className={`bg-white rounded-lg`}>
                    <input
                        id={inputProp?.id}
                        name={inputProp?.name}
                        type={inputProp.type ?? 'text'}
                        onFocus={() => setMoveLabel(true)}
                        onBlur={() => setMoveLabel(false)}
                        onChange={event => {
                            stateProps.setFormState({
                                ...stateProps?.formState,
                                [inputProp.value]: event.target.value,
                            })
                            if (
                                inputProp.validationFunc &&
                                inputProp.inputErr
                            ) {
                                stateProps.setShowInputErr &&
                                    stateProps.setShowInputErr({
                                        ...stateProps?.showInputErr,
                                        [inputProp.value]:
                                            !inputProp?.validationFunc(
                                                event.target.value,
                                            ),
                                    })
                            }
                        }}
                        value={stateProps?.formState[inputProp.value]}
                        className={`border-2 border-white outline-none focus:border-secondary hover:cursor-text focus:border-2 rounded-lg px-4 py-2 w-full text-gray-500 ${stateProps.showInputErr && stateProps.showInputErr[inputProp.value] ? 'border-red-500' : ''} hover:border-2 hover:border-accent`}
                    />
                </div>
                {inputProp.inputErr &&
                typeof inputProp?.inputErr === 'string' ? (
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
                        {inputProp.inputErr &&
                            typeof inputProp.inputErr === 'object' &&
                            Object.values(inputProp.inputErr).map(err => (
                                <span>* {err}</span>
                            ))}
                    </p>
                )}
            </div>
        </div>
    )
}

export default TextInputBase
