import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { 
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App'


import { NotificationContextProvider } from './contexts/NotificationContext'
import { LoginContextProvider } from './contexts/loginContext'
import { ThemeProvider, createTheme } from '@mui/material'


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginContextProvider>
      <NotificationContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <App />

          </ThemeProvider>
        </Router>
      </NotificationContextProvider>
    </LoginContextProvider>
  </QueryClientProvider>
)