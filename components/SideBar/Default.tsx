/* eslint-disable */
import React from 'react'
import { Drawer, IconButton, Divider, List } from '@material-ui/core'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import clsx from "clsx"


const DefaultSideBar = ({open, mainListItems, secondaryListItems, classes, handleDrawerClose}) => {

  return (

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
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>

  )
}

export default DefaultSideBar


