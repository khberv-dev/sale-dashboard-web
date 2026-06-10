import apiClient from '@/services/api.js'
import dayjs from 'dayjs'

export async function getSaleStats(byTeam, startDate, endDate) {
    const now = dayjs()
    const start = startDate ?? now.startOf('month').format('YYYY-MM-DD')
    const end = endDate ? `${ endDate } 23:59:59` : now.endOf('month').format('YYYY-MM-DD HH:mm:ss')
    const res = await apiClient.get(`sale/stats?startDate=${ start }&endDate=${ end }&byTeam=${ byTeam }`)

    return res.data
}

export async function getAllSales(page) {
    const res = await apiClient.get(`sale/all?page=${ page }`)

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

export async function getSaleTypeOptions() {
    const res = await apiClient.get('sale/type-options')

    return res.data
}

export async function createSaleType(data) {
    const res = await apiClient.post('sale/create-type', data)

    return res.data
}

export async function updateSaleType(id, data) {
    const res = await apiClient.put(`sale/update-type/${ id }`, data)

    return res.data
}

export async function deleteSale(id) {
    const res = await apiClient.delete(`sale/${ id }`)

    return res.data
}