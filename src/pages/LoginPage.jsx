import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './LoginPage.css'

const LoginPage = () => {
  const { primaryColor } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // 로그인 로직
  }

  return (
    <div className="login-page">
      <div className="login-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L20.09 10.26L29 11.27L22.5 17.14L24.18 26.02L16 21.77L7.82 26.02L9.5 17.14L3 11.27L11.91 10.26L16 2Z" fill={primaryColor} stroke={primaryColor} strokeWidth="2"/>
        </svg>
        <span className="logo-text">Logo</span>
      </div>
      <div className="login-container">
        <h1 className="login-title">Sign In to Your Account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3.33333C5.83333 3.33333 2.275 5.83333 0.833333 9.58333C2.275 13.3333 5.83333 15.8333 10 15.8333C14.1667 15.8333 17.725 13.3333 19.1667 9.58333C17.725 5.83333 14.1667 3.33333 10 3.33333ZM10 13.75C7.24167 13.75 5 11.5083 5 8.75C5 5.99167 7.24167 3.75 10 3.75C12.7583 3.75 15 5.99167 15 8.75C15 11.5083 12.7583 13.75 10 13.75ZM10 5.83333C8.61667 5.83333 7.5 6.95 7.5 8.33333C7.5 9.71667 8.61667 10.8333 10 10.8333C11.3833 10.8333 12.5 9.71667 12.5 8.33333C12.5 6.95 11.3833 5.83333 10 5.83333Z" fill="#999"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 2.5L17.5 17.5M8.15833 8.15833C7.84167 8.475 7.66667 8.89167 7.66667 9.33333C7.66667 10.2167 8.38333 10.9333 9.26667 10.9333C9.70833 10.9333 10.125 10.7583 10.4417 10.4417M5.83333 5.83333C4.725 6.66667 3.85 7.775 3.19167 9.075C4.63333 12.825 8.19167 15.325 12.3583 15.325C13.4083 15.325 14.4083 15.1583 15.3333 14.8583L12.3583 11.8833C11.9167 11.925 11.4667 11.8833 11.0417 11.7583M3.33333 3.33333L6.30833 6.30833M16.6667 16.6667L13.6917 13.6917M1.66667 1.66667L4.64167 4.64167M15.3583 15.3583L18.3333 18.3333M10 3.33333C5.83333 3.33333 2.275 5.83333 0.833333 9.58333C1.50833 11.325 2.525 12.8583 3.79167 14.1083M16.2083 5.05833C17.475 6.30833 18.4917 7.84167 19.1667 9.58333C17.725 13.3333 14.1667 15.8333 10 15.8333C9.15833 15.8333 8.34167 15.7083 7.56667 15.4833" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

