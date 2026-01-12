import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

function useSocket() {
    const ref = useRef(null)

    useEffect(() => {
        ref.current = io(import.meta.env.VITE_API_URL, {
            autoConnect: true
        })

        return () => {
            ref.current.disconnect()
        }
    }, [])

    return ref.current
}

export default useSocket