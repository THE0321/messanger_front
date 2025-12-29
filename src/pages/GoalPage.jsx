import React, { useState } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import SearchableSelect from '../components/SearchableSelect'
import './Page.css'
import './GoalPage.css'

const GoalPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [goalAssignees, setGoalAssignees] = useState([])
  const [goalTeams, setGoalTeams] = useState([])
  const [newAssigneeInput, setNewAssigneeInput] = useState('')
  const [newTeamInput, setNewTeamInput] = useState('')
  const [selectedRegistrant, setSelectedRegistrant] = useState('')

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
      teams: ['개발팀', '디자인팀']
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
      teams: ['개발팀']
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
      teams: ['개발팀', '기획팀']
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
      teams: ['디자인팀']
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
      teams: ['개발팀', '기획팀', '디자인팀']
    }
  ])

  const handleOpenDrawer = (goal) => {
    setSelectedGoal(goal)
    setGoalAssignees([...goal.assignees])
    setGoalTeams([...goal.teams])
    setSelectedRegistrant(goal.registrant)
    setNewAssigneeInput('')
    setNewTeamInput('')
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

  // 검색 필터링
  const filteredGoals = goals.filter(goal => {
    const query = searchQuery.toLowerCase()
    return (
      goal.title.toLowerCase().includes(query) ||
      goal.status.toLowerCase().includes(query) ||
      goal.registrant.toLowerCase().includes(query)
    )
  })

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
            {filteredGoals.map((goal) => (
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
      
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Goal Details"
      >
        {selectedGoal && (
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
      </DetailDrawer>
    </div>
  )
}

export default GoalPage
