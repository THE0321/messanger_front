import React, { useState } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import './Page.css'
import './UserPage.css'

const UserPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // 샘플 데이터
  const [users] = useState([
    {
      id: 1,
      email: 'hong@example.com',
      name: '홍길동',
      phone: '010-1234-5678',
      isAdmin: true,
      isTeamLead: false,
      teams: ['개발팀', '디자인팀']
    },
    {
      id: 2,
      email: 'kim@example.com',
      name: '김철수',
      phone: '010-2345-6789',
      isAdmin: false,
      isTeamLead: true,
      teams: ['개발팀']
    },
    {
      id: 3,
      email: 'lee@example.com',
      name: '이영희',
      phone: '010-3456-7890',
      isAdmin: false,
      isTeamLead: false,
      teams: ['마케팅팀']
    },
    {
      id: 4,
      email: 'park@example.com',
      name: '박민수',
      phone: '010-4567-8901',
      isAdmin: true,
      isTeamLead: true,
      teams: ['개발팀', '기획팀', '디자인팀']
    },
    {
      id: 5,
      email: 'choi@example.com',
      name: '최지영',
      phone: '010-5678-9012',
      isAdmin: false,
      isTeamLead: false,
      teams: []
    }
  ])

  const [userTeams, setUserTeams] = useState([])
  const [newTeamInput, setNewTeamInput] = useState('')

  const handleOpenDrawer = (user) => {
    setSelectedUser(user)
    setUserTeams([...user.teams])
    setNewTeamInput('')
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedUser(null)
    setUserTeams([])
    setNewTeamInput('')
  }

  const handleRemoveTeam = (teamToRemove) => {
    setUserTeams(userTeams.filter(team => team !== teamToRemove))
  }

  const handleAddTeam = () => {
    const trimmedInput = newTeamInput.trim()
    if (trimmedInput && !userTeams.includes(trimmedInput)) {
      setUserTeams([...userTeams, trimmedInput])
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
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase()
    return (
      user.email.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query)
    )
  })

  // 권한 배지 렌더링 함수
  const renderRoleBadges = (user) => {
    if (!user.isAdmin && !user.isTeamLead) {
      return (
        <span className="status-badge role-normal">일반</span>
      )
    }
    
    return (
      <div className="role-badges-container">
        {user.isAdmin && (
          <span className="status-badge role-admin">관리자</span>
        )}
        {user.isTeamLead && (
          <span className="status-badge role-team-lead">팀장</span>
        )}
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Users</h1>
      
      {/* 검색 및 필터 바 */}
      <div className="user-controls">
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

      {/* 유저 목록 테이블 */}
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>권한</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} onClick={() => handleOpenDrawer(user)}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  {renderRoleBadges(user)}
                </td>
                <td>
                  <button className="more-button" onClick={(e) => {
                    e.stopPropagation()
                    handleOpenDrawer(user)
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
        title="User Details"
      >
        {selectedUser && (
          <div className="drawer-form">
            <div className="form-group">
              <label>이메일</label>
              <input type="email" defaultValue={selectedUser.email} />
            </div>
            <div className="form-group">
              <label>이름</label>
              <input type="text" defaultValue={selectedUser.name} />
            </div>
            <div className="form-group">
              <label>전화번호</label>
              <input type="tel" defaultValue={selectedUser.phone} />
            </div>
            <div className="form-group">
              <label>관리자 여부</label>
              <div className="radio-group radio-group-admin">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isAdmin" 
                    value="Y" 
                    defaultChecked={selectedUser.isAdmin}
                  />
                  <span className="radio-badge">관리자</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isAdmin" 
                    value="N" 
                    defaultChecked={!selectedUser.isAdmin}
                  />
                  <span className="radio-badge">일반</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>팀장 여부</label>
              <div className="radio-group radio-group-team-lead">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isTeamLead" 
                    value="Y" 
                    defaultChecked={selectedUser.isTeamLead}
                  />
                  <span className="radio-badge">팀장</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isTeamLead" 
                    value="N" 
                    defaultChecked={!selectedUser.isTeamLead}
                  />
                  <span className="radio-badge">일반</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>팀 목록</label>
              <div className="teams-container">
                {userTeams.map((team, index) => (
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
                  disabled={!newTeamInput.trim() || userTeams.includes(newTeamInput.trim())}
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

export default UserPage
