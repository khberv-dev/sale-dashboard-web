import { useMutation, useQuery } from '@tanstack/react-query'
import { useToaster } from '@gravity-ui/uikit'
import { createPendingEnrollment, getCourses, searchStudents } from '@/services/learning/api.js'

export const MIN_PHONE_SEARCH_LENGTH = 4

export const useSearchStudentsQuery = (phone, page = 1, limit = 10) => useQuery({
    queryKey: ['learning-students', phone, page, limit],
    queryFn: () => searchStudents(phone, page, limit),
    enabled: phone.length >= MIN_PHONE_SEARCH_LENGTH
})

export const useGetCoursesQuery = () => useQuery({
    queryKey: ['learning-courses'],
    queryFn: getCourses
})

/**
 * Yozilish so'rovi navbatga tushadi — yozilish ochilmaydi va sotuv yozilmaydi,
 * shuning uchun `sales` / `sale-stats` bekor qilinmaydi. Summa ham so'ralmaydi:
 * tarifni platforma admini tasdiqlash paytida tanlaydi.
 */
export function useCreatePendingEnrollmentMutation() {
    const toaster = useToaster()

    return useMutation({
        mutationFn: (data) => createPendingEnrollment(data),
        onSuccess: data => {
            toaster.add({
                content: data.message,
                theme: 'success'
            })
        },
        onError: error => {
            toaster.add({
                content: extractErrorMessage(error),
                theme: 'danger'
            })
        }
    })
}

/** Validatsiya xatolarida NestJS `message` maydonini massiv qilib qaytaradi. */
export function extractErrorMessage(error) {
    const message = error?.response?.data?.message

    if (Array.isArray(message)) {
        return message.join(', ')
    }

    return message ?? 'Xatolik yuz berdi'
}
