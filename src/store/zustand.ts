import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LoginResponse, User } from "../model/user";

export interface AccountState {
  account: LoginResponse | null | undefined;
  signIn: (user?: LoginResponse) => void;
  signOut: () => void;
  update: (data?: User) => void;
}

export const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set, get) => ({
        account: null,
        signIn: (user) => set(() => ({ account: user })),
        signOut: () => set(() => ({ account: null })),
        update: (data) => set((prev) => ({account: {
          ...prev.account, 
          avatar: data?.avatar,
          email: data?.email,
          fullName:data?.fullName
        }
        })) 
      }),
      { name: "accountStore" },
    ),
  ),
);
