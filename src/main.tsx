import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/fonts'
import './styles/index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// En producción el HTML viene pre-renderizado (SEO) → se hidrata. En desarrollo se monta normal.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
