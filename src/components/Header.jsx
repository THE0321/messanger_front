import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { primaryColor } = useTheme()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  const menuItems = [
    { name: 'User', path: '/user' },
    { name: 'Goal', path: '/goal' },
    { name: 'Checklist', path: '/checklist' },
    { name: 'Notice', path: '/notice' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Meeting', path: '/meeting' },
    { name: 'Drive', path: '/drive' }
  ]

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleEditProfile = () => {
    setIsUserMenuOpen(false)
    navigate('/profile/edit')
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false)
    // 로그아웃 로직
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20.09 10.26L29 11.27L22.5 17.14L24.18 26.02L16 21.77L7.82 26.02L9.5 17.14L3 11.27L11.91 10.26L16 2Z" fill={primaryColor} stroke={primaryColor} strokeWidth="2"/>
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
              <path d="M15 3.33333H5C4.07953 3.33333 3.33333 4.07953 3.33333 5V12.5C3.33333 13.4205 4.07953 14.1667 5 14.1667H6.66667V16.6667L10.8333 14.1667H15C15.9205 14.1667 16.6667 13.4205 16.6667 12.5V5C16.6667 4.07953 15.9205 3.33333 15 3.33333Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 8.33333H12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 10.8333H10.8333" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/report" className="icon-button" title="보고서">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.83333 2.5H11.6667L15.8333 6.66667V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H5.83333C5.39131 17.5 4.96738 17.3244 4.65482 17.0118C4.34226 16.6993 4.16667 16.2754 4.16667 15.8333V4.16667C4.16667 3.72464 4.34226 3.30072 4.65482 2.98816C4.96738 2.67559 5.39131 2.5 5.83333 2.5Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.6667 2.5V6.66667H15.8333" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 10.8333H12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 13.3333H12.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/notification" className="icon-button notification-button" title="알림">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.2952 17.7526 11.0851 17.9622 10.8321 18.1079C10.5791 18.2537 10.2921 18.3304 10 18.3304C9.70793 18.3304 9.42088 18.2537 9.16788 18.1079C8.91487 17.9622 8.70481 17.7526 8.55833 17.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="notification-badge">3</span>
          </Link>
        </div>
        <div className="user-profile" ref={userMenuRef}>
          <span className="user-name" onClick={handleUserMenuToggle}>
            홍길동
          </span>
          {isUserMenuOpen && (
            <div className="user-menu">
              <button className="user-menu-item" onClick={handleEditProfile}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 8C13.3333 10.9455 10.9455 13.3333 8 13.3333C5.05448 13.3333 2.66667 10.9455 2.66667 8C2.66667 5.05448 5.05448 2.66667 8 2.66667C10.9455 2.66667 13.3333 5.05448 13.3333 8Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2.66667V4.66667" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11.3333V13.3333" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.66667 8H4.66667" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.3333 8H13.3333" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                내 정보 수정
              </button>
              <button className="user-menu-item" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 14H3.33333C2.89131 14 2.46738 13.8244 2.15482 13.5118C1.84226 13.1993 1.66667 12.7754 1.66667 12.3333V3.66667C1.66667 3.22464 1.84226 2.80072 2.15482 2.48816C2.46738 2.17559 2.89131 2 3.33333 2H6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.6667 11.3333L14.3333 8L10.6667 4.66667" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.3333 8H6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

