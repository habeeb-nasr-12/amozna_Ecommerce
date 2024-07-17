import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import  Form  from 'react-bootstrap/Form'
import { useState } from 'react'
import  Button  from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { contextStore } from '../../components/Context/ContextStore'
import Checkout from '../../components/Checkout/Checkout'
const Shipping = () => {

  let {state,dispatch :contextDispatch} =useContext(contextStore)
  const {
    userInfo,cart :{shippingAddress} } =state
 

  const Navigate = useNavigate();
    let [fullName,setFullName]= useState(shippingAddress.fullName ||'')
    let [address,setAddress]= useState(shippingAddress.address ||'')
    let [city,setCity]= useState(shippingAddress.city ||'')
    let [postalCode,setPostalCode]= useState(shippingAddress.postalCode ||'')
    let [country,setCountry]= useState(shippingAddress.country ||'')








    function submitHandelr (e){

        e.preventDefault();
      contextDispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload :{
          fullName,
          address,
          city,
          postalCode,
          country
        }
      })
      localStorage.setItem("shippingAddress",JSON.stringify({
          fullName,
          address,
          city,
          postalCode,
          country
        
      }))
      Navigate('/payment')

    }


useEffect(()=>{
  if (!userInfo){
    Navigate('/signin?redirect=shipping')
  }
}, [userInfo,Navigate])




  return (
    <div>
        <Helmet>
           <title>Shipping Address </title> 
        </Helmet>
        <Container className='mt-2 mb-4'>  <Checkout step1 step2></Checkout></Container>
  
        <Container  className='small-container'>
      
     <h2 className='my-3 fw-bold'>Shippinng Address</h2>
     <Form  onSubmit={submitHandelr}>

    <Form.Group className="mb-3" controlid='fullName' >
    <Form.Label>Full Name</Form.Label>
    <Form.Control value={fullName} required onChange={(e)=> setFullName(e.target.value)}/> 
    </Form.Group>

    <Form.Group className="mb-3" controlid='address' >
    <Form.Label>Address</Form.Label>
    <Form.Control value={address} required onChange={(e)=> setAddress(e.target.value)}/> 
    </Form.Group>

    <Form.Group className="mb-3" controlid='city' >
    <Form.Label>city</Form.Label>
    <Form.Control value={city} required onChange={(e)=> setCity(e.target.value)}/> 
    </Form.Group>

    <Form.Group className="mb-3" controlid='postalCode' >
    <Form.Label>postalCode</Form.Label>
    <Form.Control value={postalCode} required onChange={(e)=> setPostalCode(e.target.value)}/> 
    </Form.Group>
    
    <Form.Group className="mb-3" controlid='country' >
    <Form.Label>country</Form.Label>
    <Form.Control value={country} required onChange={(e)=> setCountry(e.target.value)}/> 
    </Form.Group>

    <div className='mb-3'>
        <Button variant='primary' type="submit">
            continue
        </Button>

    </div>


     </Form>
     </Container>

    </div>
  )
}

export default Shipping
