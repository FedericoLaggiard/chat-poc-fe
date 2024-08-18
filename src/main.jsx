import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PAGE_TITLE } from "./env";
import App from './App.jsx'
import PageTitle from "./components/pageTitle"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageTitle title={PAGE_TITLE} />
    <App />
  </StrictMode>,
)
