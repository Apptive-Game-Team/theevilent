import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LanguageProvider from './i18n/LanguageProvider'
import AccountProvider from './account/AccountProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </LanguageProvider>
  </StrictMode>,
)
