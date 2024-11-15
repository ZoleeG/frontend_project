import React from 'react'

export default function ErrorPage ({message}) {
  return (
    <h1 className='errorpage'>Page Not Found <br/>{message}</h1>
  )
}