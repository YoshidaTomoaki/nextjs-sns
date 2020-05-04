/* eslint-disable */
import React from "react"
import { Card, CardContent, CardActionArea ,Avatar, Typography } from "@material-ui/core"
import { useRouter } from 'next/router'

const ProfileCard = ({ user }) => {

  const router = useRouter()

  const onClick = () => {
    router.push('/Profile')
    
  }

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography align="center" style={{fontSize: 20, fontWeight: 'bold' }}>
            My Profile
          </Typography>
        </CardContent>
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Avatar variant="rounded" />
          <span style={{ marginLeft: 16 }}>{user?.displayName}</span>
        </CardContent>
        <CardContent>{user?.uid}</CardContent>
        <CardContent>
          2019-04-10 10:00
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProfileCard
