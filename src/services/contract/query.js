import { useQuery } from '@tanstack/react-query'
import { getContracts } from '@/services/contract/api.js'

export const useGetContracts = () => useQuery({
    queryKey: ['contracts'],
    queryFn: getContracts
})