import { api } from '@/shared/common/api'
import { LoginResponse } from '@/shared/common/interfaces'

const authServices = {
  login: async (username: string, password: string) => {
    const req = await api.post<LoginResponse>(`/login`, {
      username,
      pin: password,
    })
    const token = req.data
    return token
  },
}

export default authServices
