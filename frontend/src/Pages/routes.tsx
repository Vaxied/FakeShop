import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './Home'
// TODO
import MyAccount from './MyAccount'
import MyOrder from './MyOrder'
import MyOrders from './MyOrders'
import NotFound from './NotFound'
import Login from './Login'
import SignUp from './SignUp'
import ShoppingCart from '../Components/ShoppingCart'
import ProtectedRoute from '../Components/ProtectedRoute'
import CheckoutPage from './CheckoutPage'
import Privacy from './Privacy'

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
