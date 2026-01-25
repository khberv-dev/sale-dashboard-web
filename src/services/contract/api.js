import apiClient from '@/services/api.js'

export async function getContracts() {
    const res = await apiClient.get('contract/all')

    return res.data
}