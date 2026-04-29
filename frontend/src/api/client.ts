import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  auth: { username: 'admin', password: 'admin123' },
})

export default client
