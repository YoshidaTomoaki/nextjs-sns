/* eslint-disable */
import React from 'react'
import { AppShell, Card } from 'components'
import { getAllUsers } from 'models/User'

const Friends: React.FC = ({}) => {

  const [ allUsers, setAllUser ] = React.useState(null)

  React.useEffect(() => {

    const getAllUserAsync = async() => {
      const allUsers = await getAllUsers()
      setAllUser(allUsers)
    }

    getAllUserAsync()

  },[])

  return (
    <AppShell.Default>
      { allUsers &&
        allUsers.map((user)=> <Card.Friend user={user} />) 
      }
    </AppShell.Default>
  )
}

export default Friends