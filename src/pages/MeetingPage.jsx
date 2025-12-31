import React, { useState } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import SearchableSelect from '../components/SearchableSelect'
import './Page.css'
import './MeetingPage.css'

const MeetingPage = () => {
  const [viewMode, setViewMode] = useState('month') // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [isNewMeeting, setIsNewMeeting] = useState(false)
  const [isRoomDrawerOpen, setIsRoomDrawerOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isNewRoom, setIsNewRoom] = useState(false)
  
  // 사용자 목록 (참석자 선택용)
  const userOptions = ['홍길동', '김철수', '이영희', '박민수', '최지영']

  // 회의실 목록
  const [meetingRooms, setMeetingRooms] = useState([
    { id: 1, name: '회의실 A', capacity: 10, location: '3층' },
    { id: 2, name: '회의실 B', capacity: 6, location: '3층' },
    { id: 3, name: '컨퍼런스 룸', capacity: 20, location: '5층' },
    { id: 4, name: '본사 회의실', capacity: 15, location: '본사 2층' }
  ])

  // 샘플 미팅 데이터
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: '팀 미팅',
      content: '월간 팀 미팅 및 프로젝트 진행 상황 공유',
      roomId: 1,
      start: new Date(2024, 1, 26, 10, 0),
      end: new Date(2024, 1, 26, 11, 30),
      color: '#FF5722',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '김철수', approved: true },
        { name: '이영희', approved: false }
      ]
    },
    {
      id: 2,
      title: '클라이언트 미팅',
      content: '신규 프로젝트 제안 및 요구사항 논의',
      roomId: 3,
      start: new Date(2024, 1, 29, 13, 0),
      end: new Date(2024, 1, 29, 15, 0),
      color: '#FF9800',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '박민수', approved: true },
        { name: '최지영', approved: true }
      ]
    },
    {
      id: 3,
      title: '주간 스프린트 회의',
      content: '주간 스프린트 회의 및 다음 주 계획 수립',
      roomId: 2,
      start: new Date(2024, 2, 8, 9, 0),
      end: new Date(2024, 2, 8, 10, 30),
      color: '#E91E63',
      attendees: [
        { name: '김철수', approved: true },
        { name: '이영희', approved: true },
        { name: '박민수', approved: false },
        { name: '최지영', approved: true }
      ]
    },
    {
      id: 4,
      title: '프로젝트 Beta Kickoff',
      content: '프로젝트 Beta 킥오프 미팅 및 팀 빌딩',
      roomId: 3,
      start: new Date(2024, 2, 19, 14, 0),
      end: new Date(2024, 2, 20, 17, 0),
      color: '#FFC107',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '김철수', approved: true },
        { name: '이영희', approved: true },
        { name: '박민수', approved: true },
        { name: '최지영', approved: false }
      ]
    }
  ])

  // 날짜 포맷팅
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatMonthYear = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}년 ${month}월`
  }

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatDateTimeLocal = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  // 날짜 네비게이션
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1)
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1)
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // 미팅 상세 페이지 열기
  const handleOpenMeetingDetail = (meeting) => {
    setSelectedMeeting(meeting)
    setIsNewMeeting(false)
    setIsDrawerOpen(true)
  }

  // 새 미팅 등록 페이지 열기
  const handleOpenNewMeeting = () => {
    const now = new Date()
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0)
    const defaultEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0)
    
    setSelectedMeeting({
      id: null,
      title: '',
      content: '',
      roomId: null,
      start: defaultStart,
      end: defaultEnd,
      color: '#4A90E2',
      attendees: []
    })
    setIsNewMeeting(true)
    setIsDrawerOpen(true)
  }

  // 미팅 상세 페이지 닫기
  const handleCloseMeetingDetail = () => {
    setIsDrawerOpen(false)
    setSelectedMeeting(null)
    setIsNewMeeting(false)
  }

  // 참석자 추가
  const handleAddAttendee = (attendeeName) => {
    if (selectedMeeting && !selectedMeeting.attendees?.some(a => a.name === attendeeName)) {
      const updatedMeeting = {
        ...selectedMeeting,
        attendees: [...(selectedMeeting.attendees || []), { name: attendeeName, approved: false }]
      }
      setSelectedMeeting(updatedMeeting)
    }
  }

  // 참석자 제거
  const handleRemoveAttendee = (attendeeName) => {
    if (selectedMeeting) {
      const updatedMeeting = {
        ...selectedMeeting,
        attendees: (selectedMeeting.attendees || []).filter(a => a.name !== attendeeName)
      }
      setSelectedMeeting(updatedMeeting)
    }
  }

  // 참석자 승인 여부 토글
  const handleToggleApproval = (attendeeName) => {
    if (selectedMeeting) {
      const updatedMeeting = {
        ...selectedMeeting,
        attendees: (selectedMeeting.attendees || []).map(a => 
          a.name === attendeeName ? { ...a, approved: !a.approved } : a
        )
      }
      setSelectedMeeting(updatedMeeting)
    }
  }

  // 미팅 저장
  const handleSaveMeeting = () => {
    if (!selectedMeeting) return

    const form = document.querySelector('.drawer-form')
    if (!form) return

    const titleInput = form.querySelector('input[type="text"]')
    const contentInput = form.querySelector('textarea')
    const roomSelect = form.querySelector('select')
    const dateInputs = form.querySelectorAll('input[type="datetime-local"]')
    
    const title = titleInput?.value?.trim() || ''
    
    if (!title) {
      alert('제목을 입력해주세요.')
      return
    }

    const startValue = dateInputs[0]?.value
    const endValue = dateInputs[1]?.value
    
    const newMeeting = {
      id: isNewMeeting ? Date.now() : selectedMeeting.id,
      title: title,
      content: contentInput?.value || '',
      roomId: roomSelect?.value ? parseInt(roomSelect.value) : null,
      start: startValue ? new Date(startValue) : selectedMeeting.start,
      end: endValue ? new Date(endValue) : selectedMeeting.end,
      color: selectedMeeting.color || '#4A90E2',
      attendees: selectedMeeting.attendees || []
    }

    if (isNewMeeting) {
      setMeetings([...meetings, newMeeting])
    } else {
      setMeetings(meetings.map(m => m.id === selectedMeeting.id ? newMeeting : m))
    }

    handleCloseMeetingDetail()
  }

  // 회의실 관리
  const handleOpenRoomManagement = () => {
    setIsRoomDrawerOpen(true)
  }

  const handleCloseRoomDrawer = () => {
    setIsRoomDrawerOpen(false)
    setSelectedRoom(null)
    setIsNewRoom(false)
  }

  const handleOpenNewRoom = () => {
    setSelectedRoom({
      id: null,
      name: '',
      capacity: '',
      location: ''
    })
    setIsNewRoom(true)
  }

  const handleOpenRoomDetail = (room) => {
    setSelectedRoom(room)
    setIsNewRoom(false)
  }

  const handleSaveRoom = () => {
    if (!selectedRoom) return

    const form = document.querySelector('.room-form')
    if (!form) return

    const nameInput = form.querySelector('input[placeholder*="회의실명"]')
    const capacityInput = form.querySelector('input[type="number"]')
    const locationInput = form.querySelector('input[placeholder*="위치"]')
    
    const name = nameInput?.value?.trim() || ''
    
    if (!name) {
      alert('회의실명을 입력해주세요.')
      return
    }
    
    const newRoom = {
      id: isNewRoom ? Date.now() : selectedRoom.id,
      name: name,
      capacity: capacityInput?.value ? parseInt(capacityInput.value) : 0,
      location: locationInput?.value || ''
    }

    if (isNewRoom) {
      setMeetingRooms([...meetingRooms, newRoom])
    } else {
      setMeetingRooms(meetingRooms.map(r => r.id === selectedRoom.id ? newRoom : r))
    }

    handleCloseRoomDrawer()
  }

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('정말 이 회의실을 삭제하시겠습니까?')) {
      setMeetingRooms(meetingRooms.filter(r => r.id !== roomId))
      setMeetings(meetings.map(m => m.roomId === roomId ? { ...m, roomId: null } : m))
      handleCloseRoomDrawer()
    }
  }

  const getRoomName = (roomId) => {
    const room = meetingRooms.find(r => r.id === roomId)
    return room ? room.name : '미지정'
  }

  // 일간 뷰 렌더링
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const dayMeetings = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.start)
      return (
        meetingDate.getFullYear() === currentDate.getFullYear() &&
        meetingDate.getMonth() === currentDate.getMonth() &&
        meetingDate.getDate() === currentDate.getDate()
      )
    })

    return (
      <div className="day-view">
        <div className="day-header">
          <div className="day-date">
            <span className="day-number">{currentDate.getDate()}</span>
            <div className="day-info">
              <span className="day-weekday">
                {['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]}
              </span>
              <span className="day-month-year">{formatMonthYear(currentDate)}</span>
            </div>
          </div>
        </div>
        <div className="day-timeline">
          <div className="time-column">
            {hours.map(hour => (
              <div key={hour} className="time-slot">
                <span className="time-label">{String(hour).padStart(2, '0')}:00</span>
              </div>
            ))}
          </div>
          <div className="schedule-column">
            {hours.map(hour => (
              <div key={hour} className="hour-slot"></div>
            ))}
            {dayMeetings.map(meeting => {
              const startHour = meeting.start.getHours()
              const startMinute = meeting.start.getMinutes()
              const endHour = meeting.end.getHours()
              const endMinute = meeting.end.getMinutes()
              const top = (startHour * 60 + startMinute) * (100 / (24 * 60))
              const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * (100 / (24 * 60))

              return (
                <div
                  key={meeting.id}
                  className="schedule-item day-schedule"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    backgroundColor: meeting.color
                  }}
                  onClick={() => handleOpenMeetingDetail(meeting)}
                >
                  <div className="schedule-title">{meeting.title}</div>
                  <div className="schedule-time">
                    {formatTime(meeting.start)} - {formatTime(meeting.end)}
                  </div>
                  <div className="schedule-room">{getRoomName(meeting.roomId)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // 주간 뷰 렌더링
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })

    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <div className="week-view">
        <div className="week-header">
          <div className="week-time-column"></div>
          {weekDays.map((date, index) => {
            const dayMeetings = meetings.filter(meeting => {
              const meetingDate = new Date(meeting.start)
              return (
                meetingDate.getFullYear() === date.getFullYear() &&
                meetingDate.getMonth() === date.getMonth() &&
                meetingDate.getDate() === date.getDate()
              )
            })

            const isToday = 
              date.getFullYear() === new Date().getFullYear() &&
              date.getMonth() === new Date().getMonth() &&
              date.getDate() === new Date().getDate()

            return (
              <div key={index} className={`week-day-header ${isToday ? 'today' : ''}`}>
                <div className="week-day-name">
                  {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                </div>
                <div className="week-day-number">{date.getDate()}</div>
                <div className="week-day-schedule-count">
                  {dayMeetings.length >= 3 
                    ? `+${dayMeetings.length - 3}` 
                    : dayMeetings.length > 0 
                    ? `${dayMeetings.length}개` 
                    : ''}
                </div>
              </div>
            )
          })}
        </div>
        <div className="week-body">
          <div className="week-time-column">
            {hours.map(hour => (
              <div key={hour} className="week-time-slot">
                <span className="week-time-label">{String(hour).padStart(2, '0')}:00</span>
              </div>
            ))}
          </div>
          {weekDays.map((date, dayIndex) => {
            const dayMeetings = meetings.filter(meeting => {
              const meetingDate = new Date(meeting.start)
              return (
                meetingDate.getFullYear() === date.getFullYear() &&
                meetingDate.getMonth() === date.getMonth() &&
                meetingDate.getDate() === date.getDate()
              )
            })

            const isToday = 
              date.getFullYear() === new Date().getFullYear() &&
              date.getMonth() === new Date().getMonth() &&
              date.getDate() === new Date().getDate()

            return (
              <div key={dayIndex} className={`week-day-column ${isToday ? 'today' : ''}`}>
                {hours.map(hour => (
                  <div key={hour} className="week-hour-slot"></div>
                ))}
                {dayMeetings.map(meeting => {
                  const startHour = meeting.start.getHours()
                  const startMinute = meeting.start.getMinutes()
                  const endHour = meeting.end.getHours()
                  const endMinute = meeting.end.getMinutes()
                  const top = (startHour * 60 + startMinute) * (100 / (24 * 60))
                  const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * (100 / (24 * 60))

                  return (
                    <div
                      key={meeting.id}
                      className="schedule-item week-schedule"
                      style={{
                        top: `${top}%`,
                        height: `${height}%`,
                        backgroundColor: meeting.color
                      }}
                      onClick={() => handleOpenMeetingDetail(meeting)}
                    >
                      <div className="schedule-title">{meeting.title}</div>
                      <div className="schedule-time">
                        {formatTime(meeting.start)} - {formatTime(meeting.end)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 월간 뷰 렌더링
  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const weeks = []
    let currentWeek = []
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    
    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return (
      <div className="month-view">
        <div className="month-weekdays">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <div key={index} className="month-weekday">{day}</div>
          ))}
        </div>
        <div className="month-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="month-week">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <div key={dayIndex} className="month-day empty"></div>
                }

                const date = new Date(year, month, day)
                const dayMeetings = meetings.filter(meeting => {
                  const meetingDate = new Date(meeting.start)
                  return (
                    meetingDate.getFullYear() === year &&
                    meetingDate.getMonth() === month &&
                    meetingDate.getDate() === day
                  )
                })

                const isToday = 
                  year === new Date().getFullYear() &&
                  month === new Date().getMonth() &&
                  day === new Date().getDate()

                return (
                  <div key={dayIndex} className={`month-day ${isToday ? 'today' : ''}`}>
                    <div className="month-day-number">{day}</div>
                    <div className="month-day-schedules">
                      {dayMeetings.slice(0, 3).map(meeting => (
                        <div
                          key={meeting.id}
                          className="month-schedule-item"
                          style={{ backgroundColor: meeting.color }}
                          title={meeting.title}
                          onClick={() => handleOpenMeetingDetail(meeting)}
                        >
                          {meeting.title.length > 15 
                            ? meeting.title.substring(0, 15) + '...' 
                            : meeting.title}
                        </div>
                      ))}
                      {dayMeetings.length > 3 && (
                        <div className="month-schedule-more">
                          +{dayMeetings.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="schedule-header">
        <h1>Meeting</h1>
        
        <div className="schedule-controls">
          <div className="view-mode-selector">
            <button
              className={`view-mode-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              일간
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              주간
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              월간
            </button>
          </div>

          <div className="date-navigation">
            <button className="nav-button" onClick={goToPrevious}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="today-button" onClick={goToToday}>
              오늘
            </button>
            <button className="nav-button" onClick={goToNext}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="current-date-display">
              {viewMode === 'day' 
                ? formatDate(currentDate)
                : viewMode === 'week'
                ? `${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()))} ~ ${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay())))}`
                : formatMonthYear(currentDate)}
            </div>
          </div>

          <div className="meeting-actions">
            <button className="room-management-button" onClick={handleOpenRoomManagement}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              회의실 관리
            </button>
            <button className="add-schedule-button" onClick={handleOpenNewMeeting}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              미팅 등록
            </button>
          </div>
        </div>
      </div>

      <div className="schedule-content">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </div>

      {/* 미팅 상세 Drawer */}
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseMeetingDetail}
        title={isNewMeeting ? "미팅 등록" : "미팅 상세"}
      >
        {selectedMeeting && (
          <div className="drawer-form">
            <div className="form-group">
              <label>제목</label>
              <input 
                type="text" 
                defaultValue={selectedMeeting.title || ''}
                placeholder="미팅 제목을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea 
                defaultValue={selectedMeeting.content || ''}
                rows={5}
                placeholder="미팅에 대한 상세 내용을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>회의실</label>
              <select defaultValue={selectedMeeting.roomId || ''}>
                <option value="">회의실 선택</option>
                {meetingRooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} ({room.location}, 수용인원: {room.capacity}명)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>시작일</label>
              <input 
                type="datetime-local" 
                defaultValue={formatDateTimeLocal(selectedMeeting.start)}
                key={selectedMeeting.start?.getTime()}
              />
            </div>
            <div className="form-group">
              <label>종료일</label>
              <input 
                type="datetime-local" 
                defaultValue={formatDateTimeLocal(selectedMeeting.end)}
                key={selectedMeeting.end?.getTime()}
              />
            </div>
            <div className="form-group">
              <label>미팅 참석자 목록</label>
              <div className="attendees-container">
                {(selectedMeeting.attendees || []).map((attendee, index) => (
                  <div key={index} className="attendee-item">
                    <span className="attendee-name">{attendee.name}</span>
                    <div className="attendee-actions">
                      <button
                        type="button"
                        className={`approval-button ${attendee.approved ? 'approved' : 'pending'}`}
                        onClick={() => handleToggleApproval(attendee.name)}
                        title={attendee.approved ? '승인됨' : '대기중'}
                      >
                        {attendee.approved ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        className="attendee-remove"
                        onClick={() => handleRemoveAttendee(attendee.name)}
                        title="참석자 제거"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="attendee-input-wrapper">
                <SearchableSelect
                  options={userOptions.filter(user => 
                    !selectedMeeting.attendees?.some(a => a.name === user)
                  )}
                  value=""
                  onChange={handleAddAttendee}
                  placeholder="참석자를 선택하세요"
                />
              </div>
            </div>
            <div className="drawer-actions">
              <button className="cancel-button" onClick={handleCloseMeetingDetail}>Cancel</button>
              <button className="save-button" onClick={handleSaveMeeting}>
                {isNewMeeting ? '등록' : '저장'}
              </button>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* 회의실 관리 Drawer */}
      <DetailDrawer
        isOpen={isRoomDrawerOpen}
        onClose={handleCloseRoomDrawer}
        title="회의실 관리"
      >
        <div className="room-management">
          <button className="add-room-button" onClick={handleOpenNewRoom}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            회의실 추가
          </button>
          
          <div className="room-list">
            {meetingRooms.map(room => (
              <div key={room.id} className="room-item" onClick={() => handleOpenRoomDetail(room)}>
                <div className="room-item-header">
                  <h4 className="room-item-name">{room.name}</h4>
                  <button
                    className="room-delete-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteRoom(room.id)
                    }}
                    title="삭제"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="room-item-info">
                  <span className="room-location">📍 {room.location}</span>
                  <span className="room-capacity">👥 {room.capacity}명</span>
                </div>
              </div>
            ))}
          </div>

          {selectedRoom && (
            <div className="room-form-wrapper">
              <div className="room-form">
                <div className="form-group">
                  <label>회의실명</label>
                  <input 
                    type="text" 
                    defaultValue={selectedRoom.name || ''}
                    placeholder="회의실명을 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <label>수용인원</label>
                  <input 
                    type="number" 
                    defaultValue={selectedRoom.capacity || ''}
                    placeholder="수용인원을 입력하세요"
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>위치</label>
                  <input 
                    type="text" 
                    defaultValue={selectedRoom.location || ''}
                    placeholder="위치를 입력하세요"
                  />
                </div>
                <div className="drawer-actions">
                  <button className="cancel-button" onClick={handleCloseRoomDrawer}>취소</button>
                  <button className="save-button" onClick={handleSaveRoom}>
                    {isNewRoom ? '등록' : '저장'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DetailDrawer>
    </div>
  )
}

export default MeetingPage
