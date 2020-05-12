/* eslint-disable */
import React from 'react'
import { AppShell } from 'components'
import { getAllUsers } from 'models/User'

const Friends = () => {

  const [ allUsers, setAllUser ] = React.useState(null)

  React.useEffect(() => {

    const getAllUserAsync = async() => {
      const allUsers = await getAllUsers()
      setAllUser(allUsers)
    }

    getAllUserAsync()

  },[])


  console.log(allUsers)

  return (
    <AppShell.Default>
      Friends
    </AppShell.Default>
  )
}

export default Friends