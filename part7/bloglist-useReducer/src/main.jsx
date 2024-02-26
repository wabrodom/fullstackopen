import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

import { NotificationContextProvider } from './contexts/NotificationContext'
import { LoginContextProvider } from './contexts/loginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </LoginContextProvider>
  </QueryClientProvider>
)