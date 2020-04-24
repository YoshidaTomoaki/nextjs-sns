import React from "react"
import {
  FormControl,
  TextField,
  FormHelperText,
  Button as MuiButton,
} from "@material-ui/core"
import { Button } from "components"

type Props = {
  value: string
  onHandleChange: (e: any) => void
  onSubmit: () => void
} & React.ComponentProps<typeof TextField> &
  React.ComponentProps<typeof MuiButton>

const PostForm: React.FC<Props> = ({ value, onHandleChange, onSubmit }) => {
  return (
    <FormControl>
      <TextField
        id="standard-basic"
        label="Post"
        variant="outlined"
        multiline
        rows={4}
        value={value || ""}
        onChange={onHandleChange}
      />
      <FormHelperText>Let's write context!</FormHelperText>
      <Button.Default onClick={onSubmit}>Submit!</Button.Default>
    </FormControl>
  )
}

export default PostForm
