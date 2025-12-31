/**
 * API 유틸리티 함수
 * localhost:54321 포트로 POST 요청을 보낼 수 있는 헬퍼 함수
 */

const API_BASE_URL = 'http://localhost:54321'

/**
 * POST 요청을 보내는 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/users', '/goals')
 * @param {object} data - 요청 본문에 포함할 데이터
 * @param {object} options - 추가 옵션 (headers 등)
 * @returns {Promise<Response>} - fetch 응답 객체
 */
export const post = async (endpoint, data = {}, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  }

  // body가 이미 설정되어 있으면 다시 설정하지 않음
  if (options.body) {
    config.body = options.body
  }

  try {
    const response = await fetch(url, config)
    return response
  } catch (error) {
    console.error('API POST 요청 실패:', error)
    throw error
  }
}

/**
 * POST 요청을 보내고 JSON 응답을 파싱하는 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {object} data - 요청 본문에 포함할 데이터
 * @param {object} options - 추가 옵션
 * @returns {Promise<object>} - 파싱된 JSON 응답
 */
export const postJson = async (endpoint, data = {}, options = {}) => {
  const response = await post(endpoint, data, options)
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }
  
  return await response.json()
}

/**
 * GET 요청을 보내는 함수 (추가 유틸리티)
 * @param {string} endpoint - API 엔드포인트
 * @param {object} options - 추가 옵션
 * @returns {Promise<Response>} - fetch 응답 객체
 */
export const get = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    return response
  } catch (error) {
    console.error('API GET 요청 실패:', error)
    throw error
  }
}

/**
 * GET 요청을 보내고 JSON 응답을 파싱하는 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {object} options - 추가 옵션
 * @returns {Promise<object>} - 파싱된 JSON 응답
 */
export const getJson = async (endpoint, options = {}) => {
  const response = await get(endpoint, options)
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }
  
  return await response.json()
}

