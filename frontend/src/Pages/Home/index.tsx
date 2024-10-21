import React from 'react'
import { useLocation } from 'react-router-dom'
import Card from '@components/features/product/card/Card'
import CardsWrapper from '@components/features/product/card/CardsWrapper'
import { StoreContext } from '@components/Context/context'
import { StoreContextType } from '@@types/store'
import ProductSearchBar from '@components/features/product/ProductSearchBar'

function Home() {
    const {
        closeCartSideMenu,
        filterItems,
        searchByTitle,
        setSearchByTitle,
        productCategories,
        items,
    } = React.useContext(StoreContext) as StoreContextType
    // const { items } = useApi() || null
    // console.log('this should be items', items)
    React.useEffect(() => {
        if (!items) return
        closeCartSideMenu()
        setSearchByTitle('')
    }, [])
    // console.log('this is items', items)
    const location = useLocation().pathname
    const productCategory = location.split('/')[2]
    // console.log('category', productCategories[productCategory])
    // console.log('location', location)
    if (!items) return
    let filteredItems
    if (productCategory && productCategories[productCategory]) {
        filteredItems = filterItems(
            searchByTitle,
            productCategories[productCategory]
        )
    } else if (searchByTitle) filteredItems = filterItems(searchByTitle)
    else filteredItems = items

    return (
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
                    filteredItems.map((item) => (
                        <Card key={item.product_id} product={item} />
                    ))}
            </CardsWrapper>
        </div>
    )
}

export default Home
