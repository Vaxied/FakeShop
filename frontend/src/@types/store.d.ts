import { Order } from './order.d.ts'
import { IProduct } from './product.d.ts'

export type StoreContextType = {
    items: IProduct[]
    shoppingCartProducts: IProduct[] | []
    orders: Order[]
    productToShow: IProduct | null
    isCartSideMenuOpen: boolean
    loggedIn: boolean
    username: string
    searchByTitle: string
    productCategories: productCategories
    username: string
    isLoading: boolean
    setItems: (products: items) => void
    setShoppingCartProducts: (products: IProduct[]) => void
    setProductToShow: (product: IProduct) => void
    setLoggedIn: (boolean: boolean) => void
    setOrders: (Orders: Orders) => void
    setUsername: (string: string) => void
    setSearchByTitle: (string: string) => void
    openCartSideMenu: (event: React.MouseEvent<HTMLButtonElement>) => void
    closeCartSideMenu: () => void
    addNewOrder: () => void
    calculateTotalPrice: (items: IProduct[]) => number
    logOut: () => void
    navigateWithClosing: (
        event: React.MouseEvent<HTMLAnchorElement>,
        to: string,
    ) => void
    filterItems: (searchTerm?: string, category?: string) => IProduct[]
    setIsLoading: (boolean: boolean) => void
    policy: string
    setPolicy: (string: string) => void
    terms: string
    setTerms: (string: string) => void
    firstLoad: boolean
    setFirstLoad: (boolean: boolean) => void
}

type productCategories = {
    [key: string]: string
}
