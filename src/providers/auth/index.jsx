import { useUserInfoQuery } from '@/services/auth/query.js'
import AuthContext from '@/providers/auth/AuthContext.js'

function AuthContextProvider({ children }) {
    const user = useUserInfoQuery()

    return (
        <AuthContext.Provider value={ user.data }>
            { user.isLoading ? '' : children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider