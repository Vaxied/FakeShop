import Card from '../../Components/Card'
import CardsWrapper from '../../Components/CardsWrapper'
import useApi from '../../Hooks/useApi'

function Home() {
    const { items } = useApi() || null
    console.log(!items)
    if (!items) return null
    return (
        <CardsWrapper>
            {items.map((item, index) => (
                <Card key={index} items={items} index={index} product={item} />
            ))}
        </CardsWrapper>
    )
}

export default Home
