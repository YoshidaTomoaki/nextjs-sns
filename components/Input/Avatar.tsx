/* eslint-disable */
import React from 'react'

import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'

import { Avatar, makeStyles } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { fileUpload } from 'models/Storage'


const AvatarInput = ({}) => {

  const classes = useStyles()
  const [ avatar, setAvatar ] = React.useState(null)

  const onDrop = React.useCallback(async(acceptedFiles) => {
  
    console.log('acceptFile!', acceptedFiles)
    const UploadTask = fileUpload(acceptedFiles)
  
    await UploadTask.on('state_changed',
      (snapshot)=>{
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is '+ progress + '% done')
        switch (snapshot.state){
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running')
            break
        }
      },(error)=>{
        console.error('error!!!!!', error)
        throw error
      }, async()=>{
        console.log('Upload Complete!')
        await UploadTask
          .snapshot
          .ref.getDownloadURL()
          .then((downloadURL)=>{
              console.log('downloadURL!!!', downloadURL)
              setAvatar(downloadURL)
          })
      }
    )
  
  },[])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Avatar className={classes.avatar} src={avatar}/>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme)=>({
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  }
}))


export default AvatarInput


