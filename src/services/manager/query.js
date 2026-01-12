import { useQuery } from '@tanstack/react-query'
import { getAllManagers, uploadManagerAvatar } from '@/services/manager/api.js'
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
    mutationFn: ({ id, file }) => uploadManagerAvatar(id, file),
    queryKey: ['managers']
})