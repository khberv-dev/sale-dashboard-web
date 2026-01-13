import { useQuery } from '@tanstack/react-query'
import {
    createSale,
    createSaleType,
    deleteSale,
    getAllSales,
    getSaleStats,
    getSaleTypeOptions,
    getSaleTypes,
    updateSaleType
} from '@/services/sale/api.js'
import { useInfoMutation } from '@/services/query.js'

export const useGetSaleStatsQuery = () => useQuery({
    queryKey: ['sale-stats'],
    queryFn: getSaleStats
})

export const useGetSalesQuery = (params) => useQuery({
    queryKey: ['sales', params],
    queryFn: () => getAllSales(params.page)
})

export const useCreateSaleMutation = () => useInfoMutation({
    mutationFn: (data) => createSale(data),
    queryKey: ['sales']
})

export const useGetSaleTypesQuery = () => useQuery({
    queryKey: ['sale-types'],
    queryFn: getSaleTypes
})

export const useGetSaleTypeOptionsQuery = () => useQuery({
    queryKey: ['sale-type-options'],
    queryFn: getSaleTypeOptions
})

export const useCreateSaleTypeMutation = () => useInfoMutation({
    mutationFn: (data) => createSaleType(data),
    queryKey: ['sale-types', 'sale-type-options']
})

export const useUpdateSaleTypeMutation = () => useInfoMutation({
    mutationFn: ({ id, data }) => updateSaleType(id, data),
    queryKey: ['sale-types', 'sale-type-options']
})

export const useDeleteSaleMutation = () => useInfoMutation({
    mutationFn: ({ id }) => deleteSale(id),
    queryKey: ['sales']
})