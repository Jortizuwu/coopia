import axios from 'axios'
import { ENVS } from './env'

export const api = axios.create({
  baseURL: ENVS.API_URL,
})

api.interceptors.request.use(async confing => {
  const token = window.localStorage.getItem('token')
  if (token) {
    confing.headers.Authorization = `Bearer ${token}`
  }
  return confing
})
