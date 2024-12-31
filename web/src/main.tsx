import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.baseURL = 'http://localhost:3000/';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>

)
