import { useQuery } from "@tanstack/react-query"
import { createTeam, getTeams } from "@/services/team/api.js"
import { useInfoMutation } from "@/services/query.js"

export const useGetTeams = () => useQuery({
    queryKey: ['teams'],
    queryFn: getTeams
})

export const useCreateTeam = () => useInfoMutation({
    queryKey: ['teams'],
    mutationFn: (data) => createTeam(data)
})