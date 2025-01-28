import React from 'react'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import StaticText from '@components/navigation/StaticText'

function TermsAndConditions() {
    const { terms } = React.useContext(StoreContext) as StoreContextType

    return (
        <div className='max-w-[1200px] pr-[25%] pl-[10%]'>
            <StaticText responseText={terms} />
        </div>
    )
}

export default TermsAndConditions
