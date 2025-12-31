import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // 기본 색상은 파란색 (#4A90E2)
  const [primaryColor, setPrimaryColor] = useState(() => {
    // localStorage에서 저장된 색상 불러오기
    const savedColor = localStorage.getItem('primaryColor')
    return savedColor || '#4A90E2'
  })

  // 색상 변경 시 localStorage에 저장하고 CSS 변수 업데이트
  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor)
    document.documentElement.style.setProperty('--primary-color', primaryColor)
    
    // hover 색상 계산 (약간 어둡게)
    const hoverColor = adjustBrightness(primaryColor, -20)
    document.documentElement.style.setProperty('--primary-color-hover', hoverColor)
    
    // 배경 색상 (연하게)
    const bgColor = hexToRgba(primaryColor, 0.1)
    document.documentElement.style.setProperty('--primary-color-bg', bgColor)
  }, [primaryColor])

  // 초기 로드 시 CSS 변수 설정
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor)
    const hoverColor = adjustBrightness(primaryColor, -20)
    document.documentElement.style.setProperty('--primary-color-hover', hoverColor)
    const bgColor = hexToRgba(primaryColor, 0.1)
    document.documentElement.style.setProperty('--primary-color-bg', bgColor)
  }, [])

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color)
  }

  return (
    <ThemeContext.Provider value={{ primaryColor, updatePrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 색상 밝기 조정 함수
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent))
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// HEX를 RGBA로 변환
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

