import apiClient from '@/services/api.js'

export async function signIn(username, password) {
    const res = await apiClient.post('auth/sign-in', { username, password })
    return res.data
}

export async function getUserInfo() {
    const res = await apiClient.get('user/me')
    return res.data
}