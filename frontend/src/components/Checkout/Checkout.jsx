import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Checkout = (props) => {
  return (
    <Row className='row checkout-steps'>
      <Col className={ props.step1? 'active': ''}>Sign In</Col>
      <Col className={props.step2? 'active': ''}>Shipping</Col>
      <Col className={props.step3? 'active': ''}>payment</Col>
      <Col className={props.step4? 'active': ''}>place order </Col>
    </Row>
  )
}

export default Checkout
