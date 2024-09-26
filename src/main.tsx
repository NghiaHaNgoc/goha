import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-amber/theme.css';
import '/node_modules/primeflex/primeflex.css'

import 'primeicons/primeicons.css';
        

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
