import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './AIAssistant.css'

const AIAssistant = ({ isVisible = true }) => {
  const { primaryColor } = useTheme()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      text: 'What is the Alpha?'
    },
    {
      id: 2,
      type: 'ai',
      text: 'Hello, that leave any projects to brinon the eventions and project our project.'
    },
    {
      id: 3,
      type: 'user',
      text: 'What is that project?'
    },
    {
      id: 4,
      type: 'ai',
      text: 'Hello, that leave any projects to brinon the eventions and endora our project.'
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputValue
      }
      setMessages([...messages, newMessage])
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`ai-assistant ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="ai-assistant-header">
        <h3 className="ai-assistant-title">AI Assistant</h3>
      </div>
      <div className="ai-assistant-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.type === 'ai' && (
              <div className="ai-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill={primaryColor}/>
                  <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="ai-assistant-input">
        <input
          type="text"
          placeholder="Input a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="ai-input-field"
        />
        <div className="ai-input-actions">
          <button className="ai-action-button" title="Emoji">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="#666" strokeWidth="1.5"/>
              <circle cx="7" cy="8" r="1" fill="#666"/>
              <circle cx="13" cy="8" r="1" fill="#666"/>
              <path d="M7 12C7 12 8.5 14 10 14C11.5 14 13 12 13 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ai-action-button" title="Attach">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 9.5L10 15L4.5 9.5M10 15V5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="ai-action-button ai-send-button" onClick={handleSend} title="Send">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant

