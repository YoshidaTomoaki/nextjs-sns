/* eslint-disable */
import React from "react"
import {
  FormControl,
  TextField,
  FormHelperText,
  Button as MuiButton,
} from "@material-ui/core"
import { Button, Input } from "components"
import { useForm } from 'react-hook-form'

type Props = {
} & React.ComponentProps<typeof TextField> &
  React.ComponentProps<typeof MuiButton>

const ProfileForm: React.FC<Props> = ({}) => {
  
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (formData) => {
    console.log('regist!: ', formData)
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input.Avatar />
      <TextField
        id="standard-basic"
        name="displayName"
        label="Display Name"
        variant="outlined"
        fullWidth
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
