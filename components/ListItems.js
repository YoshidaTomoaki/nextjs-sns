/* eslint-disable */
import React from "react"
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core"
import DashboardIcon from "@material-ui/icons/Dashboard"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PeopleIcon from "@material-ui/icons/People"
import SearchIcon from "@material-ui/icons/Search"
import NotificationsIcon from '@material-ui/icons/Notifications'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { useRouter } from 'next/router'

export const MainListItems = () => { 

  const router = useRouter()

  return (
    <div>
      <ListItem button onClick={()=>router.push('/DashBoard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={()=>router.push('/Profile')}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={()=>router.push('/Search')}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search"/>
      </ListItem>
      <ListItem button onClick={()=>router.push('/Friends')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItem>
      <ListItem button button onClick={()=>router.push('/Notification')}>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
    </div>
  )
}

export const SecondaryListItems = () => {
  
  return (
    <div>
      <ListSubheader inset>Another Contents</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Favorite" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
    </div>
  )
}
