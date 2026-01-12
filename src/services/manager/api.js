import apiClient from '@/services/api.js'

export async function getAllManagers() {
    const res = await apiClient.get('manager/all')

    return res.data
}

export async function updateManager(id, data) {
    const res = await apiClient.put(`manager/update/${ id }`, data)

    return res.data
}

export async function uploadManagerAvatar(id, file) {
    const formData = new FormData()

    formData.append('file', file)

    const res = await apiClient.post(`manager/upload-avatar/${ id }`, formData)

    return res.data
}

export async function createManager(data) {
    const res = await apiClient.post('manager/create', data)

    return res.data
}