import React, { useState, useEffect } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import Pagination from '../components/Pagination'
import './Page.css'
import './ReportPage.css'

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('report') // 'report' or 'meeting'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewItem, setIsNewItem] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 샘플 데이터 - 보고서
  const [reports, setReports] = useState([
    {
      id: 1,
      title: '2024년 1분기 프로젝트 진행 보고서',
      author: '홍길동',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: '신규 기능 개발 완료 보고서',
      author: '김철수',
      date: '2024-01-20'
    },
    {
      id: 3,
      title: '시스템 성능 개선 보고서',
      author: '이영희',
      date: '2024-01-25'
    }
  ])

  // 샘플 데이터 - 회의록
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: '주간 팀 회의',
      author: '박민수',
      date: '2024-01-10'
    },
    {
      id: 2,
      title: '프로젝트 킥오프 미팅',
      author: '최지영',
      date: '2024-01-12'
    },
    {
      id: 3,
      title: '기획 회의',
      author: '홍길동',
      date: '2024-01-18'
    }
  ])

  const currentItems = activeTab === 'report' ? reports : meetings

  const handleOpenDrawer = (item) => {
    setSelectedItem(item)
    setFormData({
      title: item.title || '',
      content: item.content || ''
    })
    setIsNewItem(false)
    setIsDrawerOpen(true)
  }

  const handleCreateItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      content: '',
      author: '',
      date: ''
    }
    setSelectedItem(newItem)
    setFormData({ title: '', content: '' })
    setIsNewItem(true)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedItem(null)
    setFormData({ title: '', content: '' })
    setIsNewItem(false)
  }

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (isNewItem) {
      const newItem = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        author: '현재 사용자', // 실제로는 로그인한 사용자 정보 사용
        date: new Date().toISOString().split('T')[0]
      }

      if (activeTab === 'report') {
        setReports([...reports, newItem])
      } else {
        setMeetings([...meetings, newItem])
      }
    } else {
      // 수정 로직
      const updatedItem = {
        ...selectedItem,
        title: formData.title,
        content: formData.content
      }

      if (activeTab === 'report') {
        setReports(reports.map(item => item.id === selectedItem.id ? updatedItem : item))
      } else {
        setMeetings(meetings.map(item => item.id === selectedItem.id ? updatedItem : item))
      }
    }

    handleCloseDrawer()
  }

  // 검색 필터링
  const filteredItems = currentItems.filter(item => {
    const query = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.date.includes(query)
    )
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  return (
    <div className="page">
      <h1>보고서</h1>
      
      {/* 탭 */}
      <div className="report-tabs">
        <button
          className={`report-tab ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          보고서
        </button>
        <button
          className={`report-tab ${activeTab === 'meeting' ? 'active' : ''}`}
          onClick={() => setActiveTab('meeting')}
        >
          회의록
        </button>
      </div>

      {/* 검색 및 필터 바 */}
      <div className="report-controls">
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
        <button className="create-report-button" onClick={handleCreateItem}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {activeTab === 'report' ? '보고서 작성' : '회의록 작성'}
        </button>
      </div>

      {/* 목록 테이블 */}
      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>등록자</th>
              <th>등록일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} onClick={() => handleOpenDrawer(item)}>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.date}</td>
                <td>
                  <button className="more-button" onClick={(e) => {
                    e.stopPropagation()
                    handleOpenDrawer(item)
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
        title={isNewItem ? (activeTab === 'report' ? '새 보고서 작성' : '새 회의록 작성') : (activeTab === 'report' ? '보고서 상세' : '회의록 상세')}
      >
        {selectedItem && (
          <div className="drawer-form">
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="내용을 입력하세요"
                rows={10}
              />
            </div>
            <div className="drawer-actions">
              <button className="cancel-button" onClick={handleCloseDrawer}>취소</button>
              <button className="save-button" onClick={handleSave}>저장</button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}

export default ReportPage

