import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

function ProtectedRoute() {
    const isAuthenticated = useAuth()
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!isAuthenticated()) navigate('/login')
        console.log('Protecting')
    }, [])
    return <Outlet />
}

export default ProtectedRoute
