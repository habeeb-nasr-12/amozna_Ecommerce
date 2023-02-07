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


const SignUp = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const {search} =useLocation()
    const redirectInUrl= new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl? redirectInUrl :'/'
    let navigate= useNavigate()

    const {state,dispatch:contextDispatch}=useContext(contextStore)
    const {userInfo}= state

    async function SubmitHandelr(e){
        e.preventDefault();
        if (password != confirmPassword){
            toast.error('password do not match ')
            return;
        }
        try{
            const {data} = await Axios.post('/api/users/signup',{
                name,
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

        <title>Sign Up</title>
    </Helmet>

    <h2 className='my-3'>Sign Up </h2>
    <Form  onSubmit={SubmitHandelr}   className='mt-4'>

    <Form.Group className="mb-3" controlId="name" >
    <Form.Label>Name</Form.Label>
    <Form.Control required type="text" onChange={(e)=> setName(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="email" >
    <Form.Label>Email</Form.Label>
    <Form.Control required type="email" onChange={(e)=> setEmail(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3"controlId="password" >
    <Form.Label>Password</Form.Label>
    <Form.Control required type="password"   onChange={(e)=> setPassword(e.target.value)} />

    </Form.Group>

    <Form.Group className="mb-3"controlId="confirmpassword" >
    <Form.Label>ConfirmPassword</Form.Label>
    <Form.Control required type="password"   onChange={(e)=> setConfirmPassword(e.target.value)} />

    </Form.Group>

    <div className='mb-3'>
        <Button type="submit">Sign Up</Button>
    </div>
    <div className='mb-3'>
       Already have an account ? {' '}
        <Link to={`/signin?redirect=${redirect}`} >Sign-In</Link>

    </div>


    </Form>


   </Container>
   </>
}

export default SignUp
