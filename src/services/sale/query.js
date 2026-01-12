import { useQuery } from '@tanstack/react-query'
import { createSale, createSaleType, getAllSales, getSaleStats, getSaleTypes } from '@/services/sale/api.js'
import { useInfoMutation } from '@/services/query.js'

export const useGetSaleStatsQuery = () => useQuery({
    queryKey: ['sale-stats'],
    queryFn: getSaleStats
})

export const useGetSalesQuery = () => useQuery({
    queryKey: ['sales'],
    queryFn: getAllSales
})

export const useCreateSaleMutation = () => useInfoMutation({
    mutationFn: (data) => createSale(data),
    queryKey: ['sales']
})

export const useGetSaleTypesQuery = () => useQuery({
    queryKey: ['sale-types'],
    queryFn: getSaleTypes
})

export const useCreateSaleTypeMutation = () => useInfoMutation({
    mutationFn: (data) => createSaleType(data),
    queryKey: ['sale-types']
})