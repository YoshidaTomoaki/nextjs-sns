/* eslint-disable */
import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import {
  Box, Grid, Paper
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/router"
import { useCurrentUser } from "utill/UserContext"
import { newPost, getAllPosts } from "models/Post"
import { Form, Card, AppShell, Copyright } from "components"

export default function Dashboard() {
  const router = useRouter()
  const classes = useStyles()
  const user = useCurrentUser()
  const [value, setValue] = React.useState(null)
  const [allPosts, setAllPosts] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(()=>{

    const allPosts = async() => {
      const allPosts = await Promise.all([getAllPosts()])
        .catch(e=>{
          setError('Network error occured.')
          throw e
        })
      setAllPosts(allPosts.flat())
    }

    allPosts()

  },[])

  // for PostForm
  const onHandleChange = (e: any) => {
    setValue(e.target.value)
  }
  const onSubmit = async () => {
    await newPost(user, value)
    setValue(null)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <AppShell.Default >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Card.Profile user={user} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper variant="outlined" className={fixedHeightPaper}>
            <Form.Post
              value={value || ""}
              onHandleChange={onHandleChange}
              onSubmit={onSubmit}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          { error && <Alert style={{margin: '20 0'}}severity='error'> { error } </Alert> }
          { allPosts && allPosts.map((post) => <Card.Post post={post} />) }
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </AppShell.Default>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}))
