import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './Home'
import MyAccount from './MyAccount'
import MyOrder from './MyOrder'
import MyOrders from './MyOrders'
import NotFound from './NotFound'
import Login from './Login'
import SignUp from './SignUp'
import ShoppingCart from '../Components/features/shoppingCart/ShoppingCart'
import ProtectedRoute from '../Components/containers/ProtectedRoute'
import CheckoutPage from './CheckoutPage'
import Privacy from './Privacy'
import TermsAndConditions from './TermsAndConditions'

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
            ],
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ])
    return routes
}
