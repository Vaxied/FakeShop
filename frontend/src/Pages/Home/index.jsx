import React from 'react'
import Card from '../../Components/Card'
import CardsWrapper from '../../Components/CardsWrapper'
import { StoreContext } from '../../Context/context'
import useApi from '../../Hooks/useApi'

function Home() {
    const { items } = useApi() || null
    if (!items) return null
    const { closeCartSideMenu } = React.useContext(StoreContext)
    React.useEffect(() => {
        closeCartSideMenu()
    }, [])
    return (
        <CardsWrapper>
            {items.map((item, index) => (
                <Card key={index} items={items} index={index} product={item} />
            ))}
        </CardsWrapper>
    )
}

export default Home
