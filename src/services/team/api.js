import apiClient from "@/services/api.js"

export async function getTeams() {
    const res = await apiClient.get('team')
    return res.data
}

export async function createTeam(data) {
    const res = await apiClient.post('team/create', data)
    return res.data
}