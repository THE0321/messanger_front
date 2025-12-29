import React from 'react'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>로그인</h1>
        <form className="login-form">
          <input type="text" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

