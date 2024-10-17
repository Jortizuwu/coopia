import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './core/app'
import { ThemeProvider } from './shared/components/theme/theme-provider'
import { TooltipProvider } from '@radix-ui/react-tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
