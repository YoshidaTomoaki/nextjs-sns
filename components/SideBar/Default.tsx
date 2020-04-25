/* eslint-disable */
import React from 'react'
import { Drawer, IconButton, Divider, List } from '@material-ui/core'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import clsx from "clsx"
import { MainListItems, SecondaryListItems } from 'components/ListItems'

const DefaultSideBar = ({open, classes, handleDrawerClose}) => {

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
      <List>
        <MainListItems />
      </List>
      <Divider />
      <List>
        <SecondaryListItems />
      </List>
    </Drawer>

  )
}

export default DefaultSideBar


