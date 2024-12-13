import React from 'react'
import { StoreContextType } from '@@types/store'
import { StoreContext } from '@components/Context/context'
import StaticText from '@components/features/navigation/StaticText'
function Privacy() {
    const { policy } = React.useContext(StoreContext) as StoreContextType
    return (
        <div
            id='privacy-container'
            className='max-w-[1200px] pr-[25%] pl-[10%]'
        >
            <StaticText responseText={policy} />
            {/* {content.map((element) => element)} */}
        </div>
    )
}

export default Privacy
