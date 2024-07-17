import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import {toast} from 'react-toastify'
import  Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import { contextStore } from '../../components/Context/ContextStore'

import { Helmet } from 'react-helmet-async'
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { getError } from '../../components/utils/Utils'


const SignIn = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const {search} =useLocation()
    const redirectInUrl= new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl? redirectInUrl :'/'
    let navigate= useNavigate()

    const {state,dispatch:contextDispatch}=useContext(contextStore)
    const {userInfo}= state

    async function SubmitHandelr(e){
        e.preventDefault();
        try{
            const {data} = await Axios.post('/api/users/signin',{
                email,
                password,
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            
            contextDispatch({type:'USER_SIGNIN',payload:data})
            navigate(redirect|| '/')
        }
 
        catch(err){
        toast.error(getError(err))
        }
    }
    useEffect(()=>{
        if (userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])















  return <>

   <Container  className='small-container mt-5'>

    <Helmet>

        <title>Sign In</title>
    </Helmet>

    <h2 className='my-3'>Sign In </h2>
    <Form  onSubmit={SubmitHandelr}   className='mt-4'>
    <Form.Group className="mb-3" controlId="email" >
    <Form.Label>Email</Form.Label>
    <Form.Control required type="email" onChange={(e)=> setEmail(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3"controlId="password" >
    <Form.Label>Password</Form.Label>
    <Form.Control required type="password"   onChange={(e)=> setPassword(e.target.value)} />

    </Form.Group>

    <div className='mb-3'>
        <Button type="submit">Sign In</Button>
    </div>
    <div className='mb-3'>
        New Customer? {' '}
        <Link to={`/signup?redirect=${redirect}`} >Create Your account</Link>

    </div>


    </Form>


   </Container>
   </>
}

export default SignIn
