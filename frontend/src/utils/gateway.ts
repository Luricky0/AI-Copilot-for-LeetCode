import axios from 'axios'

const gateway = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

gateway.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('CODEPILOT-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

gateway.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios Error]', error)
    return Promise.reject(error)
  }
)

export default gateway
