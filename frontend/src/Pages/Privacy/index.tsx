import React from 'react'
import { StoreContext } from '../../Components/Context/context'
import { StoreContextType } from '../../@types/store'
import StaticText from '../../Components/features/navigation/StaticText'
function Privacy() {
    const { policy } = React.useContext(StoreContext) as StoreContextType

    return (
        <div className='max-w-[1200px] pr-[25%] pl-[10%]'>
            <StaticText responseText={policy} />
        </div>
    )
}

export default Privacy
