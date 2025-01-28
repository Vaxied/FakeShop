import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '@pages/Home'
import MyAccount from '@pages/MyAccount'
import MyOrder from '@pages/MyOrder'
import MyOrders from '@pages/MyOrders'
import NotFound from '@pages/NotFound'
import Login from '@pages/Login'
import SignUp from '@pages/SignUp'
import CheckoutPage from '@pages/CheckoutPage'
import Privacy from '@pages/Privacy'
import TermsAndConditions from '@pages/TermsAndConditions'
import Product from '@pages/Product'
import ProtectedRoute from '@components/common/containers/ProtectedRoute'
import ShoppingCart from '@pages/ShoppingCart'
import ProductReviews from '@pages/ProductReviews'
import OrderSuccess from '@pages/OrderSuccess'

export const AppRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/category',
            element: <Outlet />,
            children: [
                {
                    path: '',
                    element: <Navigate to={'/'} />,
                },
                {
                    path: '*',
                    element: <Home />,
                },
            ],
        },
        {
            path: '/products/:productId',
            element: <Product />,
        },
        {
            path: '/products/:productId/reviews',
            element: <ProductReviews />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/sign-up',
            element: <SignUp />,
        },
        {
            path: '/privacy',
            element: <Privacy />,
        },
        {
            path: '/terms',
            element: <TermsAndConditions />,
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: 'my-account',
                    element: <MyAccount />,
                },
                {
                    path: 'my-order',
                    element: <MyOrder />,
                },
                {
                    path: 'my-orders',
                    element: <MyOrders />,
                },
                {
                    path: 'my-orders/:id',
                    element: <MyOrder />,
                },
                {
                    path: 'shopping-cart',
                    element: <ShoppingCart />,
                },
                {
                    path: 'checkout',
                    element: <CheckoutPage />,
                },
                {
                    path: 'orderSuccess/:id',
                    element: <OrderSuccess />,
                },
            ],
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ])
    return routes
}
