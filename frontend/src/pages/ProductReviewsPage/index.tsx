import { useLocation } from 'react-router-dom'
import ProductReviewDistribution from '@components/features/product/ProductReviewDistribution'
import ProductReviews from '@components/features/product/ProductReviews'

function ProductReviewsPage() {
    const location = useLocation()
    console.log('state after coming from product', location.state)
    const { product } = location.state

    return (
        <div className="w-full flex gap-6 sm:flex-wrap">
            <div className="flex w-full gap-8">
                <ProductReviewDistribution avgRating={product.average_rating} />
                <div className="flex items-start gap-4">
                    <img className="w-8" src={product.image} alt="a product" />
                    <p className="flex flex-wrap pb-2">
                        <span className="w-full text-md text-black/60 font-bold">
                            {product.title}
                        </span>
                        <span className="px-2 py-1 text-sm border border-gray rounded-lg bg-accent/70 text-black">
                            {product.category}
                        </span>
                    </p>
                </div>
            </div>

            <ProductReviews product={product} />
        </div>
    )
}

export default ProductReviewsPage
