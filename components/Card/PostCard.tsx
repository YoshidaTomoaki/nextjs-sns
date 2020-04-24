import React from 'react'
import { Card, CardContent, Avatar } from '@material-ui/core'
import dayjs from 'dayjs'
import 'dayjs/locale/ja';
dayjs.locale('ja');

const PostCard = ({ post }) => {
  console.log('aaaaaaaaa',post.createdAt)

  return (
    <Card variant="outlined">
      <CardContent style={{display: 'flex', alignItems: 'center'}} >
        <Avatar variant="rounded" />
        <span style={{marginLeft: 16}}>{post.user.uid}</span>
      </CardContent>
      <CardContent>
        {post.text}
      </CardContent>
      <CardContent>
        {dayjs(post.createdAt.toDate()).format('YYYY-MM-DD HH:mm')}
      </CardContent>
    </Card>
  )
}

export default PostCard