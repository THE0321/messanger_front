import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'
import './Page.css'
import './NotificationPage.css'

const NotificationPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRead, setFilterRead] = useState('all') // 'all', 'read', 'unread'
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 샘플 알림 데이터
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '새로운 메시지가 도착했습니다',
      message: '홍길동님이 채팅 메시지를 보냈습니다.',
      link: '/chat',
      isRead: false,
      createdAt: '2024-03-15 14:30',
      type: 'message'
    },
    {
      id: 2,
      title: '회의 일정 알림',
      message: '오늘 오후 3시 팀 회의가 예정되어 있습니다.',
      link: '/meeting',
      isRead: false,
      createdAt: '2024-03-15 10:00',
      type: 'meeting'
    },
    {
      id: 3,
      title: '새로운 공지사항',
      message: '시스템 점검 안내 공지사항이 등록되었습니다.',
      link: '/notice',
      isRead: true,
      createdAt: '2024-03-14 16:20',
      type: 'notice'
    },
    {
      id: 4,
      title: '보고서 제출 요청',
      message: '주간 보고서 제출이 요청되었습니다.',
      link: '/report',
      isRead: false,
      createdAt: '2024-03-14 09:15',
      type: 'report'
    },
    {
      id: 5,
      title: '일정 알림',
      message: '내일 오전 10시 프로젝트 미팅이 있습니다.',
      link: '/schedule',
      isRead: true,
      createdAt: '2024-03-13 18:45',
      type: 'schedule'
    },
    {
      id: 6,
      title: '파일 공유 알림',
      message: '새로운 파일이 공유되었습니다.',
      link: '/drive',
      isRead: false,
      createdAt: '2024-03-13 14:20',
      type: 'drive'
    }
  ])

  const handleNotificationClick = (notification) => {
    // 읽음 처리
    if (!notification.isRead) {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notification.id 
            ? { ...notif, isRead: true }
            : notif
        )
      )
    }
    
    // 링크로 이동
    navigate(notification.link)
  }

  const handleMarkAsRead = (e, notification) => {
    e.stopPropagation()
    if (!notification.isRead) {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notification.id 
            ? { ...notif, isRead: true }
            : notif
        )
      )
    }
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  // 검색 및 필터링
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = 
      filterRead === 'all' ||
      (filterRead === 'read' && notification.isRead) ||
      (filterRead === 'unread' && !notification.isRead)
    
    return matchesSearch && matchesFilter
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex)

  // 검색어 또는 필터 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterRead])

  const unreadCount = notifications.filter(n => !n.isRead).length

  // 알림 타입별 아이콘
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3.33333H5C4.07953 3.33333 3.33333 4.07953 3.33333 5V12.5C3.33333 13.4205 4.07953 14.1667 5 14.1667H6.66667V16.6667L10.8333 14.1667H15C15.9205 14.1667 16.6667 13.4205 16.6667 12.5V5C16.6667 4.07953 15.9205 3.33333 15 3.33333Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'meeting':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5V10L13.3333 11.6667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'notice':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'report':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83333 2.5H11.6667L15.8333 6.66667V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H5.83333C5.39131 17.5 4.96738 17.3244 4.65482 17.0118C4.34226 16.6993 4.16667 16.2754 4.16667 15.8333V4.16667C4.16667 3.72464 4.34226 3.30072 4.65482 2.98816C4.96738 2.67559 5.39131 2.5 5.83333 2.5Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.6667 2.5V6.66667H15.8333" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'schedule':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07953 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07953 16.7538 3.33333 15.8333 3.33333Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3333 1.66667V5M6.66667 1.66667V5M2.5 8.33333H17.5" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'drive':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6667 5.83333L10.8333 2.5L5 5.83333M10.8333 2.5V12.5M5 5.83333L10.8333 9.16667M5 5.83333V14.1667L10.8333 17.5M10.8333 9.16667L16.6667 5.83333M10.8333 9.16667V17.5M16.6667 5.83333V14.1667L10.8333 17.5" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7.5" stroke="#4A90E2" strokeWidth="1.5"/>
          </svg>
        )
    }
  }

  return (
    <div className="page">
      <h1>알림</h1>
      
      {/* 검색 및 필터 바 */}
      <div className="notification-controls">
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search/Filter"
              className="search-filter-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-button" title="Filter">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 8H12" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 12H10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {unreadCount > 0 && (
          <button className="mark-all-read-button" onClick={handleMarkAllAsRead}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            모두 읽음 처리
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="notification-list">
        {paginatedNotifications.length === 0 ? (
          <div className="notification-empty">
            <p>알림이 없습니다.</p>
          </div>
        ) : (
          paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-header-row">
                  <h3 className="notification-title">{notification.title}</h3>
                  {!notification.isRead && (
                    <span className="unread-badge"></span>
                  )}
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-footer">
                  <span className="notification-date">{notification.createdAt}</span>
                  <button
                    className="mark-read-button"
                    onClick={(e) => handleMarkAsRead(e, notification)}
                    title="읽음 처리"
                  >
                    {notification.isRead ? '읽음' : '읽음 처리'}
                  </button>
                </div>
              </div>
              <div className="notification-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default NotificationPage

