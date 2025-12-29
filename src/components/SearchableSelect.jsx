import React, { useState, useRef, useEffect } from 'react'
import './SearchableSelect.css'

const SearchableSelect = ({ options, value, onChange, placeholder = '선택하세요' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    setIsOpen(true)
  }

  const displayValue = value || ''

  return (
    <div className="searchable-select-wrapper" ref={wrapperRef}>
      <div className="searchable-select-input-wrapper">
        <input
          type="text"
          className="searchable-select-input"
          value={isOpen ? searchQuery : displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="searchable-select-arrow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
          >
            <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="searchable-select-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`searchable-select-option ${value === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="searchable-select-no-results">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchableSelect

