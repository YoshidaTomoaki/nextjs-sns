/* eslint-disable */
import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"

import { 
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  makeStyles
} from "@material-ui/core"

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Alert from "@material-ui/lab/Alert"

import { signUpWithEmail } from "models/Auth"

import { UserContextMod } from "utill/UserContextMod"

export default function SignUp() {
  const classes = useStyles()
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm()
  const [ error, setError ] = React.useState(null)

  const { state, dispatch } = React.useContext(UserContextMod)

  const onSubmit = async(formData) => {
    // firebase-authにemail新規登録
    await signUpWithEmail(formData)
      .then(async()=>{
        await dispatch({
          type: "setUser",
          displayName: formData.displayName,
          accountId: formData.accountId
        })
        router.push('/DashBoard')
      })
      .catch(e=>{
        console.error(e)
        setError(e.message)
        throw e
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && (
          <Alert className={classes.alert} severity="error">
            This is an error alert — check it out!
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="accountId"
                variant="outlined"
                required
                fullWidth
                id="accountId"
                label="Account Id"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Top" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
