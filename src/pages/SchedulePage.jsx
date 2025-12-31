import React, { useState } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import SearchableSelect from '../components/SearchableSelect'
import './Page.css'
import './SchedulePage.css'

const SchedulePage = () => {
  const [viewMode, setViewMode] = useState('month') // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isNewSchedule, setIsNewSchedule] = useState(false)
  
  // 사용자 목록 (참석자 선택용)
  const userOptions = ['홍길동', '김철수', '이영희', '박민수', '최지영']

  // 샘플 일정 데이터
  const [schedules, setSchedules] = useState([
    // 2월 일정
    {
      id: 1,
      title: '월간 보고서 작성',
      start: new Date(2024, 1, 25, 14, 0),
      end: new Date(2024, 1, 25, 17, 0),
      color: '#9C27B0'
    },
    {
      id: 2,
      title: '팀 미팅',
      content: '월간 팀 미팅 및 프로젝트 진행 상황 공유',
      location: '회의실 A',
      start: new Date(2024, 1, 26, 10, 0),
      end: new Date(2024, 1, 26, 11, 30),
      isAllDay: false,
      color: '#FF5722',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '김철수', approved: true },
        { name: '이영희', approved: false }
      ]
    },
    {
      id: 3,
      title: '코드 리뷰',
      start: new Date(2024, 1, 27, 15, 0),
      end: new Date(2024, 1, 27, 16, 30),
      color: '#00BCD4'
    },
    {
      id: 4,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 1, 28, 9, 0),
      end: new Date(2024, 1, 28, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 5,
      title: '클라이언트 미팅',
      content: '신규 프로젝트 제안 및 요구사항 논의',
      location: '본사 회의실',
      start: new Date(2024, 1, 29, 13, 0),
      end: new Date(2024, 1, 29, 15, 0),
      isAllDay: false,
      color: '#FF9800',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '박민수', approved: true },
        { name: '최지영', approved: true }
      ]
    },
    // 3월 일정
    {
      id: 6,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 1, 9, 0),
      end: new Date(2024, 2, 1, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 7,
      title: '프로젝트: Development',
      start: new Date(2024, 2, 2, 10, 0),
      end: new Date(2024, 2, 2, 17, 0),
      color: '#FFC107'
    },
    {
      id: 8,
      title: '데이터베이스 설계',
      start: new Date(2024, 2, 3, 9, 30),
      end: new Date(2024, 2, 3, 12, 0),
      color: '#009688'
    },
    {
      id: 9,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 4, 9, 0),
      end: new Date(2024, 2, 4, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 10,
      title: 'API 개발',
      start: new Date(2024, 2, 5, 10, 0),
      end: new Date(2024, 2, 5, 16, 0),
      color: '#795548'
    },
    {
      id: 11,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 6, 9, 0),
      end: new Date(2024, 2, 6, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 12,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 7, 9, 0),
      end: new Date(2024, 2, 7, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 13,
      title: '주간 스프린트 회의',
      content: '주간 스프린트 회의 및 다음 주 계획 수립',
      location: '온라인',
      start: new Date(2024, 2, 8, 9, 0),
      end: new Date(2024, 2, 8, 10, 30),
      isAllDay: false,
      color: '#E91E63',
      attendees: [
        { name: '김철수', approved: true },
        { name: '이영희', approved: true },
        { name: '박민수', approved: false },
        { name: '최지영', approved: true }
      ]
    },
    {
      id: 14,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 8, 11, 0),
      end: new Date(2024, 2, 8, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 15,
      title: 'UI/UX 디자인 리뷰',
      start: new Date(2024, 2, 9, 14, 0),
      end: new Date(2024, 2, 9, 16, 0),
      color: '#FF4081'
    },
    {
      id: 16,
      title: '프로젝트 Alpha - Phase 1',
      start: new Date(2024, 2, 11, 9, 0),
      end: new Date(2024, 2, 11, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 17,
      title: '테스트 계획 수립',
      start: new Date(2024, 2, 12, 10, 0),
      end: new Date(2024, 2, 12, 13, 0),
      color: '#607D8B'
    },
    {
      id: 18,
      title: '프로젝트 Planning',
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 16, 0),
      color: '#FFC107'
    },
    {
      id: 19,
      title: '버그 수정',
      start: new Date(2024, 2, 14, 9, 0),
      end: new Date(2024, 2, 14, 12, 0),
      color: '#F44336'
    },
    {
      id: 20,
      title: '성능 최적화',
      start: new Date(2024, 2, 14, 13, 30),
      end: new Date(2024, 2, 14, 17, 0),
      color: '#8BC34A'
    },
    {
      id: 21,
      title: '프로젝트 Beta - Phase 1',
      start: new Date(2024, 2, 15, 9, 0),
      end: new Date(2024, 2, 15, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 22,
      title: '문서화 작업',
      start: new Date(2024, 2, 16, 10, 0),
      end: new Date(2024, 2, 16, 15, 0),
      color: '#9E9E9E'
    },
    {
      id: 23,
      title: '프로젝트 Beta - Phase 1',
      start: new Date(2024, 2, 18, 9, 0),
      end: new Date(2024, 2, 18, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 24,
      title: '프로젝트 Beta Kickoff',
      content: '프로젝트 Beta 킥오프 미팅 및 팀 빌딩',
      location: '컨퍼런스 룸',
      start: new Date(2024, 2, 19, 14, 0),
      end: new Date(2024, 2, 20, 17, 0),
      isAllDay: false,
      color: '#FFC107',
      attendees: [
        { name: '홍길동', approved: true },
        { name: '김철수', approved: true },
        { name: '이영희', approved: true },
        { name: '박민수', approved: true },
        { name: '최지영', approved: false }
      ]
    },
    {
      id: 25,
      title: '보안 점검',
      start: new Date(2024, 2, 21, 9, 0),
      end: new Date(2024, 2, 21, 12, 0),
      color: '#CDDC39'
    },
    {
      id: 26,
      title: '프로젝트 Gamma - Phase 1',
      start: new Date(2024, 2, 22, 9, 0),
      end: new Date(2024, 2, 23, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 27,
      title: '배포 준비',
      start: new Date(2024, 2, 24, 10, 0),
      end: new Date(2024, 2, 24, 16, 0),
      color: '#3F51B5'
    },
    {
      id: 28,
      title: '프로젝트 Gamma - Phase 1',
      start: new Date(2024, 2, 25, 9, 0),
      end: new Date(2024, 2, 25, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 29,
      title: '사용자 피드백 수집',
      start: new Date(2024, 2, 26, 11, 0),
      end: new Date(2024, 2, 26, 15, 0),
      color: '#FF6B6B'
    },
    {
      id: 30,
      title: '프로젝트 Gamma - Phase 1',
      start: new Date(2024, 2, 27, 9, 0),
      end: new Date(2024, 2, 27, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 31,
      title: '월간 회고',
      start: new Date(2024, 2, 28, 14, 0),
      end: new Date(2024, 2, 28, 17, 0),
      color: '#673AB7'
    },
    {
      id: 32,
      title: '프로젝트 Gamma - Phase 1',
      start: new Date(2024, 2, 29, 9, 0),
      end: new Date(2024, 2, 29, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 33,
      title: '프로젝트 Gamma - Phase 1',
      start: new Date(2024, 2, 30, 9, 0),
      end: new Date(2024, 2, 30, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 34,
      title: '분기별 계획 수립',
      start: new Date(2024, 2, 31, 10, 0),
      end: new Date(2024, 2, 31, 16, 0),
      color: '#00ACC1'
    },
    // 4월 일정
    {
      id: 35,
      title: '신규 프로젝트 킥오프',
      start: new Date(2024, 3, 1, 9, 0),
      end: new Date(2024, 3, 1, 12, 0),
      color: '#FF9800'
    },
    {
      id: 36,
      title: '기술 스택 검토',
      start: new Date(2024, 3, 2, 14, 0),
      end: new Date(2024, 3, 2, 17, 0),
      color: '#9C27B0'
    },
    {
      id: 37,
      title: '아키텍처 설계',
      start: new Date(2024, 3, 3, 9, 0),
      end: new Date(2024, 3, 3, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 38,
      title: '프로토타입 개발',
      start: new Date(2024, 3, 4, 10, 0),
      end: new Date(2024, 3, 4, 17, 0),
      color: '#FFC107'
    },
    {
      id: 39,
      title: '클라이언트 프레젠테이션',
      start: new Date(2024, 3, 5, 13, 0),
      end: new Date(2024, 3, 5, 15, 30),
      color: '#E91E63'
    },
    // 2026년 1월 일정
    {
      id: 40,
      title: '신년 계획 수립',
      start: new Date(2026, 0, 2, 9, 0),
      end: new Date(2026, 0, 2, 12, 0),
      color: '#FF5722'
    },
    {
      id: 41,
      title: '팀 워크샵',
      start: new Date(2026, 0, 5, 10, 0),
      end: new Date(2026, 0, 5, 17, 0),
      color: '#9C27B0'
    },
    {
      id: 42,
      title: '신규 프로젝트 Delta 시작',
      start: new Date(2026, 0, 8, 9, 0),
      end: new Date(2026, 0, 8, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 43,
      title: '분기별 목표 설정',
      start: new Date(2026, 0, 12, 14, 0),
      end: new Date(2026, 0, 12, 16, 30),
      color: '#00BCD4'
    },
    {
      id: 44,
      title: '시스템 업그레이드',
      start: new Date(2026, 0, 15, 9, 0),
      end: new Date(2026, 0, 15, 18, 0),
      color: '#009688'
    },
    {
      id: 45,
      title: '고객 만족도 조사',
      start: new Date(2026, 0, 20, 10, 0),
      end: new Date(2026, 0, 20, 15, 0),
      color: '#FF9800'
    },
    {
      id: 46,
      title: '연말 회고 및 평가',
      start: new Date(2026, 0, 28, 13, 0),
      end: new Date(2026, 0, 28, 17, 0),
      color: '#673AB7'
    },
    // 2026년 1월 3일 연속 일정
    {
      id: 47,
      title: '프로젝트 Delta - Phase 1',
      start: new Date(2026, 0, 22, 9, 0),
      end: new Date(2026, 0, 22, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 48,
      title: '프로젝트 Delta - Phase 1',
      start: new Date(2026, 0, 23, 9, 0),
      end: new Date(2026, 0, 23, 18, 0),
      color: '#4A90E2'
    },
    {
      id: 49,
      title: '프로젝트 Delta - Phase 1',
      start: new Date(2026, 0, 24, 9, 0),
      end: new Date(2026, 0, 24, 18, 0),
      color: '#4A90E2'
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

  const formatDayMonth = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
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

  // 일정 상세 페이지 열기
  const handleOpenScheduleDetail = (schedule) => {
    setSelectedSchedule(schedule)
    setIsNewSchedule(false)
    setIsDrawerOpen(true)
  }

  // 새 일정 등록 페이지 열기
  const handleOpenNewSchedule = () => {
    const now = new Date()
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0)
    const defaultEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0)
    
    setSelectedSchedule({
      id: null,
      title: '',
      content: '',
      location: '',
      start: defaultStart,
      end: defaultEnd,
      isAllDay: false,
      color: '#4A90E2',
      attendees: []
    })
    setIsNewSchedule(true)
    setIsDrawerOpen(true)
  }

  // 일정 상세 페이지 닫기
  const handleCloseScheduleDetail = () => {
    setIsDrawerOpen(false)
    setSelectedSchedule(null)
    setIsNewSchedule(false)
  }

  // 참석자 추가
  const handleAddAttendee = (attendeeName) => {
    if (selectedSchedule && !selectedSchedule.attendees?.some(a => a.name === attendeeName)) {
      const updatedSchedule = {
        ...selectedSchedule,
        attendees: [...(selectedSchedule.attendees || []), { name: attendeeName, approved: false }]
      }
      setSelectedSchedule(updatedSchedule)
    }
  }

  // 참석자 제거
  const handleRemoveAttendee = (attendeeName) => {
    if (selectedSchedule) {
      const updatedSchedule = {
        ...selectedSchedule,
        attendees: (selectedSchedule.attendees || []).filter(a => a.name !== attendeeName)
      }
      setSelectedSchedule(updatedSchedule)
    }
  }

  // 참석자 승인 여부 토글
  const handleToggleApproval = (attendeeName) => {
    if (selectedSchedule) {
      const updatedSchedule = {
        ...selectedSchedule,
        attendees: (selectedSchedule.attendees || []).map(a => 
          a.name === attendeeName ? { ...a, approved: !a.approved } : a
        )
      }
      setSelectedSchedule(updatedSchedule)
    }
  }

  // 일정 저장
  const handleSaveSchedule = () => {
    if (!selectedSchedule) return

    // 폼에서 값 가져오기
    const form = document.querySelector('.drawer-form')
    if (!form) return

    const titleInput = form.querySelector('input[type="text"]')
    const contentInput = form.querySelector('textarea')
    const locationInput = form.querySelector('input[placeholder*="위치"]')
    const dateInputs = form.querySelectorAll('input[type="datetime-local"]')
    const allDayRadio = form.querySelector('input[value="Y"]')
    
    const title = titleInput?.value?.trim() || ''
    
    if (!title) {
      alert('제목을 입력해주세요.')
      return
    }

    const startValue = dateInputs[0]?.value
    const endValue = dateInputs[1]?.value
    
    const newSchedule = {
      id: isNewSchedule ? Date.now() : selectedSchedule.id,
      title: title,
      content: contentInput?.value || '',
      location: locationInput?.value || '',
      start: startValue ? new Date(startValue) : selectedSchedule.start,
      end: endValue ? new Date(endValue) : selectedSchedule.end,
      isAllDay: allDayRadio?.checked || false,
      color: selectedSchedule.color || '#4A90E2',
      attendees: selectedSchedule.attendees || []
    }

    if (isNewSchedule) {
      setSchedules([...schedules, newSchedule])
    } else {
      setSchedules(schedules.map(s => s.id === selectedSchedule.id ? newSchedule : s))
    }

    handleCloseScheduleDetail()
  }

  // 일간 뷰 렌더링
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const daySchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.start)
      return (
        scheduleDate.getFullYear() === currentDate.getFullYear() &&
        scheduleDate.getMonth() === currentDate.getMonth() &&
        scheduleDate.getDate() === currentDate.getDate()
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
            {daySchedules.map(schedule => {
              const startHour = schedule.start.getHours()
              const startMinute = schedule.start.getMinutes()
              const endHour = schedule.end.getHours()
              const endMinute = schedule.end.getMinutes()
              const top = (startHour * 60 + startMinute) * (100 / (24 * 60))
              const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * (100 / (24 * 60))

              return (
                <div
                  key={schedule.id}
                  className="schedule-item day-schedule"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    backgroundColor: schedule.color
                  }}
                  onClick={() => handleOpenScheduleDetail(schedule)}
                >
                  <div className="schedule-title">{schedule.title}</div>
                  <div className="schedule-time">
                    {formatTime(schedule.start)} - {formatTime(schedule.end)}
                  </div>
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
            const daySchedules = schedules.filter(schedule => {
              const scheduleDate = new Date(schedule.start)
              return (
                scheduleDate.getFullYear() === date.getFullYear() &&
                scheduleDate.getMonth() === date.getMonth() &&
                scheduleDate.getDate() === date.getDate()
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
                  {daySchedules.length >= 3 
                    ? `+${daySchedules.length - 3}` 
                    : daySchedules.length > 0 
                    ? `${daySchedules.length}개` 
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
            const daySchedules = schedules.filter(schedule => {
              const scheduleDate = new Date(schedule.start)
              return (
                scheduleDate.getFullYear() === date.getFullYear() &&
                scheduleDate.getMonth() === date.getMonth() &&
                scheduleDate.getDate() === date.getDate()
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
                {daySchedules.map(schedule => {
                  const startHour = schedule.start.getHours()
                  const startMinute = schedule.start.getMinutes()
                  const endHour = schedule.end.getHours()
                  const endMinute = schedule.end.getMinutes()
                  const top = (startHour * 60 + startMinute) * (100 / (24 * 60))
                  const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * (100 / (24 * 60))

                  return (
                    <div
                      key={schedule.id}
                      className="schedule-item week-schedule"
                      style={{
                        top: `${top}%`,
                        height: `${height}%`,
                        backgroundColor: schedule.color
                      }}
                      onClick={() => handleOpenScheduleDetail(schedule)}
                    >
                      <div className="schedule-title">{schedule.title}</div>
                      <div className="schedule-time">
                        {formatTime(schedule.start)} - {formatTime(schedule.end)}
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
    
    // 첫 주의 빈 칸
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek.push(null)
    }
    
    // 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    
    // 마지막 주의 빈 칸
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
                const daySchedules = schedules.filter(schedule => {
                  const scheduleDate = new Date(schedule.start)
                  return (
                    scheduleDate.getFullYear() === year &&
                    scheduleDate.getMonth() === month &&
                    scheduleDate.getDate() === day
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
                      {daySchedules.slice(0, 3).map(schedule => (
                        <div
                          key={schedule.id}
                          className="month-schedule-item"
                          style={{ backgroundColor: schedule.color }}
                          title={schedule.title}
                          onClick={() => handleOpenScheduleDetail(schedule)}
                        >
                          {schedule.title.length > 15 
                            ? schedule.title.substring(0, 15) + '...' 
                            : schedule.title}
                        </div>
                      ))}
                      {daySchedules.length > 3 && (
                        <div className="month-schedule-more">
                          +{daySchedules.length - 3}
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
        <h1>Schedule</h1>
        
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

          <button className="add-schedule-button" onClick={handleOpenNewSchedule}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            일정 등록
          </button>
        </div>
      </div>

      <div className="schedule-content">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </div>

      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseScheduleDetail}
        title={isNewSchedule ? "일정 등록" : "일정 상세"}
      >
        {selectedSchedule && (
          <div className="drawer-form">
            <div className="form-group">
              <label>제목</label>
              <input 
                type="text" 
                defaultValue={selectedSchedule.title || ''}
                placeholder="일정 제목을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea 
                defaultValue={selectedSchedule.content || ''}
                rows={5}
                placeholder="일정에 대한 상세 내용을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>위치</label>
              <input 
                type="text" 
                defaultValue={selectedSchedule.location || ''}
                placeholder="일정 위치를 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>종일 여부</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isAllDay" 
                    value="Y" 
                    defaultChecked={selectedSchedule.isAllDay === true}
                  />
                  <span className="radio-badge">종일</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isAllDay" 
                    value="N" 
                    defaultChecked={selectedSchedule.isAllDay !== true}
                  />
                  <span className="radio-badge">시간 지정</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>시작일</label>
              <input 
                type="datetime-local" 
                defaultValue={formatDateTimeLocal(selectedSchedule.start)}
                key={selectedSchedule.start?.getTime()}
              />
            </div>
            <div className="form-group">
              <label>종료일</label>
              <input 
                type="datetime-local" 
                defaultValue={formatDateTimeLocal(selectedSchedule.end)}
                key={selectedSchedule.end?.getTime()}
              />
            </div>
            <div className="form-group">
              <label>일정 참석자 목록</label>
              <div className="attendees-container">
                {(selectedSchedule.attendees || []).map((attendee, index) => (
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
                    !selectedSchedule.attendees?.some(a => a.name === user)
                  )}
                  value=""
                  onChange={handleAddAttendee}
                  placeholder="참석자를 선택하세요"
                />
              </div>
            </div>
            <div className="drawer-actions">
              <button className="cancel-button" onClick={handleCloseScheduleDetail}>Cancel</button>
              <button className="save-button" onClick={handleSaveSchedule}>
                {isNewSchedule ? '등록' : '저장'}
              </button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}

export default SchedulePage
