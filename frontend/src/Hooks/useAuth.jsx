import React from 'react'
import { StoreContext } from '../Context/context'
function useAuth() {
    const { loggedIn } = React.useContext(StoreContext)

    function isAuthenticated() {
        return loggedIn
    }

    return isAuthenticated
}

export default useAuth
