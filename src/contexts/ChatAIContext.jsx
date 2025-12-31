import React, { createContext, useContext, useState, useEffect } from 'react'

const ChatAIContext = createContext()

export const useChatAI = () => {
  const context = useContext(ChatAIContext)
  if (!context) {
    throw new Error('useChatAI must be used within ChatAIProvider')
  }
  return context
}

export const ChatAIProvider = ({ children }) => {
  const [showChatAI, setShowChatAI] = useState(() => {
    const saved = localStorage.getItem('showChatAI')
    return saved !== null ? JSON.parse(saved) : false
  })
  const [aiMessages, setAiMessages] = useState(() => {
    const saved = localStorage.getItem('chatAIMessages')
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'user',
        text: 'What is the Alpito?'
      },
      {
        id: 2,
        type: 'ai',
        text: 'Hello, that leave any projects to bnnoa the eventions and project our project.'
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
    ]
  })

  useEffect(() => {
    localStorage.setItem('showChatAI', JSON.stringify(showChatAI))
  }, [showChatAI])

  useEffect(() => {
    localStorage.setItem('chatAIMessages', JSON.stringify(aiMessages))
  }, [aiMessages])

  const addAIMessage = (message) => {
    setAiMessages(prev => [...prev, message])
  }

  return (
    <ChatAIContext.Provider value={{ showChatAI, setShowChatAI, aiMessages, addAIMessage }}>
      {children}
    </ChatAIContext.Provider>
  )
}

