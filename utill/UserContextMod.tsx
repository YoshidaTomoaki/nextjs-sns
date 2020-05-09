/* es-lint-disable */
import React from "react"
import { userReducer, StateType, ActionType } from "./UserReducer"

type ContextType = {
  state: StateType
  dispatch: React.Dispatch<ActionType>
}

const initialState = {
  uid: "",
  displayName: "",
  accountId: "",
  introduction: "",
  avatarUrl: "",
}

export const UserContextMod = React.createContext({} as ContextType)

export const UserProviderMod = UserContextMod.Provider

export const UserProviderModify = ({children}) => {
  // useReducerを使ってstateとdispatchを宣言。reducerは上記で作成済みのものを使う
  const [state, dispatch] = React.useReducer(userReducer, initialState)

  return (
    <UserProviderMod value={{state, dispatch}}>
      { children }
    </UserProviderMod>
    )
}


export default UserProviderModify
