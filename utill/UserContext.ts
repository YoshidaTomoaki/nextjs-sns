import * as React from 'react'
import { User } from 'firebase'

const UserContext = React.createContext(null)

export function useCurrentUser() {
  return React.useContext(UserContext)
}

export const UserProvider = UserContext.Provider
