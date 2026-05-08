import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CookiesProvider} from 'react-cookie'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { Tutorial_Home } from './video_tutorial_home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <Tutorial_Home/>
    </CookiesProvider>
  </StrictMode>,
)
