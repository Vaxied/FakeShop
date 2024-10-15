import { IProduct } from '../../@types/product'
import ProductListInfo from './ProductListInfo'
function ProductList(props: Readonly<{ products: IProduct[] }>) {
    const { products } = props
    // const [shouldShowCloseBtn, setIsShould]
    return products.map((product: IProduct) => (
        <ProductListInfo product={product} key={product.product_id} />
    ))
}

export default ProductList
