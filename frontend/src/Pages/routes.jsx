import { useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import MyOrder from '../Pages/MyOrder'
import MyOrders from '../Pages/MyOrders'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ShoppingCart from '../Components/ShoppingCart'
import ProtectedRoute from '../Components/ProtectedRoute'

export const AppRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <Home />,
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
            ],
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ])
    return routes
}
