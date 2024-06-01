import React from 'react'
import { postData } from '../../services/fetchWrapper'
import { useNavigate } from 'react-router-dom'

function SignUpForm() {
    const [formState, setFormState] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(formState)
        const response = await postData(`${VITE_API}/register`, formState)
        if (response) navigate('/')
        console.log(response)
    }

    return (
        <div className='flex flex-col items-center justify-center w-[400px] h-[calc(100vh-134px)]'>
            <form
                // onSubmit={(event) => handleSubmit(event)}
                className='flex flex-col w-full justify-center rounded-lg border border-gray-300 p-8 bg-gray-100'
                onSubmit={(event) => handleSubmit(event)}
            >
                <p className='font-bold text-lg text-center'>Sign Up</p>
                <label htmlFor='first-name' className='py-2 font-semibold'>
                    name
                </label>
                <input
                    id='first-name'
                    name='firstName'
                    type='text'
                    placeholder='First Name'
                    value={formState.username}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            firstName: event.target.value,
                        })
                    }
                    className='border border-gray-400 rounded-lg mb-2 px-4 py-2 outline-none w-full'
                />
                <label htmlFor='username' className='py-2 font-semibold'>
                    last name
                </label>
                <input
                    id='last-name'
                    name='lastName'
                    type='text'
                    placeholder='Last Name'
                    className='border border-gray-400 rounded-lg mb-2 px-4 py-2 outline-none w-full'
                    value={formState.lastName}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            lastName: event.target.value,
                        })
                    }
                />
                <label htmlFor='email' className='py-2 font-semibold'>
                    e-mail
                </label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    value={formState.email}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            email: event.target.value,
                        })
                    }
                    placeholder='something@domain.tld'
                    className='border border-gray-400 rounded-lg px-4 py-2 outline-none w-full'
                />
                <label htmlFor='password' className='py-2 font-semibold'>
                    password
                </label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='**********'
                    value={formState.password}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            password: event.target.value,
                        })
                    }
                    className='border border-gray-400 rounded-lg mb-2 px-4 py-2 outline-none w-full'
                />
                <label htmlFor='password' className='py-2 font-semibold'>
                    confirm password
                </label>
                <input
                    id='confirm-password'
                    type='password'
                    placeholder='**********'
                    className='border border-gray-400 rounded-lg mb-2 px-4 py-2 outline-none w-full'
                />
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
