import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import AIAssistant from './components/AIAssistant'
import ChatAIPanel from './components/ChatAIPanel'
import { useChatAI } from './contexts/ChatAIContext'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import UserPage from './pages/UserPage'
import GoalPage from './pages/GoalPage'
import ChecklistPage from './pages/ChecklistPage'
import NoticePage from './pages/NoticePage'
import NotificationPage from './pages/NotificationPage'
import SchedulePage from './pages/SchedulePage'
import MeetingPage from './pages/MeetingPage'
import DrivePage from './pages/DrivePage'
import ReportPage from './pages/ReportPage'
import ProfileEditPage from './pages/ProfileEditPage'
import './App.css'

const AppContent = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isChatPage = location.pathname === '/chat'
  const { showChatAI } = useChatAI()
  const showAIAssistant = !isLoginPage && !isChatPage && !showChatAI

  return (
    <div className="app">
      {!isLoginPage && <Header />}
      <div className="app-body">
        <main className={`main-content ${showAIAssistant ? 'with-sidebar' : ''} ${isChatPage ? 'chat-page-wrapper' : ''} ${showChatAI ? 'with-chat-ai' : ''} ${isLoginPage ? 'login-page-content' : ''}`}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/goal" element={<GoalPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="/drive" element={<DrivePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/" element={<UserPage />} />
          </Routes>
        </main>
        {!isLoginPage && <AIAssistant isVisible={showAIAssistant} />}
        {!isLoginPage && <ChatAIPanel />}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
