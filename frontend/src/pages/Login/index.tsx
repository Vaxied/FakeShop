import React from 'react'
import LoginForm from '@components/forms/login/LoginForm'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

function Login() {
    const isAuthenticated = useAuth()
    const navigate = useNavigate()

    // Redirect to home page if user is already logged in
    React.useEffect(() => {
        console.log('isAuthenticated', isAuthenticated)
        if (isAuthenticated) navigate('/')
    }, [isAuthenticated])

    return <LoginForm />
}

export default Login
