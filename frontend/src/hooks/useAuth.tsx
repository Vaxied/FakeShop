import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
function useAuth() {
    const { loggedIn } = React.useContext(StoreContext) as StoreContextType

    function isAuthenticated() {
        return loggedIn
    }
    return isAuthenticated()
}

export default useAuth
