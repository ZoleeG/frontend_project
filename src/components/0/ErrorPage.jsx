import React from 'react'
import '../../../src/App.css'

const ErrorPage = ({message}) => {
  return (
    <h1 className='errorpage'>Page Not Found <br/>{message}</h1>
  )
}

export default ErrorPage