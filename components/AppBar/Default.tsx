/* eslint-disable */
import React from 'react'
import clsx from "clsx"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/Home"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useRouter } from 'next/router'

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@material-ui/core"

const DefaultAppBar = ({open, classes, handleDrawerOpen, onSignOut}) => {

  const router = useRouter()

  return (
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
        <IconButton color="inherit" onClick={()=>router.push('/DashBoard')}>
          <Badge>
            <HomeIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={onSignOut}>
          <Badge>
            <ExitToAppIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default DefaultAppBar