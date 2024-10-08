import React from 'react'
import LoginForm from '../../Components/LoginForm'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'

function Login() {
    const isAuthenticated = useAuth()
    const navigate = useNavigate()
    React.useEffect(() => {
        console.log('logged?', isAuthenticated())
        if (isAuthenticated()) navigate('/')
    }, [])
    if (!isAuthenticated()) return <LoginForm />
}

export default Login
