import { BrowserRouter } from 'react-router-dom'
import StoreProvider from '../../Context'
import Layout from '../../Components/Layout'
import './App.css'
import { AppRoutes } from '../../Pages/routes'

function App() {
    return (
        <>
            <BrowserRouter>
                <StoreProvider>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </StoreProvider>
            </BrowserRouter>
        </>
    )
}

export default App
