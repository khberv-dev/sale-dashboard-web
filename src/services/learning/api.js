import apiClient from '@/services/api.js'

export async function searchStudents(phone, page, limit) {
    const res = await apiClient.get(`learning/students?phone=${ phone }&page=${ page }&limit=${ limit }`)

    return res.data
}

export async function getCourses() {
    const res = await apiClient.get('learning/courses')

    return res.data
}

export async function createEnrollment(data) {
    const res = await apiClient.post('learning/enroll', data)

    return res.data
}

export async function createPendingEnrollment(data) {
    const res = await apiClient.post('learning/pending-enroll', data)

    return res.data
}

export async function getPendingEnrollment(id) {
    const res = await apiClient.get(`learning/pending-enroll/${ id }`)

    return res.data
}
