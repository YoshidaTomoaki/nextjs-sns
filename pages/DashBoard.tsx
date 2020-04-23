import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Link, 
  Card,
  CardContent,
  Avatar
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import HomeIcon from "@material-ui/icons/Home"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { mainListItems, secondaryListItems } from 'components/ListItems'
import { useRouter } from 'next/router'
import { useCurrentUser } from 'utill/UserContext'
import { logout } from 'models/Auth'
import { newPost, getAllPosts } from 'models/Post'
import { Form } from 'components'

export default function Dashboard() {
  const router = useRouter()
  const classes = useStyles()
  const user = useCurrentUser()
  const [value, setValue] = React.useState(null)
  const [allPosts, setAllPosts] = React.useState(null)

  console.log('useContext.user:', user)
  console.log('allpost', allPosts)

  // for Header
  const onSignOut = async() => {
    logout().then(()=>{
      router.push('/Top')
    })
  }

  // for PostForm
  const onHandleChange = (e: any) => {
    setValue(e.target.value)
  }
  const onSubmit = async() => {
    await newPost(user, value)
    setValue(null)
  }

  // form Menu
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // get Post
  const onGetAllPosts = async() => {
    const allPosts = await Promise.all([getAllPosts()])
    setAllPosts(allPosts.flat())
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={onGetAllPosts}>
            <Badge >
              <HomeIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={onSignOut}>
            <Badge >
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{ mainListItems }</List>
        <Divider />
        <List>{ secondaryListItems }</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper variant="outlined" className={fixedHeightPaper}>
                  <Form.Post
                    value={value || ''}
                    onHandleChange={onHandleChange}
                    onSubmit={onSubmit}
                  />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>
            <Grid item xs={12}>
              { allPosts &&
                allPosts.map((post)=>{
                  return (
                    <Card variant="outlined">
                      <div style={{display: 'flex', alignItems: 'center'}}>
                      <Avatar variant="rounded"/>
                      <span style={{marginLeft: 10}}>{post.user.uid}</span>
                      </div>
                      <CardContent>
                        {post.text}
                      </CardContent>
                    </Card>                      
                  )
                })
              }
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
    display: "flex"
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
