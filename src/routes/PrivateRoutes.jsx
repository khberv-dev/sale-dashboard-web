import { Outlet } from 'react-router-dom'
import AuthContextProvider from '@/providers/auth/index.jsx'
import SideNavigation from '@/ui/layouts/side-navigation/index.jsx'

function PrivateRoutes() {
    return (
        <AuthContextProvider>
            <SideNavigation>
                <Outlet/>
            </SideNavigation>
        </AuthContextProvider>
    )
}

export default PrivateRoutes