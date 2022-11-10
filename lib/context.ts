import { User } from 'firebase/auth'
import { createContext } from 'react'

interface UserState {
  user: User
  username: string
}

const initialState: UserState = { user: null, username: null }
export const UserContext = createContext(initialState)
