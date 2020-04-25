/* eslint-disable */
import React from 'react'
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'


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
