/* eslint-disable */
import React from 'react'
import firebase from 'lib/firebaseInit'

export const fileUpload = (acceptedFiles) => {
  const file = acceptedFiles[0]

  if(!file) throw new Error('file not exit')

  const fileName = file.name
  const filePath = 'avatar' + fileName
  const metadata = {
    contentType: file.type
  }

  const uploadTask = firebase
    .storage()
    .ref()
    .child(filePath)
    .put(file, metadata)
  
  return uploadTask

}
