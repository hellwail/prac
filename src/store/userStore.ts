import { create } from "zustand";
import type {User} from "../types/User";

interface UserState {
    users: User[]
    setUsers:(users: User[]) => void
    toggleActive: (id: number) => void
    incrementClickCount: (id: number) => void
    clearUsers: () => void
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    toggleActive: (id) => set((state) => ({
        users: state.users.map((user) =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
        )
    })),
    incrementClickCount: (id) => set((state) => ({
        users: state.users.map((user) =>
            user.id === id ? { ...user, clickCount: user.clickCount + 1 } : user
        )
    })),
    clearUsers: () => set({ users: [] })
}));