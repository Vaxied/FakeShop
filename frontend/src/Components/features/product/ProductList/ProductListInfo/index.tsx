import { IProduct } from '@@types/product'

function ProductListInfo(props: Readonly<{ product: IProduct }>) {
    const { product } = props
    return (
        <div
            key={product.product_id}
            className='h-[60px] flex items-center mb-3 p-2 justify-between bg-white border border-gray rounded-lg gap-4'
        >
            <div className='flex items-center min-w-[120px] gap-4'>
                <img
                    src={product?.image}
                    alt={product.title}
                    className='w-12 h-12 min-w-12 min-h-12 rounded-lg'
                />
                <p className='truncate'>{product?.title}</p>
            </div>
            <div className='flex items-center h-8 gap-4'>
                <p className='min-w-[48px] flex flex-nowrap items-center'>
                    Qty: {product?.product_quantity}
                </p>
                <p className='flex w-16 justify-end items-center'>
                    $
                    {product.product_quantity &&
                        (product?.price * product.product_quantity).toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default ProductListInfo
