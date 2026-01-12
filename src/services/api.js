import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

apiClient.interceptors.request.use(config => {
    const auth = JSON.parse(localStorage.getItem('auth'))

    if (!auth && config.url !== 'auth/sign-in') {
        location.replace('login')
    }

    if (auth) {
        config.headers['Authorization'] = `Bearer ${ auth.token }`
    }

    return config
})

apiClient.interceptors.response.use(
    config => {
        return config
    },
    error => {
        if (error.response.status === 401) {
            location.replace('login')
        }

        return Promise.reject(error)
    }
)

export default apiClient