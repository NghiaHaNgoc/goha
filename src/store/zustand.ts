import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '../model/user'

export interface AccountState {
  account: User | null | undefined
  setAccount: (user: User) => void
}

export const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set, get) => ({
        account: null,
        setAccount: (user) => set(() => ({ account: user })),
      }),
      { name: 'accountStore' },
    ),
  ),
)