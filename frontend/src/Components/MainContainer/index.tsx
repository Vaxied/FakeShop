import React from 'react'
type props = { children: React.ReactNode }
import { StoreContext } from '../../Context/context'
import Loader from '../Loader'
import { StoreContextType } from '../../@types/store'
import useApi from '../../Hooks/useApi'

function MainContainer({ children }: Readonly<props>) {
    const { isLoading, setIsLoading } = React.useContext(
        StoreContext
    ) as StoreContextType
    useApi()
    React.useEffect(() => {
        console.log('stopped loading')
        setTimeout(() => setIsLoading(false), 500)
    }, [isLoading])

    return (
        <div className='w-full flex flex-wrap justify-center p-8 min-h-[calc(100vh-70px)]'>
            {isLoading && <Loader />}
            {children}
        </div>
    )
}

export default MainContainer
