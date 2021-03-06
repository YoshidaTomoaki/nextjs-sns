/* eslint-disable */
import React from 'react'

import firebase from 'lib/firebaseInit'

import { Avatar, makeStyles } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { fileUpload } from 'models/Storage'


const AvatarInput = ({...props}) => {

  const classes = useStyles()
  const [ avatar, setAvatar ] = React.useState(props?.avatarUrl)

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
              props.setAvatarUrl(downloadURL)
          })
      }
    )
  
  },[])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Avatar className={classes.avatar} style={{...props}} src={avatar}/>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme)=>({
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main
  }
}))


export default AvatarInput


