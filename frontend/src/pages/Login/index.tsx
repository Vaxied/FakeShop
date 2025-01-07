import React from 'react'
import LoginForm from '@features/forms/login/LoginForm'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

function Login() {
    const isAuthenticated = useAuth()
    const navigate = useNavigate()
    React.useEffect(() => {
        console.log('logged?', isAuthenticated())
        if (isAuthenticated()) navigate('/')
    }, [])
    if (!isAuthenticated()) return <LoginForm />
    else navigate('/')
}

export default Login
