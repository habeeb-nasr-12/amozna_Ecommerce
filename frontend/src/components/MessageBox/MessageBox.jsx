import React from 'react'
import Alert from 'react-bootstrap/Alert'

const MessageBox = (props) => {
  return (
     
    <Alert className='text-center' variant={props.variant || 'info'}> {props.children}</Alert>
  )
}

export default MessageBox
