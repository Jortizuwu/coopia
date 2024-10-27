// import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'

import { LoginResponse } from '@/shared/common/interfaces'
import { StateCreator } from 'zustand'

export interface AuthSlice {
  token: string | null
  setToken: (payload: LoginResponse) => void
  removeToken: () => void
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = set => ({
  token: null,
  setToken: ({ status }) => set({ token: status }),
  removeToken: () => {
    set({ token: null })
    sessionStorage.removeItem('token')
  },
})
