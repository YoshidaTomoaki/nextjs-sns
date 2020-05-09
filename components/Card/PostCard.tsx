/* eslint-disable */
import React from "react"
import { Card, CardContent, Avatar, IconButton } from "@material-ui/core"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import dayjs from "dayjs"
import "dayjs/locale/ja"
dayjs.locale("ja")

import { deletePost } from 'models/Post'

const PostCard = ({ post, postId }) => {

  const onClickDelete = async() => {
    await deletePost(postId)
      .then(()=>console.log('delete post success'))
      .catch((e)=>console.log('delete error: ', e))
  }

  return (
    <Card variant="outlined">
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        <Avatar variant="rounded" src={post.user.avatarUrl}/>
        <span style={{ marginLeft: 16 }}>{post.user.displayName}</span>
        <IconButton style={{marginLeft: 'auto'}}onClick={onClickDelete}>
          <DeleteOutlineIcon/>
        </IconButton>
      </CardContent>
      <CardContent>{post.text}</CardContent>
      <CardContent>
        {dayjs(post.createdAt.toDate()).format("YYYY-MM-DD HH:mm")}
      </CardContent>
    </Card>
  )
}

export default PostCard
