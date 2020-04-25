/* eslint-disable */
import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import {
  CssBaseline, Box, Typography, Container, Grid, Paper, Link
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { mainListItems, secondaryListItems } from "components/ListItems"
import { useRouter } from "next/router"
import { useCurrentUser } from "utill/UserContext"
import { logout } from "models/Auth"
import { newPost, getAllPosts } from "models/Post"
import { Form, Card, SideBar, AppBar } from "components"

export default function Dashboard() {
  const router = useRouter()
  const classes = useStyles()
  const user = useCurrentUser()
  const [value, setValue] = React.useState(null)
  const [allPosts, setAllPosts] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(()=>{
    /* 無限ループ直す
    const allPosts = async() => {
      const allPosts = await Promise.all([getAllPosts()])
        .catch(e=>{
          setError('Network error occured.')
          throw e
        })
      setAllPosts(allPosts.flat())
    }

    allPosts()
    */

  },[])

  
  // for Header
   const onSignOut = async () => {
    logout().then(() => {
      router.push("/Top")
    })
  }

  // for PostForm
  const onHandleChange = (e: any) => {
    setValue(e.target.value)
  }
  const onSubmit = async () => {
    await newPost(user, value)
    setValue(null)
  }

  // form Menu
  const [open, setOpen] = React.useState(false)
  const onHandleDrawerOpen = () => {
    setOpen(true)
  }
  const onHandleDrawerClose = () => {
    setOpen(false)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar.Default
        classes={classes}
        open={open}
        handleDrawerOpen={onHandleDrawerOpen}
        onSignOut={onSignOut}
      />
      <SideBar.Default
        open={open}
        classes={classes}
        mainListItems={mainListItems}
        secondaryListItems={secondaryListItems}
        handleDrawerClose={onHandleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
        </Container>
      </main>
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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
