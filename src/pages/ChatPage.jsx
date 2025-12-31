import React, { useState, useEffect } from 'react'
import { useChatAI } from '../contexts/ChatAIContext'
import DetailDrawer from '../components/DetailDrawer'
import './ChatPage.css'
import './Page.css'

const ChatPage = () => {
  const { setShowChatAI } = useChatAI()
  const [selectedRoom, setSelectedRoom] = useState(1)
  const [roomSearch, setRoomSearch] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [showMembersPanel, setShowMembersPanel] = useState(false)
  const [memberSearch, setMemberSearch] = useState('')
  const [isRoomDrawerOpen, setIsRoomDrawerOpen] = useState(false)
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null)
  const [isNewRoom, setIsNewRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomMembers, setRoomMembers] = useState([])
  const [newMemberInput, setNewMemberInput] = useState('')
  const [isRoomDetailOpen, setIsRoomDetailOpen] = useState(false)

  useEffect(() => {
    setShowChatAI(true)
    return () => {
      // 채팅 페이지를 벗어날 때는 AI Assistant를 유지
    }
  }, [setShowChatAI])

  const [chatRooms, setChatRooms] = useState([
    {
      id: 1,
      name: 'Project Alpha Team',
      lastMessage: 'Project Al...',
      time: '7m',
      icon: 'blue',
      members: [1, 2, 3]
    },
    {
      id: 2,
      name: 'General Discussion',
      lastMessage: 'General ...',
      time: '5m ago',
      icon: 'gray',
      members: [1, 4, 5]
    },
    {
      id: 3,
      name: 'Project Alpha Team',
      lastMessage: 'Project *...',
      time: '16n ago',
      icon: 'blue',
      members: [2, 3, 6]
    },
    {
      id: 4,
      name: 'General Discussion',
      lastMessage: 'General ...',
      time: '20n ago',
      icon: 'gray',
      members: [1, 7, 8]
    },
    {
      id: 5,
      name: 'Project Alpha Team',
      lastMessage: 'Alpha t ...',
      time: '16n ago',
      icon: 'blue',
      members: [3, 4, 5]
    }
  ])

  const currentUser = 'You'
  const messages = [
    {
      id: 1,
      sender: 'Sarnen Users',
      text: 'Hey, hians are you to nioleads design. mockup to the evolistions from ournockup. a am potents our project.',
      time: '10:30',
      files: [{ name: 'design_mockup.png', type: 'image' }]
    },
    {
      id: 2,
      sender: currentUser,
      text: 'Hello, anvent be uploaded file that any project to brinoo the eventions an your eventions and project our project.',
      time: '10:32'
    },
    {
      id: 3,
      sender: 'Sarnen Users',
      text: 'Hi, Hoa what the bowriert want to rlure, requirements.pdf.',
      time: '10:35',
      files: [{ name: 'requirements.pdf', type: 'pdf' }]
    }
  ]


  const members = [
    { id: 1, name: 'Sarnen Users' },
    { id: 2, name: 'Anveni' },
    { id: 3, name: 'Hoa' },
    { id: 4, name: 'John Doe' },
    { id: 5, name: 'Jane Smith' },
    { id: 6, name: 'Bob Wilson' },
    { id: 7, name: 'Alice Brown' },
    { id: 8, name: 'Charlie Davis' },
    { id: 9, name: 'Diana Miller' },
    { id: 10, name: 'Edward Garcia' },
    { id: 11, name: 'Fiona Martinez' },
    { id: 12, name: 'George Lee' },
    { id: 13, name: 'Helen White' },
    { id: 14, name: 'Ian Harris' },
    { id: 15, name: 'Julia Clark' },
    { id: 16, name: 'Kevin Lewis' },
    { id: 17, name: 'Laura Walker' }
  ]

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase())
  )

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // 메시지 전송 로직
      setInputValue('')
    }
  }

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handler()
    }
  }

  const handleCreateRoom = () => {
    const newRoom = {
      id: Date.now(),
      name: '',
      lastMessage: '',
      time: 'now',
      icon: 'blue',
      members: []
    }
    setSelectedRoomForEdit(newRoom)
    setRoomName('')
    setRoomMembers([])
    setNewMemberInput('')
    setIsNewRoom(true)
    setIsRoomDrawerOpen(true)
  }

  const handleEditRoom = (room) => {
    setSelectedRoomForEdit(room)
    setRoomName(room.name)
    // members가 ID 배열이면 이름 배열로 변환, 이미 이름 배열이면 그대로 사용
    const memberNames = (room.members || []).map(memberId => {
      if (typeof memberId === 'number') {
        const member = members.find(m => m.id === memberId)
        return member ? member.name : ''
      }
      return memberId
    }).filter(name => name)
    setRoomMembers(memberNames)
    setNewMemberInput('')
    setIsNewRoom(false)
    setIsRoomDrawerOpen(true)
  }

  const handleCloseRoomDrawer = () => {
    setIsRoomDrawerOpen(false)
    setIsRoomDetailOpen(false)
    setSelectedRoomForEdit(null)
    setRoomName('')
    setRoomMembers([])
    setNewMemberInput('')
    setIsNewRoom(false)
  }

  const handleAddMember = () => {
    const trimmedInput = newMemberInput.trim()
    if (trimmedInput && !roomMembers.includes(trimmedInput)) {
      setRoomMembers([...roomMembers, trimmedInput])
      setNewMemberInput('')
    }
  }

  const handleRemoveMember = (memberToRemove) => {
    setRoomMembers(roomMembers.filter(member => member !== memberToRemove))
  }

  const handleMemberInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddMember()
    }
  }

  const handleSaveRoom = () => {
    if (!roomName.trim()) {
      alert('채팅방 이름을 입력해주세요.')
      return
    }

    if (isNewRoom) {
      const newRoom = {
        id: Date.now(),
        name: roomName,
        lastMessage: '',
        time: 'now',
        icon: 'blue',
        members: roomMembers
      }
      setChatRooms([newRoom, ...chatRooms])
      setSelectedRoom(newRoom.id)
    } else {
      const updatedRooms = chatRooms.map(room =>
        room.id === selectedRoomForEdit.id
          ? { ...room, name: roomName, members: roomMembers }
          : room
      )
      setChatRooms(updatedRooms)
      if (selectedRoom === selectedRoomForEdit.id) {
        setSelectedRoom(selectedRoomForEdit.id)
      }
    }
    handleCloseRoomDrawer()
    setIsRoomDetailOpen(false)
  }

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(roomSearch.toLowerCase())
  )

  return (
    <div className="chat-page">
      {/* Left Panel - Chat Rooms */}
      <div className="chat-rooms-panel">
        <div className="chat-rooms-header">
          <h2 className="chat-rooms-title">Chat Rooms</h2>
          <button className="new-room-button" onClick={handleCreateRoom}>+ New Room</button>
        </div>
        <div className="chat-rooms-search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 14L11.1 11.1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search/Filter"
            value={roomSearch}
            onChange={(e) => setRoomSearch(e.target.value)}
            className="chat-rooms-search-input"
          />
        </div>
        <div className="chat-rooms-list">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`chat-room-item ${selectedRoom === room.id ? 'active' : ''}`}
              onClick={() => setSelectedRoom(room.id)}
              onContextMenu={(e) => {
                e.preventDefault()
                handleEditRoom(room)
              }}
            >
              <div className="chat-room-info">
                <div className="chat-room-name">{room.name}</div>
                <div className="chat-room-preview">Last message preview: {room.lastMessage}</div>
                <div className="chat-room-time">{room.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Main Chat */}
      <div className="main-chat-panel">
        <div className="main-chat-header">
          <div className="main-chat-title-section">
            <h2 className="main-chat-title">Project Alpha Team</h2>
            <span className="main-chat-members">17 members</span>
          </div>
          <div className="main-chat-actions">
            <button className="chat-action-button" onClick={() => {
              const currentRoom = chatRooms.find(r => r.id === selectedRoom)
              if (currentRoom) {
                handleEditRoom(currentRoom)
                setIsRoomDetailOpen(true)
              }
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66667V10L12.5 12.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="main-chat-messages">
          <div className="date-separator">Today</div>
          {messages.map((message) => {
            const isOwnMessage = message.sender === currentUser
            return (
              <div key={message.id} className={`chat-message ${isOwnMessage ? 'own-message' : ''}`}>
                <div className="chat-message-bubble">
                  {!isOwnMessage && <div className="chat-message-sender">{message.sender}</div>}
                  <div className="chat-message-text">{message.text}</div>
                  {message.files && message.files.length > 0 && (
                    <div className="chat-message-files">
                      {message.files.map((file, idx) => (
                        <div key={idx} className="chat-file-item">
                          {file.type === 'pdf' ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={isOwnMessage ? "white" : "#4A90E2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke={isOwnMessage ? "white" : "#4A90E2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke={isOwnMessage ? "white" : "#4A90E2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M21 15L15 9L12 12L9 9L3 15" stroke={isOwnMessage ? "white" : "#4A90E2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          <span className="chat-file-name">{file.name}</span>
                          {file.type === 'pdf' && <span className="chat-file-count">1 file</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="chat-message-time">{message.time}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="main-chat-input">
          <div className="chat-input-actions-left">
            <button className="chat-input-action-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66667V10L12.5 12.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="chat-input-action-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 9.5L10 15L4.5 9.5M10 15V5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Input a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleSendMessage)}
            className="chat-input-field"
          />
          <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </div>


      {/* Members Panel Overlay */}
      {showMembersPanel && (
        <>
          <div className="members-panel-overlay" onClick={() => setShowMembersPanel(false)}></div>
          <div className="members-panel">
            <div className="members-panel-header">
              <h3 className="members-panel-title">Chat Room Members ({members.length})</h3>
              <button className="members-panel-close" onClick={() => setShowMembersPanel(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="members-panel-search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="members-panel-search-input"
              />
            </div>
            <div className="members-panel-actions">
              <button className="add-member-button">+ Add Member</button>
            </div>
            <div className="members-panel-list">
              {filteredMembers.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                  </div>
                  <button className="member-remove-button">
                    Remove
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L4 12M4 4L12 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Room Create/Edit Drawer */}
      <DetailDrawer
        isOpen={isRoomDrawerOpen || isRoomDetailOpen}
        onClose={handleCloseRoomDrawer}
        title={isNewRoom ? '새 채팅방 만들기' : '채팅방 상세'}
      >
        {selectedRoomForEdit && (
          <div className="drawer-form">
            <div className="form-group">
              <label>채팅방 이름</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="채팅방 이름을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>멤버 목록</label>
              <div className="assignees-container">
                {roomMembers.map((member, index) => (
                  <span key={index} className="assignee-tag">
                    {member}
                    <button
                      type="button"
                      className="assignee-tag-remove"
                      onClick={() => handleRemoveMember(member)}
                      title="멤버 제거"
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
                  placeholder="멤버 이름을 입력하세요"
                  value={newMemberInput}
                  onChange={(e) => setNewMemberInput(e.target.value)}
                  onKeyPress={handleMemberInputKeyPress}
                />
                <button
                  type="button"
                  className="assignee-add-button"
                  onClick={handleAddMember}
                  disabled={!newMemberInput.trim() || roomMembers.includes(newMemberInput.trim())}
                >
                  추가
                </button>
              </div>
            </div>
            <div className="drawer-actions">
              <button className="cancel-button" onClick={handleCloseRoomDrawer}>
                취소
              </button>
              <button className="save-button" onClick={handleSaveRoom}>
                저장
              </button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}

export default ChatPage
