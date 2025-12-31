import React, { useState, useRef, useEffect } from 'react'
import Pagination from '../components/Pagination'
import './Page.css'
import './UserPage.css'
import './DrivePage.css'

const DrivePage = () => {
  // 예시 파일 목록
  const initialFiles = [
    {
      id: 1,
      name: '프로젝트_기획서.pdf',
      size: 2457600,
      type: 'application/pdf',
      data: null, // 예시 파일이므로 실제 데이터는 없음
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: '회의록_2024_01_15.docx',
      size: 153600,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      data: null,
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      name: '디자인_시안_v2.png',
      size: 3145728,
      type: 'image/png',
      data: null,
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      name: '예산_계산서.xlsx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      data: null,
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      name: '발표자료.pptx',
      size: 4194304,
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      data: null,
      uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      name: '코드_리뷰_결과.txt',
      size: 8192,
      type: 'text/plain',
      data: null,
      uploadedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      name: '로고_최종.ai',
      size: 1048576,
      type: 'application/postscript',
      data: null,
      uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      name: '데이터_백업.zip',
      size: 15728640,
      type: 'application/zip',
      data: null,
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const [files, setFiles] = useState(initialFiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files)
    
    uploadedFiles.forEach((file) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          data: e.target.result, // base64 데이터
          uploadedAt: new Date().toISOString()
        }
        
        setFiles((prevFiles) => [...prevFiles, fileData])
      }
      
      reader.readAsDataURL(file)
    })
    
    // 같은 파일을 다시 선택할 수 있도록 input 초기화
    event.target.value = ''
  }

  const handleDownload = (file) => {
    // 예시 파일인 경우 (data가 null) 빈 파일 생성
    if (!file.data) {
      const blob = new Blob([''], { type: file.type })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      return
    }
    
    // base64 데이터를 Blob으로 변환
    const byteCharacters = atob(file.data.split(',')[1])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: file.type })
    
    // 다운로드 링크 생성
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDelete = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 검색 필터링
  const filteredFiles = files.filter(file => {
    const query = searchQuery.toLowerCase()
    return file.name.toLowerCase().includes(query)
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <div className="page">
      <h1>Drive</h1>
      
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
        <div className="drive-upload-area">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="drive-file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="create-user-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            파일 업로드
          </label>
        </div>
      </div>

      {/* 파일 목록 */}
      {filteredFiles.length > 0 ? (
        <>
          <div className="drive-files-container">
            <table className="drive-files-table">
              <thead>
                <tr>
                  <th>파일 이름</th>
                  <th>크기</th>
                  <th>업로드 일시</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="file-name-cell">
                      <div className="file-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 2.5H11.5L14.5 5.5V17.5C14.5 17.7761 14.2761 18 14 18H5.5C5.22386 18 5 17.7761 5 17.5V3C5 2.72386 5.22386 2.5 5.5 2.5Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.5 2.5V5.5H14.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="file-name">{file.name}</span>
                    </td>
                    <td>{formatFileSize(file.size)}</td>
                    <td>{formatDate(file.uploadedAt)}</td>
                    <td>
                      <div className="file-actions">
                        <button
                          className="download-button"
                          onClick={() => handleDownload(file)}
                          title="다운로드"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 11V2M8 11L5 8M8 11L11 8M2 11V13.3333C2 13.6869 2.14048 14.0261 2.39052 14.2761C2.64057 14.5262 2.97971 14.6667 3.33333 14.6667H12.6667C13.0203 14.6667 13.3594 14.5262 13.6095 14.2761C13.8595 14.0261 14 13.6869 14 13.3333V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(file.id)}
                          title="삭제"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V13.3333C12 13.6869 11.8595 14.0261 11.6095 14.2761C11.3594 14.5262 11.0203 14.6667 10.6667 14.6667H5.33333C4.97971 14.6667 4.64057 14.5262 4.39052 14.2761C4.14048 14.0261 4 13.6869 4 13.3333V4M6 4V2.66667C6 2.31305 6.14048 1.9739 6.39052 1.72386C6.64057 1.47381 6.97971 1.33333 7.33333 1.33333H8.66667C9.02029 1.33333 9.35943 1.47381 9.60948 1.72386C9.85952 1.9739 10 2.31305 10 2.66667V4M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="drive-empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8H32L40 16H48C50.2091 16 52 17.7909 52 20V48C52 50.2091 50.2091 52 48 52H16C13.7909 52 12 50.2091 12 48V12C12 9.79086 13.7909 8 16 8Z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32 8V16H40" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>{searchQuery ? '검색 결과가 없습니다' : '업로드된 파일이 없습니다'}</p>
        </div>
      )}
    </div>
  )
}

export default DrivePage
