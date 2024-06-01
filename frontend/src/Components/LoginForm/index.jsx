/* eslint-disable no-debugger */
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { postData } from '../../services/fetchWrapper'
import { StoreContext } from '../../Context/context'

function LoginForm() {
    // debugger
    const { setLoggedIn, setUsername, setCookie } =
        React.useContext(StoreContext)
    const navigate = useNavigate()
    const [formState, setFormState] = React.useState({
        username: '',
        password: '',
    })

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(formState)
        const response = await postData('http://localhost:5600/auth', formState)
        console.log('response.status', response.status)
        if (!response) console.log('no response')
        // console.log('🚀 ~ handleSubmit ~ response:', response.status)
        else if (response.status !== 201)
            navigate('/login') //show error message
        else {
            console.log('loggin in')
            setLoggedIn(true)
            setUsername(response.username)
            localStorage.setItem('accessToken', response.token)
            setCookie('refreshToken', response.refresh)
            navigate('/')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-[400px] h-[calc(100vh-134px)]'>
            <form
                onSubmit={(event) => handleSubmit(event)}
                className='flex flex-col w-full justify-center rounded-lg border border-gray-300 p-8 bg-gray-100'
            >
                <p className='font-bold text-lg text-center'>Sign In</p>
                <label htmlFor='username' className='py-2 font-semibold'>
                    username
                </label>
                <input
                    id='username'
                    type='text'
                    name='username'
                    value={formState.username}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            username: event.target.value,
                        })
                    }
                    placeholder='something@domain.tld'
                    className='border border-gray-400 rounded-lg mb-6 px-4 py-2 outline-none w-full'
                />
                <label htmlFor='password' className='py-2 font-semibold'>
                    password
                </label>
                <input
                    id='password'
                    type='password'
                    placeholder='**********'
                    name='password'
                    value={formState.password}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            password: event.target.value,
                        })
                    }
                    className='border border-gray-400 rounded-lg mb-6 px-4 py-2 outline-none w-full'
                />
                <p className='text-end mb-6'>
                    <NavLink>Forgot password</NavLink>
                </p>
                <button
                    className='border border-gray px-4 py-2 w-full bg-black
                    text-white rounded-lg'
                    type='submit'
                >
                    Login
                </button>
            </form>
            <p className='flex py-4 text-gray-700 font-light'>
                <span>Don&apos;t have an account?</span>
                <Link to={'/sign-up'}>
                    <span className='pl-2 font-semibold'>Sign up!</span>
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
