import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './services/query.js'
import toaster from '@/services/toaster.js'

const root = createRoot(document.getElementById('root'))

root.render(
    <ToasterProvider toaster={ toaster }>
        <QueryClientProvider client={ queryClient }>
            <ThemeProvider theme={ 'light' }>
                <App/>
                <ToasterComponent/>
            </ThemeProvider>
        </QueryClientProvider>
    </ToasterProvider>
)
