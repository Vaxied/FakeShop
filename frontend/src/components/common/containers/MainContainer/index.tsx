import React from 'react'
import { StoreContext } from '@components/Context/context'
import Loader from '@components/loading/Loader'
import { StoreContextType } from '@@types/store'

type props = { children: React.ReactNode }

function MainContainer({ children }: Readonly<props>) {
    const { isLoading, setIsLoading } = React.useContext(
        StoreContext,
    ) as StoreContextType

    React.useEffect(() => {
        console.log('stopped loading')
        if (isLoading) setTimeout(() => setIsLoading(false), 500)
    }, [isLoading])

    return (
        <div className='max-w-6xl flex flex-wrap justify-center p-4 md:p-8 min-h-[calc(100vh-70px)] mx-auto'>
            {isLoading && <Loader />}
            {children}
        </div>
    )
}

export default MainContainer
