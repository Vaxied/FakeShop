import React from 'react'
import { StoreContext } from '@components/Context/context'
import Loader from '@features/loading/Loader'
import { StoreContextType } from '@@types/store'
import useApi from '@hooks/useApi'

type props = { children: React.ReactNode }

function MainContainer({ children }: Readonly<props>) {
    const { isLoading, setIsLoading } = React.useContext(
        StoreContext,
    ) as StoreContextType
    useApi()
    React.useEffect(() => {
        console.log('stopped loading')
        if (isLoading) setTimeout(() => setIsLoading(false), 1000)
    }, [isLoading])

    return (
        <div className='max-w-6xl flex flex-wrap justify-center p-4 md:p-8 min-h-[calc(100vh-70px)] mx-auto'>
            {isLoading && <Loader />}
            {children}
        </div>
    )
}

export default MainContainer
