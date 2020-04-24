import React from "react"
import { Button, CircularProgress, makeStyles } from "@material-ui/core"

type Props = {
  loading?: boolean
} & React.ComponentProps<typeof Button>

const DefaultButton: React.FC<Props> = ({
  children,
  onSubmit,
  loading = false,
  disabled = false,
  ...props
}) => {
  const s = useStyles()

  return (
    <Button
      variant="outlined"
      onClick={onSubmit}
      disabled={loading || disabled}
      {...props}
    >
      {children}
      {loading && <CircularProgress className={s.circulatar} />}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  circulatar: {
    position: "absolute",
    Top: "50%",
    Left: "50%",
  },
}))

export default DefaultButton
