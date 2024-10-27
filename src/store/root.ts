import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

import { AuthSlice, createAuthSlice } from './slices/auth'

const usePersistedStore = create<AuthSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
      }),
      {
        name: 'bound-persisted-store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)

export default usePersistedStore
