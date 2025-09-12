import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './todo_v2.css'
// remember that the css file to import is imported to main, not the app. More
// specifically, where ever our root is created, that's where we want to read the .css file(s).
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
