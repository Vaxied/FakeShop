import React from 'react'
import Card from '../../Components/Card'
import CardsWrapper from '../../Components/CardsWrapper'
import { StoreContext } from '../../Context/context'
import useApi from '../../Hooks/useApi'
import ProductSearchBar from '../../Components/ProductSearchBar'
import { useLocation } from 'react-router-dom'

function Home() {
    const {
        closeCartSideMenu,
        filterItems,
        searchByTitle,
        setSearchByTitle,
        productCategories,
    } = React.useContext(StoreContext)
    const { items } = useApi() || null
    if (!items) return null
    React.useEffect(() => {
        closeCartSideMenu()
        setSearchByTitle('')
    }, [])
    const location = useLocation().pathname
    const category = location.split('/')[2]
    console.log('category', productCategories[category])
    console.log('location', location)

    let filteredItems = items
    if (category && productCategories[category]) {
        filteredItems = filterItems(searchByTitle, productCategories[category])
    } else if (searchByTitle) filteredItems = filterItems(searchByTitle)
    else filteredItems = [...items]

    return (
        <>
            <div className='flex flex-col'>
                <ProductSearchBar
                    searchByTitle={searchByTitle}
                    setSearchByTitle={setSearchByTitle}
                />
                <CardsWrapper>
                    {!filteredItems.length && (
                        <p className='flex w-full justify-center mt-8'>
                            No product matches the searched term
                        </p>
                    )}
                    {!!filteredItems.length &&
                        filteredItems.map((item, index) => (
                            <Card
                                key={index}
                                items={items}
                                index={index}
                                product={item}
                            />
                        ))}
                </CardsWrapper>
            </div>
        </>
    )
}

export default Home
