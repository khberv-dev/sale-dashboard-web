import { useQuery } from '@tanstack/react-query'
import {
    createManager,
    getAllManagers,
    getMonthPlan,
    setMonthPlan,
    updateManager,
    uploadManagerAvatar
} from '@/services/manager/api.js'
import { useInfoMutation } from '@/services/query.js'

export const useGetAllManagersQuery = () => useQuery({
    queryKey: ['managers'],
    queryFn: getAllManagers
})

export const useUploadManagerAvatarMutation = () => useInfoMutation({
    mutationFn: ({ id, file }) => uploadManagerAvatar(id, file),
    queryKey: ['managers']
})

export const useUpdateManagerMutation = () => useInfoMutation({
    mutationFn: ({ id, data }) => updateManager(id, data),
    queryKey: ['managers']
})

export const useCreateManagerMutation = () => useInfoMutation({
    mutationFn: (data) => createManager(data),
    queryKey: ['managers']
})

export const useSetMonthPlanMutation = () => useInfoMutation({
    mutationFn: ({ plan }) => setMonthPlan(plan),
    queryKey: ['month-plan']
})

export const useGetMonthPlanQuery = () => useQuery({
    queryKey: ['month-plan'],
    queryFn: getMonthPlan
})