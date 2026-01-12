import { useContext } from 'react'
import AuthContext from '@/providers/auth/AuthContext.js'

function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        console.error('Auth context must be used in AuthContextProvider')
    }

    return context
}

export default useAuthContext