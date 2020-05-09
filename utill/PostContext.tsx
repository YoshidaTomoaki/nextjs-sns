/* eslint-disable */

import React from 'react'
import { postReducer, StateType, ActionType } from './PostReducer'

type ContextType = {
  postState: StateType
  postDispatch: React.Dispatch<ActionType>
}

const initialState = {
  user: {},
  text: "",
  createdAt: ""
}

export const PostContext = React.createContext({} as ContextType)

export const PostProvider = PostContext.Provider

export const PostCustumProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(postReducer, initialState)

  return (
    <PostProvider value={{postState: state, postDispatch: dispatch}}>
      { children }
    </PostProvider>
  )
}

export default PostCustumProvider