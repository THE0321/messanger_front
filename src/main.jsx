import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChatAIProvider } from './contexts/ChatAIContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ChatAIProvider>
        <App />
      </ChatAIProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

