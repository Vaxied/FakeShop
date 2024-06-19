import React from 'react'
import useForms from '../../Hooks/useForms'

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

    const inputErrMsgs = {
        invalidName: '* Please input letters only.',
        invalidEmail: '* Please input a valid email format.',
        invalidPassword: {
            length: '* Minimum 8 characters long',
            uppercase: '* At least one uppercase character',
            lowercase: '* At least one lowercase character',
            special: '* At least one special character',
        },
        differentPasswords: 'Passwords must be equal.',
    }

    const [showInputErr, setShowInputErr] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        diffPassword: false,
    })

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
                <label htmlFor='first-name' className='py-2 font-semibold'>
                    name
                </label>
                <div className='relative mb-2'>
                    <input
                        id='first-name'
                        name='firstName'
                        type='text'
                        placeholder='First Name'
                        value={formState.username}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                firstName: event.target.value,
                            })
                            setShowInputErr({
                                ...showInputErr,
                                firstName: !isNameValid(event.target.value),
                            })
                            console.log(isNameValid(event.target.value))
                        }}
                        className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                    />
                    <span
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    showInputErr.firstName ? 'block' : 'hidden'
                }`}
                    >
                        {inputErrMsgs.invalidName}
                    </span>{' '}
                </div>
                <label htmlFor='username' className='py-2 font-semibold'>
                    last name
                </label>
                <div className='relative mb-2'>
                    <input
                        id='last-name'
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                        value={formState.lastName}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                lastName: event.target.value,
                            })
                            setShowInputErr({
                                ...showInputErr,
                                lastName: !isNameValid(event.target.value),
                            })
                        }}
                    />
                    <span
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    showInputErr.lastName ? 'block' : 'hidden'
                }`}
                    >
                        {inputErrMsgs.invalidName}
                    </span>
                </div>
                <label htmlFor='email' className='py-2 font-semibold'>
                    e-mail
                </label>
                <div className='relative mb-2'>
                    <input
                        id='email'
                        type='text'
                        name='email'
                        value={formState.email}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                email: event.target.value,
                            })
                            setShowInputErr({
                                ...showInputErr,
                                email: !isEmailValid(event.target.value),
                            })
                        }}
                        placeholder='something@domain.tld'
                        className='border border-gray-400 rounded-lg  mb-4 px-4 py-2 outline-none w-full'
                    />
                    <span
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    showInputErr.email ? 'block' : 'hidden'
                }`}
                    >
                        {inputErrMsgs.invalidEmail}
                    </span>
                </div>
                <label htmlFor='password' className='py-2 font-semibold'>
                    password
                </label>
                <div
                    className={`relative ${
                        showInputErr.password ? 'pb-16 mb-2' : 'mb-2'
                    }`}
                >
                    <input
                        id='password'
                        type='password'
                        name='password'
                        placeholder='**********'
                        // minLength={8}
                        maxLength={20}
                        value={formState.password}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                password: event.target.value,
                            })
                            setShowInputErr({
                                ...showInputErr,
                                password: !isPasswordValid(event.target.value),
                            })
                        }}
                        className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                    />
                    <p
                        className={`after:content-[""] block text-red-500 absolute
                bottom-[-8px] left-2 text-sm ${
                    showInputErr.password ? 'flex flex-col' : 'hidden'
                }`}
                    >
                        <span>{inputErrMsgs.invalidPassword.length}</span>
                        <span>{inputErrMsgs.invalidPassword.uppercase}</span>
                        <span>{inputErrMsgs.invalidPassword.lowercase}</span>
                        <span>{inputErrMsgs.invalidPassword.special}</span>
                    </p>
                </div>
                <label htmlFor='password' className='py-2 font-semibold'>
                    confirm password
                </label>
                <div className='relative mb-2'>
                    <input
                        id='confirm-password'
                        type='password'
                        placeholder='**********'
                        // minLength={8}
                        maxLength={20}
                        className='border border-gray-400 rounded-lg mb-4 px-4 py-2 outline-none w-full'
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                confirmedPassword: event.target.value,
                            })
                            setShowInputErr({
                                ...showInputErr,
                                diffPassword: !arePasswordsEqual(
                                    event.target.value,
                                    formState.password
                                ),
                            })
                        }}
                    />
                    <p
                        className={`after:content-[""] block text-red-500 absolute
                        bottom-[-8px] left-2 text-sm ${
                            showInputErr.diffPassword ? 'block' : 'hidden'
                        }`}
                    >
                        {inputErrMsgs.differentPasswords}
                    </p>
                </div>
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
