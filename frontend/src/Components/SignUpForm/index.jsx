import React from 'react'
import useForms from '../../Hooks/useForms'
import TextInputBase from '../TextInputBase'

function SignUpForm() {
    const {
        handleSubmit,
        isNameValid,
        isEmailValid,
        isPasswordValid,
        arePasswordsEqual,
    } = useForms()

    const [formState, setFormState] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmedPassword: '',
    })

    const [showInputErr, setShowInputErr] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        diffPassword: false,
    })

    const inputProps = [
        {
            id: 'first-name',
            name: 'firstName',
            label: 'first name',
            type: 'text',
            placeholder: 'First Name',
            value: 'firstName',
            inputErr: '* Please input letters only',
            validationFunc: isNameValid,
        },
        {
            id: 'last-name',
            name: 'lastName',
            label: 'last name',
            type: 'text',
            placeholder: 'Last Name',
            value: 'lastName',
            inputErr: '* Please input letters only',
            validationFunc: isNameValid,
        },
        {
            id: 'email',
            name: 'email',
            label: 'email',
            type: 'text',
            placeholder: 'something@domain.tld',
            value: 'email',
            inputErr: '* Please input a valid email format.',
            validationFunc: isEmailValid,
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
        },
        {
            id: 'confirm-password',
            name: 'confirm-password',
            type: 'password',
            label: 'confirm password',
            placeholder: '********',
            maxLength: 20,
            value: 'confirmedPassword',
            inputErr: 'Passwords must be equal.',
            validationFunc: arePasswordsEqual,
        },
    ]
    const stateProps = {
        formState: formState,
        setFormState: setFormState,
        showInputErr: showInputErr,
        setShowInputErr: setShowInputErr,
    }

    return (
        <div className='flex flex-col items-center justify-center w-[500px]'>
            {/* h-[calc(100vh-134px)] */}
            <form
                className='flex flex-col w-full justify-center rounded-lg border border-gray-300 p-8 bg-gray-100'
                onSubmit={(event) =>
                    handleSubmit(event, formState, showInputErr)
                }
            >
                <p className='font-bold text-lg text-center'>Sign Up</p>
                {inputProps.map((object) => (
                    <TextInputBase
                        inputProps={object}
                        stateProps={stateProps}
                        key={object.id}
                    />
                ))}
                <button
                    className='border border-gray px-4 py-2 w-full mt-8 bg-black
                    text-white rounded-lg'
                    type='submit'
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignUpForm
