import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './ProfileEditPage.css'

const ProfileEditPage = () => {
  const navigate = useNavigate()
  const { primaryColor, updatePrimaryColor } = useTheme()
  const [selectedColor, setSelectedColor] = useState(primaryColor)
  const [name, setName] = useState('홍길동')
  const [email, setEmail] = useState('hong@example.com')
  const [phone, setPhone] = useState('010-1234-5678')

  // 미리 정의된 색상 옵션
  const colorOptions = [
    { name: '파란색', value: '#4A90E2' },
    { name: '초록색', value: '#4CAF50' },
    { name: '빨간색', value: '#F44336' },
    { name: '보라색', value: '#9C27B0' },
    { name: '주황색', value: '#FF9800' },
    { name: '청록색', value: '#00BCD4' },
    { name: '분홍색', value: '#E91E63' },
    { name: '갈색', value: '#795548' },
  ]

  const handleColorChange = (color) => {
    setSelectedColor(color)
    updatePrimaryColor(color)
  }

  const handleSave = () => {
    // 저장 로직 (API 호출 등)
    console.log('저장:', { name, email, phone, color: selectedColor })
    navigate(-1) // 이전 페이지로 돌아가기
  }

  const handleCancel = () => {
    // 변경사항 취소하고 원래 색상으로 복원
    updatePrimaryColor(primaryColor)
    navigate(-1)
  }

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-container">
        <h1 className="profile-edit-title">내 정보 수정</h1>
        
        <div className="profile-edit-section">
          <h2 className="section-title">기본 정보</h2>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
            />
          </div>
        </div>

        <div className="profile-edit-section">
          <h2 className="section-title">테마 색상</h2>
          <p className="section-description">
            앱 전체에 사용될 포인트 색상을 선택하세요.
          </p>
          <div className="color-picker">
            <div className="color-options">
              {colorOptions.map((color) => (
                <div
                  key={color.value}
                  className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ '--color': color.value }}
                  onClick={() => handleColorChange(color.value)}
                  title={color.name}
                >
                  <div className="color-swatch" style={{ backgroundColor: color.value }} />
                  {selectedColor === color.value && (
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="custom-color-input">
              <label htmlFor="customColor">커스텀 색상</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="customColor"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      handleColorChange(e.target.value)
                    }
                  }}
                  placeholder="#4A90E2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="profile-edit-actions">
          <button className="cancel-button" onClick={handleCancel}>
            취소
          </button>
          <button className="save-button" onClick={handleSave} style={{ backgroundColor: selectedColor }}>
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditPage

