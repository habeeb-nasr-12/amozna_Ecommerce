import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Checkout from '../../components/Checkout/Checkout'
import { Helmet } from 'react-helmet-async'
import { contextStore } from '../../components/Context/ContextStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Payment() {
    const {state, dispatch:ContextDispatch} =useContext(contextStore)
    const {cart : {shippingAddress,PaymentMethod}}=state
    const [PaymentMethodName,setPaymentMethod] =useState(PaymentMethod || "Paypal")
        let Navigate = useNavigate()
        function submitHandler(e){
            e.preventDefault()
            ContextDispatch({type:"SAVE_PAYMENT_METHOD",payload:PaymentMethodName})
            localStorage.setItem("paymentMethod", PaymentMethodName)
            Navigate('/placeorder')

            
        }

        useEffect(()=>{
            if (!shippingAddress.address){
                Navigate('/shipping')
            }

        }, [shippingAddress,Navigate])







  return (
    <div>
        <Container className='mt-2 mb-4'> <Checkout step1 step2 step3></Checkout></Container>
        <div className='container small-container'>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
           <h2 className='my-3'>Payment Method</h2> 
    <Form onSubmit={submitHandler}>

   <div className='mb-3'>
   <Form.Check 
    type="radio" 
    id="paypal"
    label="paypal"
    value="Paypal"
    checked={PaymentMethodName=="PayPal"}
    onChange={(e)=>setPaymentMethod(e.target.value)}>

 </Form.Check>

   </div>

   <div className='mb-3'>
   <Form.Check 
    type="radio" 
    id="Stripe"
    label="Stripe"
    value="Stripe"
    checked={PaymentMethodName=="Stripe"}
    onChange={(e)=>setPaymentMethod(e.target.value)}
    >




    </Form.Check>

   </div>

   <div className='mb-3'>
    <Button type="submit">continue</Button>
   </div>


    </Form>


            
           </div>


      
    </div>
  )
}

export default Payment
