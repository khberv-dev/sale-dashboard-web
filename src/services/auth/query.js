import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserInfo, signIn } from './api.js'

export const useSignInMutation = () => useMutation({
    mutationFn: ({ username, password }) => signIn(username, password),
    onSuccess: (data, variables, onMutateResult, context) => {
        localStorage.setItem('auth', JSON.stringify({ token: data.token }))
        location.replace('/')
    }
})

export const useUserInfoQuery = () => useQuery({
    queryKey: ['auth'],
    queryFn: getUserInfo
})