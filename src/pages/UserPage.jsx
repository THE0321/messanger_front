import React, { useState } from 'react'
import DetailDrawer from '../components/DetailDrawer'
import './Page.css'

const UserPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div className="page">
      <h1>User</h1>
      <p>User 페이지입니다.</p>
      <button onClick={handleOpenDrawer} className="open-drawer-button">
        상세 보기
      </button>
      
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="User Details"
      >
        <div className="drawer-form">
          <div className="form-group">
            <label>User name</label>
            <input type="text" placeholder="User name" defaultValue="홍길동" />
          </div>
          <div className="form-group">
            <label>User date</label>
            <input type="date" defaultValue="2024-05-18" />
          </div>
          <div className="form-group">
            <label>End of date</label>
            <input type="date" defaultValue="2023-12-03" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="What is the full user information?" rows="4" />
          </div>
          <div className="drawer-actions">
            <button className="cancel-button" onClick={handleCloseDrawer}>Cancel</button>
            <button className="save-button">Save</button>
          </div>
        </div>
      </DetailDrawer>
    </div>
  )
}

export default UserPage
