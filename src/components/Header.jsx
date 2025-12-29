import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const menuItems = [
    { name: 'User', path: '/user' },
    { name: 'Goal', path: '/goal' },
    { name: 'Checklist', path: '/checklist' },
    { name: 'Notice', path: '/notice' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Meeting', path: '/meeting' },
    { name: 'Drive', path: '/drive' }
  ]

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20.09 10.26L29 11.27L22.5 17.14L24.18 26.02L16 21.77L7.82 26.02L9.5 17.14L3 11.27L11.91 10.26L16 2Z" fill="#4A90E2" stroke="#4A90E2" strokeWidth="2"/>
          </svg>
          <span className="logo-text">Logo</span>
        </Link>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <div className="icon-buttons">
          <Link to="/chat" className="icon-button" title="채팅">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 9.58333C17.5029 10.6833 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.926 14.1395 15.6338C13.0209 16.3417 11.7319 16.7294 10.4167 16.75C9.31667 16.7529 8.23167 16.4959 7.25 16C6.5 15.6333 5.83333 15.1167 5.25 14.5L2.5 15.8333L3.83333 13.0833C3.21667 12.5 2.7 11.8333 2.33333 11.0833C1.83741 10.1017 1.58038 9.01667 1.58333 7.91667C1.60377 6.60152 1.99141 5.31248 2.69926 4.19389C3.40711 3.0753 4.40655 2.17138 5.58333 1.58333C6.565 1.08741 7.65 0.83038 8.75 0.83333H9.16667C11.0375 0.89375 12.7984 1.64396 14.0896 2.93515C15.3808 4.22634 16.131 5.98722 16.1917 7.85833L17.5 9.58333Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button className="icon-button" title="보고서">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6667 17.5H3.33333C2.89131 17.5 2.46738 17.3244 2.15482 17.0118C1.84226 16.6993 1.66667 16.2754 1.66667 15.8333V4.16667C1.66667 3.72464 1.84226 3.30072 2.15482 2.98816C2.46738 2.67559 2.89131 2.5 3.33333 2.5H8.33333L10.8333 5H16.6667C17.1087 5 17.5326 5.17559 17.8452 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333C18.3333 16.2754 18.1577 16.6993 17.8452 17.0118C17.5326 17.3244 17.1087 17.5 16.6667 17.5Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 8.33333V13.3333" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 10.8333H12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="icon-button notification-button" title="알림">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.2952 17.7526 11.0851 17.9622 10.8321 18.1079C10.5791 18.2537 10.2921 18.3304 10 18.3304C9.70793 18.3304 9.42088 18.2537 9.16788 18.1079C8.91487 17.9622 8.70481 17.7526 8.55833 17.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="notification-badge">3</span>
          </button>
        </div>
        <Link to="/login" className="login-link">
          Login
        </Link>
        <div className="user-profile">
          <span className="user-name">홍길동</span>
        </div>
      </div>
    </header>
  )
}

export default Header

