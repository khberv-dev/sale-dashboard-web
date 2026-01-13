import LoginPage from '@/ui/pages/login/index.jsx'
import PrivateRoutes from '@/routes/PrivateRoutes.jsx'
import HomePage from '@/ui/pages/home/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ManagersPage from '@/ui/pages/managers/index.jsx'
import SalesPage from '@/ui/pages/sales/index.jsx'
import SaleTypesPage from '@/ui/pages/sale-types/index.jsx'
import SettingsPage from '@/ui/pages/settings/index.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ '/login' } element={ <LoginPage/> }/>

                <Route element={ <PrivateRoutes/> }>
                    <Route path={ '/' } element={ <HomePage/> }/>
                    <Route path={ '/sales' } element={ <SalesPage/> }/>
                    <Route path={ '/sale-types' } element={ <SaleTypesPage/> }/>
                    <Route path={ '/managers' } element={ <ManagersPage/> }/>
                    <Route path={ '/settings' } element={ <SettingsPage/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
