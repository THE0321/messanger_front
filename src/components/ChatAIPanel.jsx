import React, { useState } from 'react'
import { useChatAI } from '../contexts/ChatAIContext'
import './ChatAIPanel.css'

const ChatAIPanel = () => {
  const { showChatAI, aiMessages, addAIMessage } = useChatAI()
  const [aiInputValue, setAiInputValue] = useState('')

  const handleSendAIMessage = () => {
    if (aiInputValue.trim()) {
      const newMessage = {
        id: aiMessages.length + 1,
        type: 'user',
        text: aiInputValue
      }
      addAIMessage(newMessage)
      setAiInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendAIMessage()
    }
  }

  if (!showChatAI) return null

  return (
    <div className="chat-ai-assistant">
      <div className="chat-ai-header">
        <h3 className="chat-ai-title">AI Assistant</h3>
      </div>
      <div className="chat-ai-messages">
        {aiMessages.map((message) => (
          <div key={message.id} className={`ai-message ${message.type}`}>
            {message.type === 'ai' && (
              <div className="ai-message-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#4A90E2"/>
                  <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <div className="ai-message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-ai-input">
        <div className="chat-ai-input-actions-left">
          <button className="chat-ai-action-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="#666" strokeWidth="1.5"/>
              <circle cx="7" cy="8" r="1" fill="#666"/>
              <circle cx="13" cy="8" r="1" fill="#666"/>
              <path d="M7 12C7 12 8.5 14 10 14C11.5 14 13 12 13 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="chat-ai-action-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 9.5L10 15L4.5 9.5M10 15V5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Input a message..."
          value={aiInputValue}
          onChange={(e) => setAiInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-ai-input-field"
        />
        <button className="chat-ai-send-button" onClick={handleSendAIMessage}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatAIPanel

