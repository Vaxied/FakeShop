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
import OrderToConfirm from '../Components/OrderToConfirm'

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
                // {
                //     path: 'women',
                //     element: <Home />,
                // },
                // {
                //     path: 'electronics',
                //     element: <Home />,
                // },
                // {
                //     path: 'jewelry',
                //     element: <Home />,
                // },
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
                    // children: [{ path: ':id', element: <MyOrder /> }],
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
                    path: 'order-to-confirm',
                    element: <OrderToConfirm />,
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
