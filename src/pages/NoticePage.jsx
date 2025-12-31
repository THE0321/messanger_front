import React, { useState, useEffect } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import Pagination from '../components/Pagination'
import './Page.css'
import './NoticePage.css'

const NoticePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewNotice, setIsNewNotice] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 샘플 데이터
  const [notices] = useState([
    {
      id: 1,
      title: '시스템 점검 안내',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      isActive: true,
      content: '시스템 안정화를 위한 정기 점검이 예정되어 있습니다. 점검 시간 동안 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.'
    },
    {
      id: 2,
      title: '새로운 기능 업데이트',
      startDate: '2024-03-10',
      endDate: null,
      isActive: true,
      content: '사용자 편의성을 향상시키기 위한 새로운 기능이 추가되었습니다. 더 나은 서비스 제공을 위해 계속 노력하겠습니다.'
    },
    {
      id: 3,
      title: '연말연시 휴무 안내',
      startDate: null,
      endDate: '2024-01-31',
      isActive: false,
      content: '2024년 연말연시 기간 중 고객센터 휴무 안내입니다. 긴급한 문의사항은 이메일로 접수해 주시기 바랍니다.'
    },
    {
      id: 4,
      title: '개인정보 처리방침 변경 안내',
      startDate: '2024-02-15',
      endDate: '2024-05-15',
      isActive: true,
      content: '개인정보 처리방침이 일부 변경되었습니다. 변경 사항을 확인하시고 동의해 주시기 바랍니다. 변경된 내용은 홈페이지에서 확인하실 수 있습니다.'
    },
    {
      id: 5,
      title: '서비스 이용약관 업데이트',
      startDate: null,
      endDate: null,
      isActive: true,
      content: '서비스 이용약관이 업데이트되었습니다. 주요 변경사항을 확인하시고 동의 부탁드립니다.'
    }
  ])

  const handleOpenDrawer = (notice) => {
    setSelectedNotice(notice)
    setIsNewNotice(false)
    setIsDrawerOpen(true)
  }

  const handleCreateNotice = () => {
    const newNotice = {
      id: Date.now(), // 임시 ID
      title: '',
      startDate: null,
      endDate: null,
      isActive: true,
      content: ''
    }
    setSelectedNotice(newNotice)
    setIsNewNotice(true)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedNotice(null)
    setIsNewNotice(false)
  }

  // 검색 필터링
  const filteredNotices = notices.filter(notice => {
    const query = searchQuery.toLowerCase()
    return (
      notice.title.toLowerCase().includes(query)
    )
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedNotices = filteredNotices.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // 활성화 여부 배지 렌더링 함수
  const renderActiveBadge = (isActive) => {
    return (
      <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
        {isActive ? '활성화' : '비활성화'}
      </span>
    )
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 노출 기간 포맷팅 함수
  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    
    if (!start && !end) {
      return '-'
    } else if (start && end) {
      return `${start} ~ ${end}`
    } else if (start) {
      return `${start} ~`
    } else {
      return `~ ${end}`
    }
  }

  return (
    <div className="page">
      <h1>Notice</h1>
      
      {/* 검색 및 필터 바 */}
      <div className="notice-controls">
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
        <button className="create-notice-button" onClick={handleCreateNotice}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          공지사항 등록
        </button>
      </div>

      {/* 공지사항 목록 테이블 */}
      <div className="notice-table-container">
        <table className="notice-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>노출 기간</th>
              <th>활성화 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedNotices.map((notice) => (
              <tr key={notice.id} onClick={() => handleOpenDrawer(notice)}>
                <td>{notice.title}</td>
                <td>{formatDateRange(notice.startDate, notice.endDate)}</td>
                <td>
                  {renderActiveBadge(notice.isActive)}
                </td>
                <td>
                  <button className="more-button" onClick={(e) => {
                    e.stopPropagation()
                    handleOpenDrawer(notice)
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="8" r="1" fill="#666"/>
                      <circle cx="8" cy="8" r="1" fill="#666"/>
                      <circle cx="12" cy="8" r="1" fill="#666"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="공지사항 상세"
      >
        {selectedNotice && (
          <div className="drawer-form">
            <div className="form-group">
              <label>제목</label>
              <input type="text" defaultValue={selectedNotice.title} />
            </div>
            <div className="form-group">
              <label>노출 시작일</label>
              <input type="date" defaultValue={selectedNotice.startDate || ''} />
            </div>
            <div className="form-group">
              <label>노출 종료일</label>
              <input type="date" defaultValue={selectedNotice.endDate || ''} />
            </div>
            <div className="form-group">
              <label>활성화 여부</label>
              <div className="radio-group radio-group-active">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isActive" 
                    value="Y" 
                    defaultChecked={selectedNotice.isActive}
                  />
                  <span className="radio-badge">활성화</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isActive" 
                    value="N" 
                    defaultChecked={!selectedNotice.isActive}
                  />
                  <span className="radio-badge">비활성화</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea 
                defaultValue={selectedNotice.content}
                rows={8}
                placeholder="공지사항 내용을 입력하세요"
              />
            </div>
            <div className="drawer-actions">
              <button className="cancel-button" onClick={handleCloseDrawer}>Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}

export default NoticePage
