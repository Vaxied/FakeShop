/* eslint-disable no-debugger */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../../../../../services/fetchWrapper'
import { StoreContext } from '../../../../Context/context'
import InputError from '../../InputError'
import { StoreContextType } from '../../../../../@types/store'
import ActionButton from '../../../../buttons/ActionButton'

function LoginForm() {
    // debugger
    const { setLoggedIn, setUsername } = React.useContext(
        StoreContext
    ) as StoreContextType
    const navigate = useNavigate()
    const [formState, setFormState] = React.useState({
        username: '',
        password: '',
    })
    const [isLoginErr, setIsLoginErr] = React.useState(false)
    const API = import.meta.env.VITE_API
    const errMsg = 'Invalid username or password.'
    const inputStyle =
        'border border-gray-400 rounded-lg mb-6 px-4 py-2 outline-none w-full'

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault()
        // console.log(formState)
        const response = await postData(`${API}/auth`, formState)
        // console.log('response', response)
        if (!response) console.log('no response')
        // console.log('🚀 ~ handleSubmit ~ response:', response.status)
        else if (response.status !== 201) {
            setIsLoginErr(true)
            // navigate('/login')
            console.log(response.info) //show error message
        } else {
            console.log('loggin in')
            setIsLoginErr(false)
            setLoggedIn(true)
            setUsername(response.firstName)
            localStorage.setItem('accessToken', response.token)
            navigate('/')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-[400px] h-[calc(100vh-134px)]'>
            <form
                onSubmit={(event) => handleLogin(event)}
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
                    className={inputStyle}
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
                    className={inputStyle}
                />
                <InputError errMsg={errMsg} condition={isLoginErr} />
                <p className='text-end mb-6'>
                    {/* <NavLink>Forgot password</NavLink> */}
                    <Link to={'/'}>Forgot password</Link>
                </p>
                <div className='w-full flex justify-center'>
                    <ActionButton
                        text={'Login'}
                        type='submit'
                        action={undefined}
                        route={undefined}
                    />
                </div>
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
