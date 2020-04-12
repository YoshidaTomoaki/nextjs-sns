import React from 'react';
import { NextPage } from 'next';
import Signup from './SignUp'
import Top from './Top'

const Page: NextPage<{ userAgent: string | null}> = ({ userAgent }) => {
  
  return (
    <Top />
  )
}

Page.getInitialProps = async({ req }) => {

  const userAgent = req ? req.headers['user-agent'] : null //navigator.userAgent
  return { userAgent }

}

export default Page