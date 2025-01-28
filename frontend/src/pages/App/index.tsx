import { BrowserRouter } from 'react-router-dom'
import StoreProvider from '@components/Context'
import Layout from '@components/common/containers/Layout'
import { AppRoutes } from '@pages/routes'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Layout>
                    <AppRoutes />
                </Layout>
            </StoreProvider>
        </BrowserRouter>
    )
}

export default App
