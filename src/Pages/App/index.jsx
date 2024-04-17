import { useRoutes, BrowserRouter } from 'react-router-dom'
import StoreProvider from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import SignIn from '../SignIn'
import NotFound from '../NotFound'
import Layout from '../../Components/Layout'
import './App.css'

const AppRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/my-account',
            element: <MyAccount />,
        },
        {
            path: '/my-order',
            element: <MyOrder />,
        },
        {
            path: '/my-orders',
            element: <MyOrders />,
        },
        {
            path: '/sign-in',
            element: <SignIn />,
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ])
    return routes
}
function App() {
    return (
        <>
            <StoreProvider>
                <BrowserRouter>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </BrowserRouter>
            </StoreProvider>
        </>
    )
}

export default App
