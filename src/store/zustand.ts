import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { LoginResponse, User } from '../model/user'

export interface AccountState {
  account: LoginResponse | null | undefined
  signIn: (user?: LoginResponse) => void
  signOut: () => void
}

export const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set, get) => ({
        account: null,
        signIn: (user) => set(() => ({ account: user })),
        signOut: () => set(() => ({ account: null }))
      }),
      { name: 'accountStore' },
    ),
  ),
)