/* eslint-disable */
import React from "react"
import {
  TextField,
  FormHelperText,
  Button as MuiButton,
} from "@material-ui/core"
import { Button, Input } from "components"
import { useForm } from 'react-hook-form'

import { UserContextMod } from "utill/UserContextMod"
import { useCurrentUser } from "utill/UserContext"

import { updateUser } from "models/Auth"

type Props = {
} & React.ComponentProps<typeof TextField> &
  React.ComponentProps<typeof MuiButton>

const ProfileForm: React.FC<Props> = ({}) => {
  const [avatarUrl, setAvatarUrl] = React.useState(null)
  const { state, dispatch } = React.useContext(UserContextMod)

  const currentUser = useCurrentUser()
  
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      displayName: state?.displayName,
      accountId: state?.accountId,
      introduction: state?.introduction,
      avatarUrl: state?.avatarUrl
    }
  })

  const onSubmit = (formData) => {
    const { displayName, accountId, introduction } = formData

    // for local store
    dispatch({
      type: 'setUser',
      uid: currentUser.uid,
      displayName: displayName,
      accountId: accountId,
      introduction: introduction,
      avatarUrl: avatarUrl
    })

    // for firebase
    updateUser({
      uid: currentUser.uid,
      displayName: displayName,
      accountId: accountId,
      introduction: introduction,
      avatarUrl: avatarUrl
    })
    
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input.Avatar setAvatarUrl={setAvatarUrl} avatarUrl={state.avatarUrl}/>
      <TextField
        id="standard-basic"
        name="displayName"
        label="Display Name"
        variant="outlined"
        fullWidth
        //value={state.displayName}
        inputRef={register}
        style={{ marginBottom: 16 }}
      />
      <TextField
        id="standard-basic"
        name="accountId"
        label="Account Id"
        variant="outlined"
        fullWidth
        inputRef={register}
        style={{ marginBottom: 16 }}
      />
      <TextField
        id="standard-basic"
        name="introduction"
        label="Introduction"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        inputRef={register}
        style={{ marginBottom: 16 }}
      />
      <FormHelperText>Let's write context!</FormHelperText>
      <Button.Default type="submit" fullWidth >Submit!</Button.Default>
    </form>
    </div>
  )
}

export default ProfileForm
