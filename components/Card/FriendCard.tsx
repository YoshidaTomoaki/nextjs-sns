/* eslint-disable */
import React from "react"
import { Card, CardContent, CardActionArea ,Avatar } from "@material-ui/core"
import { useRouter } from 'next/router'

const FriendCard = ({ user }) => {

  const router = useRouter()

  const onClick = () => {
    //router.push('/Profile')
  }

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Avatar variant="rounded" src={user?.avatarUrl}/>
          <span style={{ marginLeft: 16 }}>{user?.displayName}</span>
        </CardContent>
        <CardContent>{user?.introduction}</CardContent>
        <CardContent>
          2019-04-10 10:00
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FriendCard
