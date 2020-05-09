export type StateType = {
  uid: string
  displayName: string | null
  accountId: string | null
  introduction: string | null
  avatarUrl: string | null
} & any

export type ActionType = {
  type: string
  uid: string
  displayName: string | null
  accountId: string | null
  introduction: string | null
  avatarUrl: string | null
} & any

export const userReducer = (state: StateType, action: ActionType) => {

  switch (action.type) {
    case "setUser":
      return {
        ...state,
        uid: action.uid,
        displayName: action.displayName,
        accountId: action.accountId,
        introduction: action.introduction,
        avatarUrl: action.avatarUrl,
      }
    default:
      return state
  }
}