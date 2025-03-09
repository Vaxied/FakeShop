/* eslint-disable no-debugger */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '@lib/services/fetchWrapper'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import ActionButton from '@components/common/buttons/ActionButton'
import useForms from '@hooks/useForms'
import TextInputBase from '@components/forms/TextInputBase'
import {
    FormState,
    ShowInputErr,
} from '@components/forms/TextInputBase/Interfaces'

function LoginForm() {
    // debugger
    const { setLoggedIn, setUsername } = React.useContext(
        StoreContext,
    ) as StoreContextType
    const navigate = useNavigate()
    const { labelBgStyleColor } = useForms()
    const [formState, setFormState] = React.useState<FormState>({
        username: '',
        password: '',
    })
    const [isLoginErr, setIsLoginErr] = React.useState(false)
    const API = import.meta.env.VITE_API
    const errMsg = 'Invalid username or password'

    const inputProps = [
        {
            id: 'username',
            name: 'username',
            label: 'username',
            type: 'text',
            placeholder: 'something@domain.tld',
            value: 'username',
            labelBgColor: labelBgStyleColor,
        },
        {
            id: 'password',
            name: 'password',
            label: 'password',
            type: 'password',
            placeholder: '**********',
            value: 'password',
            labelBgColor: labelBgStyleColor,
        },
    ]

    const [showInputErr, setShowInputErr] = useState<ShowInputErr>({
        username: false,
        password: false,
    })

    const stateProps = {
        formState,
        setFormState,
        showInputErr,
        setShowInputErr,
    }

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
                id='login-form'
                onSubmit={event => handleLogin(event)}
                className='flex flex-col w-full justify-center rounded-lg border border-teal-300 p-8 bg-container'
            >
                <p className='font-bold text-lg text-center text-secondary pb-8'>
                    Sign In
                </p>

                <div className='flex flex-col gap-8 pb-4 text-lg'>
                    {inputProps.map((inputField: any) => {
                        return (
                            <TextInputBase
                                inputProp={inputField}
                                stateProps={stateProps}
                                labelBgColor={inputField.labelBgColor}
                            />
                        )
                    })}
                </div>

                {/* <InputError errMsg={errMsg} condition={isLoginErr} /> */}
                {isLoginErr && (
                    <div className='text-center text-red-500 pb-4'>
                        {errMsg}
                    </div>
                )}

                <div className='text-secondary text-end pb-8'>
                    {/* <NavLink>Forgot password</NavLink> */}
                    <Link to={'/'}>Forgot password</Link>
                </div>
                <div className='w-full flex justify-center'>
                    <ActionButton
                        text={'Login'}
                        type='submit'
                        action={undefined}
                        route={undefined}
                    />
                </div>
            </form>
            <p className='flex py-4 text-gray-700'>
                <span>Don&apos;t have an account?</span>
                <Link to={'/sign-up'}>
                    <span className='text-secondary pl-2 font-semibold'>
                        Sign up!
                    </span>
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
