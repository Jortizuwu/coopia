import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './core/app'

import { ThemeProvider } from './shared/components/theme/theme-provider'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import QueryProvider from './shared/components/providers/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
