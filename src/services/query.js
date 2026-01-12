import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '@gravity-ui/uikit'

const queryClient = new QueryClient()

export function useInfoMutation({ mutationFn, queryKey }) {
    const client = useQueryClient()
    const toaster = useToaster()

    return useMutation({
        mutationFn,
        onSuccess: data => {
            toaster.add({
                content: data.message,
                theme: 'success'
            })
            client.invalidateQueries({ queryKey })
        },
        onError: error => {
            toaster.add({
                content: error.response.data.message,
                theme: 'danger'
            })
        }
    })
}

export default queryClient