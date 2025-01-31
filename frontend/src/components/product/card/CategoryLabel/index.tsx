import { IProduct } from '@@types/product'

function CategoryLabel(props: Readonly<{ product: IProduct }>) {
    const { product } = props
    return (
        <span className='block bg-soft-accent text-md font-semibold absolute bottom-0 right-0 mr-1 mb-1 py-1 px-2 text-xs rounded-lg truncate'>
            {product.category}
        </span>
    )
}

export default CategoryLabel
