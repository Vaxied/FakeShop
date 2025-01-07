import React from 'react'
import SignUpForm from '@features/forms/signUp/SignUpForm'
import useAuth from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const isAuthenticated = useAuth()
    const navigate = useNavigate()
    React.useEffect(() => {
        console.log('logged?', isAuthenticated())
        if (isAuthenticated()) navigate('/')
    }, [])
    if (!isAuthenticated()) return <SignUpForm />
}

export default SignUp
