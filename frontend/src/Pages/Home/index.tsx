import React from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../../Components/Card'
import CardsWrapper from '../../Components/CardsWrapper'
import { StoreContext } from '../../Context/context'
import useApi from '../../Hooks/useApi'
import { StoreContextType } from '../../@types/store'
import ProductSearchBar from '../../Components/ProductSearchBar'

function Home() {
    const {
        closeCartSideMenu,
        filterItems,
        searchByTitle,
        setSearchByTitle,
        productCategories,
    } = React.useContext(StoreContext) as StoreContextType
    const { items } = useApi() || null
    // console.log('this should be items', items)
    if (!items) return null
    React.useEffect(() => {
        closeCartSideMenu()
        setSearchByTitle('')
    }, [])
    const location = useLocation().pathname
    const productCategory = location.split('/')[2]
    // console.log('category', productCategories[productCategory])
    // console.log('location', location)

    let filteredItems = items || []
    if (productCategory && productCategories[productCategory]) {
        filteredItems = filterItems(
            searchByTitle,
            productCategories[productCategory]
        )
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
                                // items={items}
                                // index={index}
                                product={item}
                            />
                        ))}
                </CardsWrapper>
            </div>
        </>
    )
}

export default Home
