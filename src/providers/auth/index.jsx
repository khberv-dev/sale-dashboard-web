import { useUserInfoQuery } from '@/services/auth/query.js'
import AuthContext from '@/providers/auth/AuthContext.js'

function AuthContextProvider({ children }) {
    const user = useUserInfoQuery()

    function logOut() {
        localStorage.clear()
        location.reload()
    }

    const value = {
        user: user.data,
        logOut
    }

    return (
        <AuthContext.Provider value={ value }>
            { user.isLoading ? '' : children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider