import apiClient from '@/services/api.js'
import dayjs from 'dayjs'

export async function getSaleStats() {
    const now = dayjs()
    const startDate = now.startOf('month').format('YYYY-MM-DD')
    const endDate = now.endOf('month').format('YYYY-MM-DD')
    const res = await apiClient.get(`sale/stats?startDate=${ startDate }&endDate=${ endDate }`)

    return res.data
}

export async function getAllSales() {
    const res = await apiClient.get('sale/all')

    return res.data
}

export async function createSale(data) {
    const res = await apiClient.post('sale/create', data)

    return res.data
}

export async function getSaleTypes() {
    const res = await apiClient.get('sale/types')

    return res.data
}

export async function createSaleType(data) {
    const res = await apiClient.post('sale/create-type', data)

    return res.data
}