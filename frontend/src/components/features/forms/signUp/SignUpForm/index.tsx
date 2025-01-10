import React from 'react'
import useForms from '@hooks/useForms'
import TextInputBase from '@features/forms/TextInputBase'
import ActionButton from '@components/buttons/ActionButton'
import {
    FormState,
    InputProp,
    InputProps,
    ShowInputErr,
} from '@features/forms/TextInputBase/Interfaces'

function SignUpForm() {
    const {
        handleSubmit,
        isNameValid,
        isEmailValid,
        isPasswordValid,
        arePasswordsEqual,
    } = useForms()

    const [formState, setFormState] = React.useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmedPassword: '',
    })

    const [showInputErr, setShowInputErr] = React.useState<ShowInputErr>({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        diffPassword: false,
    })

    const inputProps: InputProps = [
        {
            id: 'first-name',
            name: 'firstName',
            label: 'first name',
            placeholder: 'First Name',
            value: 'firstName',
            inputErr: '* Please input letters only',
            validationFunc: isNameValid,
            className: 'pb-2',
        },
        {
            id: 'last-name',
            name: 'lastName',
            label: 'last name',
            placeholder: 'Last Name',
            value: 'lastName',
            inputErr: '* Please input letters only',
            validationFunc: isNameValid,
            className: 'pb-2',
        },
        {
            id: 'email',
            name: 'email',
            label: 'email',
            placeholder: 'something@domain.tld',
            value: 'email',
            inputErr: '* Please input a valid email format',
            validationFunc: isEmailValid,
            className: 'pb-2',
        },
        {
            id: 'password',
            name: 'password',
            label: 'password',
            type: 'password',
            placeholder: '********',
            maxLength: 20,
            value: 'password',
            inputErr: {
                length: '* Minimum 8 characters long',
                uppercase: '* At least one uppercase character',
                lowercase: '* At least one lowercase character',
                special: '* At least one special character',
            },
            validationFunc: isPasswordValid,
            className: 'pb-2',
        },
        {
            id: 'confirm-password',
            name: 'confirm-password',
            type: 'password',
            label: 'confirm password',
            placeholder: '********',
            maxLength: 20,
            value: 'confirmedPassword',
            inputErr: '* Passwords must be equal',
            validationFunc: arePasswordsEqual,
            className: 'pb-2',
        },
    ]

    const stateProps = {
        formState,
        setFormState,
        showInputErr,
        setShowInputErr,
    }

    return (
        <div className='flex flex-col items-center justify-center w-[500px]'>
            <form
                className='flex flex-col w-full justify-center rounded-lg border border-gray-300 p-8 bg-container'
                onSubmit={event => handleSubmit(event, formState, showInputErr)}
            >
                <p className='font-bold text-lg text-center'>Sign Up</p>
                {inputProps.map((inputProp: InputProp) => (
                    <div className='pb-3'>
                        <TextInputBase
                            inputProp={inputProp}
                            stateProps={stateProps}
                            key={inputProp.id}
                        />
                    </div>
                ))}
                <div className='w-full flex justify-center'>
                    <ActionButton
                        text={'Create account'}
                        type='submit'
                        action={undefined}
                        route={undefined}
                    />
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
