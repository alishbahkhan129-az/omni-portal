import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Hamari main Tailwind/CSS file
import App from './App.jsx' // Main App component jahan routes hain

// HTML mein jo 'root' wali div hai, usmein React ko render kar rahay hain
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    {/* Pura project is App component se shuru hota hai */}
    <App />
  </StrictMode>,
)