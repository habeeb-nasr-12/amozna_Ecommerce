import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import {LinkContainer} from "react-router-bootstrap"
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useContext } from 'react'
import { contextStore } from '../Context/ContextStore'

import {ToastContainer} from 'react-toastify'

const NavBar = () => {
  const {state ,dispatch:contextDispatch} =useContext(contextStore)
  const  {cart ,userInfo}= state
  let Navigate= useNavigate()

 

function signoutHandler (){

  contextDispatch({type:'USER_SIGNOUT'})
  localStorage.removeItem('userInfo');
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  window.location.href= '/signin'

}





 return <>

 <ToastContainer position='bottom-center' limit={1}/>
<header>
<Navbar bg="dark" variant="dark">
       <Container>
       <LinkContainer to='/' >
    <Navbar.Brand>  
    Amazona
    </Navbar.Brand>
    </LinkContainer>
    <Nav className='me-auto'>
    {userInfo?(

<NavDropdown title={userInfo.name} id="basic-nav-dropdown">
<LinkContainer  to="/profile">

  <NavDropdown.Item>User profile</NavDropdown.Item>
  
</LinkContainer>
<LinkContainer  to="/orderhistory">

  <NavDropdown.Item>Order History </NavDropdown.Item>
</LinkContainer>
<NavDropdown.Divider/>
<Link  to='#signout' onClick={signoutHandler}  className='dropdown-item'>

Sign Out


</Link>




</NavDropdown>

): (
  <Link  className="nav-link" to='/signin' >
  Sign In
  </Link>
) }
    </Nav>
  
    <Nav className="ms-auto">
  <Link to='/cart' className='nav-link'>
<div className='d-flex '>  cart <i className="fa-solid me-1 ms-1 mt-2 fa-cart-shopping"></i>
  {cart.cartItems?.length> 0 ?
  <Badge pill bg='danger'>{cart.cartItems?.reduce((a,c)=> a+c.quantity,0)}</Badge>
     :""
} 

</div>
  </Link>

    </Nav>




       </Container>
    
       </Navbar>
</header>
  
 
    
    
  </>
    
  
}

export default NavBar
