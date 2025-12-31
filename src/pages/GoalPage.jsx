import React, { useState, useEffect } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import SearchableSelect from '../components/SearchableSelect'
import Pagination from '../components/Pagination'
import './Page.css'
import './GoalPage.css'

const GoalPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewGoal, setIsNewGoal] = useState(false)
  const [goalAssignees, setGoalAssignees] = useState([])
  const [goalTeams, setGoalTeams] = useState([])
  const [newAssigneeInput, setNewAssigneeInput] = useState('')
  const [newTeamInput, setNewTeamInput] = useState('')
  const [selectedRegistrant, setSelectedRegistrant] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [achievementHistory, setAchievementHistory] = useState([])
  const [newAchievement, setNewAchievement] = useState({
    value: '',
    note: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 사용자 목록 (등록자 선택용)
  const userOptions = ['홍길동', '김철수', '이영희', '박민수', '최지영']

  // 샘플 데이터
  const [goals] = useState([
    {
      id: 1,
      title: '프로젝트 Alpha 완료',
      status: '진행중',
      startDate: '2024-01-15',
      endDate: '2024-03-31',
      content: '프로젝트 Alpha의 모든 기능을 완료하고 배포까지 진행합니다.',
      target: 100,
      registrant: '홍길동',
      assignees: ['김철수', '이영희'],
      teams: ['개발팀', '디자인팀'],
      achievementHistory: [
        { id: 1, date: '2024-01-20', value: 15, note: '초기 설계 완료' },
        { id: 2, date: '2024-02-05', value: 35, note: '핵심 기능 개발 완료' },
        { id: 3, date: '2024-02-20', value: 60, note: '테스트 진행 중' },
        { id: 4, date: '2024-03-05', value: 80, note: '버그 수정 완료' }
      ]
    },
    {
      id: 2,
      title: '신규 기능 개발',
      status: '진행중',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      content: '사용자 요청에 따른 신규 기능을 개발합니다.',
      target: 50,
      registrant: '김철수',
      assignees: ['박민수'],
      teams: ['개발팀'],
      achievementHistory: [
        { id: 1, date: '2024-02-10', value: 10, note: '요구사항 분석' },
        { id: 2, date: '2024-02-25', value: 25, note: '프로토타입 완성' },
        { id: 3, date: '2024-03-15', value: 40, note: '개발 진행 중' }
      ]
    },
    {
      id: 3,
      title: '시스템 최적화',
      status: '완료',
      startDate: '2024-01-01',
      endDate: '2024-02-28',
      content: '시스템 성능을 개선하고 최적화 작업을 진행합니다.',
      target: 80,
      registrant: '이영희',
      assignees: ['최지영', '홍길동'],
      teams: ['개발팀', '기획팀'],
      achievementHistory: [
        { id: 1, date: '2024-01-10', value: 20, note: '성능 측정 완료' },
        { id: 2, date: '2024-01-25', value: 45, note: '최적화 작업 진행' },
        { id: 3, date: '2024-02-10', value: 65, note: '주요 개선 완료' },
        { id: 4, date: '2024-02-25', value: 80, note: '최종 테스트 완료' }
      ]
    },
    {
      id: 4,
      title: '사용자 인터페이스 개선',
      status: '대기',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      content: '사용자 경험을 향상시키기 위한 UI/UX 개선 작업입니다.',
      target: 30,
      registrant: '박민수',
      assignees: [],
      teams: ['디자인팀'],
      achievementHistory: []
    },
    {
      id: 5,
      title: '데이터베이스 마이그레이션',
      status: '진행중',
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      content: '기존 데이터베이스를 새로운 시스템으로 마이그레이션합니다.',
      target: 90,
      registrant: '최지영',
      assignees: ['김철수', '박민수', '이영희'],
      teams: ['개발팀', '기획팀', '디자인팀'],
      achievementHistory: [
        { id: 1, date: '2024-02-20', value: 10, note: '데이터 백업 완료' },
        { id: 2, date: '2024-03-05', value: 30, note: '스키마 변환 완료' },
        { id: 3, date: '2024-03-20', value: 55, note: '데이터 마이그레이션 진행' },
        { id: 4, date: '2024-04-01', value: 75, note: '검증 작업 중' }
      ]
    }
  ])

  const handleOpenDrawer = (goal) => {
    setSelectedGoal(goal)
    setGoalAssignees([...goal.assignees])
    setGoalTeams([...goal.teams])
    setSelectedRegistrant(goal.registrant)
    setNewAssigneeInput('')
    setNewTeamInput('')
    setActiveTab(0)
    // 목표별 달성 이력 초기화 (샘플 데이터)
    setAchievementHistory(goal.achievementHistory || [])
    setNewAchievement({ value: '', note: '' })
    setIsNewGoal(false)
    setIsDrawerOpen(true)
  }

  const handleCreateGoal = () => {
    const today = new Date()
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const endDate = new Date(today)
    endDate.setMonth(endDate.getMonth() + 3)
    const endDateString = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`
    
    const newGoal = {
      id: Date.now(),
      title: '',
      status: '대기',
      startDate: todayString,
      endDate: endDateString,
      content: '',
      target: 0,
      registrant: '',
      assignees: [],
      teams: [],
      achievementHistory: []
    }
    setSelectedGoal(newGoal)
    setGoalAssignees([])
    setGoalTeams([])
    setSelectedRegistrant('')
    setNewAssigneeInput('')
    setNewTeamInput('')
    setActiveTab(0)
    setAchievementHistory([])
    setNewAchievement({ value: '', note: '' })
    setIsNewGoal(true)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedGoal(null)
    setGoalAssignees([])
    setGoalTeams([])
    setSelectedRegistrant('')
    setNewAssigneeInput('')
    setNewTeamInput('')
    setIsNewGoal(false)
  }

  const handleRemoveAssignee = (assigneeToRemove) => {
    setGoalAssignees(goalAssignees.filter(assignee => assignee !== assigneeToRemove))
  }

  const handleAddAssignee = () => {
    const trimmedInput = newAssigneeInput.trim()
    if (trimmedInput && !goalAssignees.includes(trimmedInput)) {
      setGoalAssignees([...goalAssignees, trimmedInput])
      setNewAssigneeInput('')
    }
  }

  const handleAssigneeInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddAssignee()
    }
  }

  const handleRemoveTeam = (teamToRemove) => {
    setGoalTeams(goalTeams.filter(team => team !== teamToRemove))
  }

  const handleAddTeam = () => {
    const trimmedInput = newTeamInput.trim()
    if (trimmedInput && !goalTeams.includes(trimmedInput)) {
      setGoalTeams([...goalTeams, trimmedInput])
      setNewTeamInput('')
    }
  }

  const handleTeamInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTeam()
    }
  }

  // 달성 이력 추가
  const handleAddAchievement = () => {
    if (newAchievement.value) {
      const today = new Date()
      const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      
      const achievement = {
        id: Date.now(),
        date: dateString,
        value: parseFloat(newAchievement.value),
        note: newAchievement.note
      }
      setAchievementHistory([...achievementHistory, achievement])
      setNewAchievement({ value: '', note: '' })
    }
  }

  // 달성 이력 삭제
  const handleRemoveAchievement = (id) => {
    setAchievementHistory(achievementHistory.filter(item => item.id !== id))
  }

  // 검색 필터링
  const filteredGoals = goals.filter(goal => {
    const query = searchQuery.toLowerCase()
    return (
      goal.title.toLowerCase().includes(query) ||
      goal.status.toLowerCase().includes(query) ||
      goal.registrant.toLowerCase().includes(query)
    )
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredGoals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedGoals = filteredGoals.slice(startIndex, endIndex)

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

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="page">
      <h1>Goals</h1>
      
      {/* 검색 및 필터 바 */}
      <div className="goal-controls">
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
        <button className="create-goal-button" onClick={handleCreateGoal}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          목표 생성
        </button>
      </div>

      {/* 목표 목록 테이블 */}
      <div className="goal-table-container">
        <table className="goal-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>상태</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>등록자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedGoals.map((goal) => (
              <tr key={goal.id} onClick={() => handleOpenDrawer(goal)}>
                <td>{goal.title}</td>
                <td>
                  {renderStatusBadge(goal.status)}
                </td>
                <td>{formatDate(goal.startDate)}</td>
                <td>{formatDate(goal.endDate)}</td>
                <td>{goal.registrant}</td>
                <td>
                  <button className="more-button" onClick={(e) => {
                    e.stopPropagation()
                    handleOpenDrawer(goal)
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
        title="Goal Details"
      >
        {selectedGoal && (
          <div className="goal-detail-container">
            {/* 탭 메뉴 - 새 목표 생성 시 숨김 */}
            {!isNewGoal && (
              <div className="goal-tabs">
                <button
                  className={`goal-tab ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  상세 정보
                </button>
                <button
                  className={`goal-tab ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  이력
                </button>
                <button
                  className={`goal-tab ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  그래프
                </button>
              </div>
            )}

            {/* 탭 컨텐츠 */}
            <div className="goal-tab-content">
              {(activeTab === 0 || isNewGoal) && (
                <div className="drawer-form">
            <div className="form-group">
              <label>제목</label>
              <input type="text" defaultValue={selectedGoal.title} />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea 
                defaultValue={selectedGoal.content}
                rows={5}
                placeholder="목표에 대한 상세 내용을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>목표치</label>
              <input type="number" defaultValue={selectedGoal.target} min="0" step="1" />
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
                <select defaultValue={selectedGoal.status} className="custom-select">
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
              <label>시작일</label>
              <input type="date" defaultValue={selectedGoal.startDate} />
            </div>
            <div className="form-group">
              <label>종료일</label>
              <input type="date" defaultValue={selectedGoal.endDate} />
            </div>
            <div className="form-group">
              <label>담당자 목록</label>
              <div className="assignees-container">
                {goalAssignees.map((assignee, index) => (
                  <span key={index} className="assignee-tag">
                    {assignee}
                    <button
                      type="button"
                      className="assignee-tag-remove"
                      onClick={() => handleRemoveAssignee(assignee)}
                      title="담당자 제거"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="assignee-input-wrapper">
                <input
                  type="text"
                  className="assignee-input"
                  placeholder="담당자 이름을 입력하세요"
                  value={newAssigneeInput}
                  onChange={(e) => setNewAssigneeInput(e.target.value)}
                  onKeyPress={handleAssigneeInputKeyPress}
                />
                <button
                  type="button"
                  className="assignee-add-button"
                  onClick={handleAddAssignee}
                  disabled={!newAssigneeInput.trim() || goalAssignees.includes(newAssigneeInput.trim())}
                >
                  추가
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>팀 목록</label>
              <div className="teams-container">
                {goalTeams.map((team, index) => (
                  <span key={index} className="team-tag">
                    {team}
                    <button
                      type="button"
                      className="team-tag-remove"
                      onClick={() => handleRemoveTeam(team)}
                      title="팀 제거"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="team-input-wrapper">
                <input
                  type="text"
                  className="team-input"
                  placeholder="팀 이름을 입력하세요"
                  value={newTeamInput}
                  onChange={(e) => setNewTeamInput(e.target.value)}
                  onKeyPress={handleTeamInputKeyPress}
                />
                <button
                  type="button"
                  className="team-add-button"
                  onClick={handleAddTeam}
                  disabled={!newTeamInput.trim() || goalTeams.includes(newTeamInput.trim())}
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
                <div className="achievement-history-tab">
                  <div className="achievement-form">
                    <h3>이력 등록</h3>
                    <div className="form-group">
                      <label>달성치</label>
                      <input
                        type="number"
                        value={newAchievement.value}
                        onChange={(e) => setNewAchievement({ ...newAchievement, value: e.target.value })}
                        placeholder="달성한 수치를 입력하세요"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="form-group">
                      <label>비고</label>
                      <textarea
                        value={newAchievement.note}
                        onChange={(e) => setNewAchievement({ ...newAchievement, note: e.target.value })}
                        placeholder="비고를 입력하세요"
                        rows={3}
                      />
                    </div>
                    <button
                      className="add-achievement-button"
                      onClick={handleAddAchievement}
                      disabled={!newAchievement.value}
                    >
                      등록
                    </button>
                  </div>

                  <div className="achievement-list">
                    <h3>이력 목록</h3>
                    {achievementHistory.length > 0 ? (
                      <div className="achievement-table-container">
                        <table className="achievement-table">
                          <thead>
                            <tr>
                              <th>날짜</th>
                              <th>달성치</th>
                              <th>비고</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {achievementHistory
                              .sort((a, b) => new Date(b.date) - new Date(a.date))
                              .map((item) => (
                                <tr key={item.id}>
                                  <td>{formatDate(item.date)}</td>
                                  <td>{item.value}</td>
                                  <td>{item.note || '-'}</td>
                                  <td>
                                    <button
                                      className="delete-achievement-button"
                                      onClick={() => handleRemoveAchievement(item.id)}
                                      title="삭제"
                                    >
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L12 12M12 4L4 12" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="no-achievement-message">
                        등록된 달성 이력이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="graph-tab">
                  <h3>달성 현황 그래프</h3>
                  {achievementHistory.length > 0 ? (
                    <div className="graph-container">
                      <svg className="goal-chart" viewBox="0 0 400 250">
                        {/* 그리드 라인 */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={`grid-${i}`}
                            x1="40"
                            y1={40 + i * 40}
                            x2="380"
                            y2={40 + i * 40}
                            stroke="#e0e0e0"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Y축 라벨 */}
                        {selectedGoal && (() => {
                          const maxValue = achievementHistory.length > 0
                            ? Math.max(selectedGoal.target, ...achievementHistory.map(a => a.value))
                            : selectedGoal.target || 100
                          const step = maxValue / 4
                          return [0, 1, 2, 3, 4].map((i) => (
                            <text
                              key={`y-label-${i}`}
                              x="35"
                              y={45 + i * 40}
                              textAnchor="end"
                              fontSize="12"
                              fill="#666"
                            >
                              {Math.round(maxValue - i * step)}
                            </text>
                          ))
                        })()}

                        {/* 목표치 라인 */}
                        {selectedGoal && (() => {
                          const maxValue = achievementHistory.length > 0
                            ? Math.max(selectedGoal.target, ...achievementHistory.map(a => a.value))
                            : selectedGoal.target || 100
                          const targetY = 40 + (1 - selectedGoal.target / maxValue) * 160
                          return (
                            <>
                              <line
                                x1="40"
                                y1={targetY}
                                x2="380"
                                y2={targetY}
                                stroke="#4A90E2"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                              />
                              <text
                                x="385"
                                y={targetY}
                                fontSize="11"
                                fill="#4A90E2"
                                fontWeight="500"
                              >
                                목표: {selectedGoal.target}
                              </text>
                            </>
                          )
                        })()}

                        {/* 데이터 포인트와 라인 */}
                        {achievementHistory.length > 0 && (() => {
                          const sortedHistory = [...achievementHistory].sort((a, b) => new Date(a.date) - new Date(b.date))
                          const maxValue = Math.max(selectedGoal.target, ...sortedHistory.map(a => a.value))
                          
                          // 날짜 범위 계산
                          const dates = sortedHistory.map(a => new Date(a.date))
                          const minDate = new Date(Math.min(...dates))
                          const maxDate = new Date(Math.max(...dates))
                          const dateRange = maxDate - minDate || 1 // 0으로 나누기 방지
                          
                          // 날짜를 x축 좌표로 변환
                          const points = sortedHistory.map((item) => {
                            const date = new Date(item.date)
                            const x = 40 + ((date - minDate) / dateRange) * 340
                            const y = 200 - (item.value / maxValue) * 160
                            return { x, y, value: item.value, date: item.date }
                          })

                          // 라인 그리기
                          const pathData = points.map((point, index) => 
                            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                          ).join(' ')

                          // X축 날짜 라벨
                          const dateLabels = sortedHistory.length > 1 
                            ? sortedHistory.map((item, index) => {
                                const date = new Date(item.date)
                                const x = 40 + ((date - minDate) / dateRange) * 340
                                return { x, date: item.date, index }
                              })
                            : sortedHistory.map((item) => {
                                const date = new Date(item.date)
                                const x = 40 + ((date - minDate) / dateRange) * 340
                                return { x, date: item.date, index: 0 }
                              })

                          return (
                            <>
                              <path
                                d={pathData}
                                fill="none"
                                stroke="#1976D2"
                                strokeWidth="2"
                              />
                              {/* 포인트 */}
                              {points.map((point, index) => (
                                <g key={index}>
                                  <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="4"
                                    fill="#1976D2"
                                  />
                                  <title>{`${formatDate(point.date)}: ${point.value}`}</title>
                                </g>
                              ))}
                              {/* X축 날짜 라벨 */}
                              {dateLabels.length <= 8 ? (
                                dateLabels.map((label, index) => (
                                  <text
                                    key={`date-label-${index}`}
                                    x={label.x}
                                    y="220"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#666"
                                  >
                                    {formatDate(label.date).substring(5)}
                                  </text>
                                ))
                              ) : (
                                // 데이터가 많으면 일부만 표시
                                dateLabels.filter((_, index) => index % Math.ceil(dateLabels.length / 6) === 0).map((label, index) => (
                                  <text
                                    key={`date-label-${index}`}
                                    x={label.x}
                                    y="220"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#666"
                                  >
                                    {formatDate(label.date).substring(5)}
                                  </text>
                                ))
                              )}
                            </>
                          )
                        })()}

                        {/* X축 */}
                        <line
                          x1="40"
                          y1="200"
                          x2="380"
                          y2="200"
                          stroke="#333"
                          strokeWidth="2"
                        />

                        {/* Y축 */}
                        <line
                          x1="40"
                          y1="40"
                          x2="40"
                          y2="200"
                          stroke="#333"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="no-graph-message">
                      그래프를 표시하려면 달성 이력을 등록해주세요.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}

export default GoalPage
