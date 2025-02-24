import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { isTokenExpired, getAccessToken } from '@lib/services/fetchWrapper'
import { StoreContextType } from '@@types/store'
import { StoreContext } from '@components/Context/context'

function ProtectedRoute() {
    const isAuthenticated = useAuth()
    const { setLoggedIn, setUsername, setShoppingCartProducts } =
        React.useContext(StoreContext) as StoreContextType

    const navigate = useNavigate()
    const token = getAccessToken()

    const isTokenValid = (token: string) => {
        if (token) {
            if (isTokenExpired(token)) {
                console.log('⚠️  Expired token')
                return false
            } else {
                console.log('✅  Valid token')
                return true
            }
        }
    }

    function logOutToLogin() {
        localStorage.removeItem('accessToken')
        console.log('user has been logged out')
        setLoggedIn(false)
        setUsername('')
        setShoppingCartProducts([])
    }

    React.useEffect(() => {
        console.log('authed', isAuthenticated)
        if (token) {
            if (isTokenValid(token)) return
            else {
                logOutToLogin()
                navigate('/login')
            }
        }
        if (!isAuthenticated) navigate('/login')
        console.log('Protecting')
    }, [])

    return <Outlet />
}

export default ProtectedRoute
