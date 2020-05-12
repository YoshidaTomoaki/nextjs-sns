/* eslint-disable */

export type StateType = {
  post : {
    user?: any
    text?: string | null
    createdAt?: any
    id: string | null
  }[]
} & any

export type ActionType = {
  type: string
  post : {
    user?: any
    text?: string | null
    createdAt?: any
    id: string | null
  }[]
}


export const postReducer = (state: StateType, action: ActionType) => {
  switch(action.type){
    case "setPost":
      return {
        ...state,
        post: action.post
      }
    default:
      return state
  }
}
