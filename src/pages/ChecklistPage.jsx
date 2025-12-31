import React, { useState, useEffect } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import SearchableSelect from '../components/SearchableSelect'
import Pagination from '../components/Pagination'
import './Page.css'
import './ChecklistPage.css'

const ChecklistPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedChecklist, setSelectedChecklist] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [selectedRegistrant, setSelectedRegistrant] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [checkHistory, setCheckHistory] = useState([])
  const [checklistItems, setChecklistItems] = useState([])
  const [isNewChecklist, setIsNewChecklist] = useState(false)
  const [newItemInput, setNewItemInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 사용자 목록 (등록자 선택용)
  const userOptions = ['홍길동', '김철수', '이영희', '박민수', '최지영']

  // 샘플 데이터
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      title: '프로젝트 Alpha 체크리스트',
      status: '진행중',
      registrant: '홍길동',
      items: [
        { id: 1, title: '요구사항 분석 완료', checked: true },
        { id: 2, title: '디자인 시안 확정', checked: true },
        { id: 3, title: '개발 환경 구축', checked: false },
        { id: 4, title: '기능 개발 완료', checked: false },
        { id: 5, title: '테스트 완료', checked: false }
      ]
    },
    {
      id: 2,
      title: '신규 기능 개발 체크리스트',
      status: '진행중',
      registrant: '김철수',
      items: [
        { id: 1, title: '기능 명세서 작성', checked: true },
        { id: 2, title: 'API 설계', checked: true },
        { id: 3, title: '프론트엔드 개발', checked: false },
        { id: 4, title: '백엔드 개발', checked: false }
      ]
    },
    {
      id: 3,
      title: '시스템 최적화 체크리스트',
      status: '완료',
      registrant: '이영희',
      items: [
        { id: 1, title: '성능 측정', checked: true },
        { id: 2, title: '병목 지점 분석', checked: true },
        { id: 3, title: '최적화 작업', checked: true },
        { id: 4, title: '재측정 및 검증', checked: true }
      ]
    },
    {
      id: 4,
      title: 'UI/UX 개선 체크리스트',
      status: '대기',
      registrant: '박민수',
      items: [
        { id: 1, title: '사용자 피드백 수집', checked: false },
        { id: 2, title: '개선 사항 도출', checked: false },
        { id: 3, title: '디자인 수정', checked: false }
      ]
    },
    {
      id: 5,
      title: '데이터베이스 마이그레이션 체크리스트',
      status: '진행중',
      registrant: '최지영',
      items: [
        { id: 1, title: '백업 완료', checked: true },
        { id: 2, title: '스키마 설계', checked: true },
        { id: 3, title: '데이터 마이그레이션', checked: false },
        { id: 4, title: '검증 및 테스트', checked: false }
      ]
    }
  ])

  const handleOpenDrawer = (checklist) => {
    setSelectedChecklist(checklist)
    setSelectedRegistrant(checklist.registrant)
    setChecklistItems([...checklist.items])
    setNewItemInput('')
    setActiveTab(0)
    setIsNewChecklist(false)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedChecklist(null)
    setSelectedRegistrant('')
    setChecklistItems([])
    setNewItemInput('')
    setActiveTab(0)
    setIsNewChecklist(false)
  }

  const handleCreateChecklist = () => {
    const newChecklist = {
      id: Date.now(),
      title: '',
      status: '대기',
      registrant: '',
      items: []
    }
    setSelectedChecklist(newChecklist)
    setSelectedRegistrant('')
    setChecklistItems([])
    setNewItemInput('')
    setActiveTab(0)
    setIsNewChecklist(true)
    setIsDrawerOpen(true)
  }

  const handleAddItem = () => {
    const trimmedInput = newItemInput.trim()
    if (trimmedInput) {
      const newItem = {
        id: Date.now(),
        title: trimmedInput,
        checked: false
      }
      setChecklistItems([...checklistItems, newItem])
      setNewItemInput('')
    }
  }

  const handleRemoveItem = (itemId) => {
    setChecklistItems(checklistItems.filter(item => item.id !== itemId))
  }

  const handleItemInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddItem()
    }
  }

  const handleItemTitleChange = (itemId, newTitle) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === itemId ? { ...item, title: newTitle } : item
    ))
  }

  const toggleExpand = (checklistId) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(checklistId)) {
      newExpanded.delete(checklistId)
    } else {
      newExpanded.add(checklistId)
    }
    setExpandedItems(newExpanded)
  }

  const toggleItemCheck = (checklistId, itemId) => {
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          items: checklist.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        }
      }
      return checklist
    })
    // 실제로는 상태 업데이트가 필요하지만, 샘플 데이터이므로 주석 처리
    // setChecklists(updatedChecklists)
  }

  // 검색 필터링
  const filteredChecklists = checklists.filter(checklist => {
    const query = searchQuery.toLowerCase()
    return (
      checklist.title.toLowerCase().includes(query) ||
      checklist.status.toLowerCase().includes(query) ||
      checklist.registrant.toLowerCase().includes(query)
    )
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredChecklists.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedChecklists = filteredChecklists.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // 상태 배지 렌더링 함수
  const renderStatusBadge = (status) => {
    const statusClass = {
      '진행중': 'status-in-progress',
      '완료': 'status-completed',
      '대기': 'status-pending'
    }[status] || 'status-default'

    return (
      <span className={`status-badge ${statusClass}`}>
        {status}
      </span>
    )
  }

  // 체크 여부 렌더링 함수
  const renderCheckStatus = (checked) => {
    return (
      <span className={`check-status ${checked ? 'checked' : 'unchecked'}`}>
        {checked ? 'Y' : 'N'}
      </span>
    )
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 체크리스트 항목 체크 처리 (내용 입력 포함)
  const handleItemCheck = (itemId, checked, note = '') => {
    const updatedItems = checklistItems.map(item =>
      item.id === itemId ? { ...item, checked } : item
    )
    setChecklistItems(updatedItems)

    // 체크/해제 모두 이력 추가
    if (selectedChecklist) {
      const item = checklistItems.find(i => i.id === itemId)
      const newHistory = {
        id: Date.now(),
        checklistId: selectedChecklist.id,
        itemId: itemId,
        itemTitle: item.title,
        note: note,
        date: new Date().toISOString(),
        checked: checked
      }
      setCheckHistory(prev => [...prev, newHistory])
    }
  }

  // 체크박스 클릭 시 내용 입력 모달
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const [pendingItemId, setPendingItemId] = useState(null)
  const [pendingChecked, setPendingChecked] = useState(false)
  const [pendingChecklistId, setPendingChecklistId] = useState(null)

  const handleCheckboxClick = (itemId, currentChecked) => {
    // 체크/해제 모두 모달 표시
    setPendingItemId(itemId)
    setPendingChecked(!currentChecked)
    setNoteInput('')
    setShowNoteModal(true)
  }

  const handleConfirmCheck = () => {
    if (pendingItemId !== null) {
      if (pendingChecklistId) {
        // 목록에서 직접 클릭한 경우
        handleListItemCheck(pendingChecklistId, pendingItemId, pendingChecked, noteInput)
      } else {
        // 상세 페이지에서 클릭한 경우
        handleItemCheck(pendingItemId, pendingChecked, noteInput)
      }
      setShowNoteModal(false)
      setPendingItemId(null)
      setPendingChecked(false)
      setPendingChecklistId(null)
      setNoteInput('')
    }
  }

  const handleCancelCheck = () => {
    setShowNoteModal(false)
    setPendingItemId(null)
    setPendingChecked(false)
    setPendingChecklistId(null)
    setNoteInput('')
  }

  // 목록에서 직접 체크 상태 변경
  const handleListItemCheck = (checklistId, itemId, checked, note = '') => {
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map(item =>
          item.id === itemId ? { ...item, checked } : item
        )
        return { ...checklist, items: updatedItems }
      }
      return checklist
    })
    setChecklists(updatedChecklists)

    // 이력 추가
    if (checked) {
      const checklist = checklists.find(c => c.id === checklistId)
      const item = checklist?.items.find(i => i.id === itemId)
      if (item) {
        const newHistory = {
          id: Date.now(),
          checklistId: checklistId,
          itemId: itemId,
          itemTitle: item.title,
          note: note,
          date: new Date().toISOString(),
          checked: true
        }
        setCheckHistory(prev => [...prev, newHistory])
      }
    } else {
      // 체크 해제 시 이력 추가
      const checklist = checklists.find(c => c.id === checklistId)
      const item = checklist?.items.find(i => i.id === itemId)
      if (item) {
        const newHistory = {
          id: Date.now(),
          checklistId: checklistId,
          itemId: itemId,
          itemTitle: item.title,
          note: note,
          date: new Date().toISOString(),
          checked: false
        }
        setCheckHistory(prev => [...prev, newHistory])
      }
    }
  }

  // 현재 체크리스트의 이력 필터링
  const currentCheckHistory = selectedChecklist
    ? checkHistory.filter(h => h.checklistId === selectedChecklist.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    : []

  // 완료율 계산
  const getCompletionRate = () => {
    if (!selectedChecklist || !checklistItems.length) return 0
    const checkedCount = checklistItems.filter(item => item.checked).length
    return Math.round((checkedCount / checklistItems.length) * 100)
  }

  return (
    <div className="page">
      <h1>Checklist</h1>
      
      {/* 검색 및 필터 바 */}
      <div className="checklist-controls">
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
        <button className="create-checklist-button" onClick={handleCreateChecklist}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          체크리스트 생성
        </button>
      </div>

      {/* 체크리스트 목록 테이블 */}
      <div className="checklist-table-container">
        <table className="checklist-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}></th>
              <th>제목</th>
              <th>상태</th>
              <th>등록자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedChecklists.map((checklist) => {
              const isExpanded = expandedItems.has(checklist.id)
              return (
                <React.Fragment key={checklist.id}>
                  {/* 1레벨 행 */}
                  <tr 
                    className="checklist-row-main"
                    onClick={() => handleOpenDrawer(checklist)}
                  >
                    <td>
                      <button 
                        className="expand-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(checklist.id)
                        }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ 
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        >
                          <path d="M6 4L10 8L6 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                    <td>{checklist.title}</td>
                    <td>
                      {renderStatusBadge(checklist.status)}
                    </td>
                    <td>{checklist.registrant}</td>
                    <td>
                      <button className="more-button" onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDrawer(checklist)
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="4" cy="8" r="1" fill="#666"/>
                          <circle cx="8" cy="8" r="1" fill="#666"/>
                          <circle cx="12" cy="8" r="1" fill="#666"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {/* 하위 레벨 행들 */}
                  {isExpanded && checklist.items.map((item) => (
                    <tr 
                      key={item.id} 
                      className="checklist-row-sub"
                    >
                      <td></td>
                      <td className="sub-item-title">
                        <span className="sub-item-indicator">└</span>
                        {item.title}
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          className="check-status-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPendingChecklistId(checklist.id)
                            handleCheckboxClick(item.id, item.checked)
                          }}
                        >
                          {renderCheckStatus(item.checked)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
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
        title="Checklist Details"
      >
        {selectedChecklist && (
          <div className="checklist-detail-container">
            {/* 탭 메뉴 - 새 체크리스트 생성 시 숨김 */}
            {!isNewChecklist && (
              <div className="checklist-tabs">
                <button
                  className={`checklist-tab ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  상세 정보
                </button>
                <button
                  className={`checklist-tab ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  이력
                </button>
                <button
                  className={`checklist-tab ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  그래프
                </button>
              </div>
            )}

            {/* 탭 컨텐츠 */}
            <div className="checklist-tab-content">
              {(activeTab === 0 || isNewChecklist) && (
                <div className="drawer-form">
                  <div className="form-group">
                    <label>제목</label>
                    <input type="text" defaultValue={selectedChecklist.title} />
                  </div>
                  <div className="form-group">
                    <label>등록자</label>
                    <SearchableSelect
                      options={userOptions}
                      value={selectedRegistrant}
                      onChange={setSelectedRegistrant}
                      placeholder="등록자를 선택하세요"
                    />
                  </div>
                  <div className="form-group">
                    <label>상태</label>
                    <div className="custom-select-wrapper">
                      <select defaultValue={selectedChecklist.status} className="custom-select">
                        <option value="대기">대기</option>
                        <option value="진행중">진행중</option>
                        <option value="완료">완료</option>
                      </select>
                      <div className="custom-select-arrow">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>체크리스트 항목</label>
                    <div className="checklist-items-container">
                      {checklistItems.map((item) => (
                        <div key={item.id} className="checklist-item-row">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheckboxClick(item.id, item.checked)}
                            className="checklist-item-checkbox"
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleItemTitleChange(item.id, e.target.value)}
                            className="checklist-item-input"
                          />
                          <button
                            type="button"
                            className="checklist-item-remove"
                            onClick={() => handleRemoveItem(item.id)}
                            title="항목 삭제"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4L4 12M4 4L12 12" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                      {checklistItems.length === 0 && (
                        <div className="no-items-message">
                          체크리스트 항목이 없습니다. 아래에서 항목을 추가할 수 있습니다.
                        </div>
                      )}
                    </div>
                    <div className="checklist-item-add-wrapper">
                      <input
                        type="text"
                        className="checklist-item-add-input"
                        placeholder="항목 제목을 입력하세요"
                        value={newItemInput}
                        onChange={(e) => setNewItemInput(e.target.value)}
                        onKeyPress={handleItemInputKeyPress}
                      />
                      <button
                        type="button"
                        className="checklist-item-add-button"
                        onClick={handleAddItem}
                        disabled={!newItemInput.trim()}
                      >
                        추가
                      </button>
                    </div>
                  </div>
                  <div className="drawer-actions">
                    <button className="cancel-button" onClick={handleCloseDrawer}>Cancel</button>
                    <button className="save-button">Save</button>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="check-history-tab">
                  <h3>체크 이력</h3>
                  {currentCheckHistory.length > 0 ? (
                    <div className="history-table-container">
                      <table className="history-table">
                        <thead>
                          <tr>
                            <th>날짜</th>
                            <th>항목</th>
                            <th>내용</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCheckHistory.map((item) => (
                            <tr key={item.id}>
                              <td>{formatDate(item.date)}</td>
                              <td>{item.itemTitle}</td>
                              <td>{item.note || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-history-message">
                      등록된 체크 이력이 없습니다.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <div className="graph-tab">
                  <h3>완료 현황 그래프</h3>
                  {checklistItems.length > 0 ? (
                    <div className="graph-container">
                      <div className="completion-rate">
                        <div className="completion-rate-value">{getCompletionRate()}%</div>
                        <div className="completion-rate-label">완료율</div>
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${getCompletionRate()}%` }}
                        ></div>
                      </div>
                      <div className="completion-stats">
                        <div className="stat-item">
                          <span className="stat-label">완료</span>
                          <span className="stat-value">
                            {checklistItems.filter(item => item.checked).length} / {checklistItems.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-graph-message">
                      체크리스트 항목이 없습니다.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* 내용 입력 모달 */}
      {showNoteModal && (
        <div className="note-modal-overlay" onClick={handleCancelCheck}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="note-modal-header">
              <h3>{pendingChecked ? '체크 내용 입력' : '체크 해제 내용 입력'}</h3>
              <button className="note-modal-close" onClick={handleCancelCheck}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="note-modal-content">
              <div className="form-group">
                <label>내용</label>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder={pendingChecked ? '체크 내용을 입력하세요' : '체크 해제 내용을 입력하세요'}
                  rows={4}
                  className="note-input"
                />
              </div>
            </div>
            <div className="note-modal-actions">
              <button className="cancel-button" onClick={handleCancelCheck}>취소</button>
              <button className="save-button" onClick={handleConfirmCheck}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChecklistPage
