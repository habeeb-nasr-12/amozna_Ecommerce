import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import COl from 'react-bootstrap/COl'

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Rating from '../../components/Rating/Rating'
import { Helmet } from 'react-helmet-async'
import Loading from '../../components/Loading/Loading'
import MessageBox from '../../components/MessageBox/MessageBox'
import { getError } from '../../components/utils/Utils'
import { contextStore } from '../../components/Context/ContextStore'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}





export const Proudcts = () => {
  const pramas = useParams()
  const { slug } = pramas
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    Products: [],
    error: ''
  })

  async function GetProducts() {
    dispatch({ type: 'FETCH_REQUEST' })
    try {
      const { data } = await axios.get(`/api/proudcts/slug/${slug}`)
      dispatch({ type: 'FETCH_SUCCESS', payload: data })

       
    }
    catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(error) })

    } 
  }
  let Navigate =useNavigate()
  const {state,dispatch:contextDispatch} = useContext(contextStore)
  const {cart} =state

  async function addToCartHandelr (){
  const exsitItem = cart.cartItems?.find((x)=> x._id==product._id);
   const quantity = exsitItem?exsitItem.quantity+1 :1 ;
   const { data } = await axios.get(`/api/proudcts/${product._id}`)
   if (data.countInStock<quantity){
  window.alert('sorry,product is out of stock')  
   }
  contextDispatch(
    {type:'CART_ADD_ITEM',
    payload:{...product,quantity}
  })
  Navigate('/cart')
  
}







  useEffect(() => {
    GetProducts()
  }, [slug])







 
  return (
    <main> 

 
    <Container className='mt-3'>
      <div className='site-container d-flex flex-column'>
    {loading? <Loading/>:
    error?   <MessageBox   variant='danger'>{error}</MessageBox>:
  <div className='row'>


<div className='col-md-6' >
<div className='item'>
<img src={product.image} className="w-100" alt={product.name}  />
  <div> 
</div>




  </div>
</div>
<div className='col-md-3' > 
<div className='item'>
<ListGroup  variant={'flush'}>
  <ListGroup.Item>
<Helmet> 
  <title>{product.name} </title>
</Helmet>
    <h1> {product.name}</h1>
  </ListGroup.Item>
  <ListGroup.Item>

  <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
  </ListGroup.Item>
  <ListGroup.Item>
 price : {product.price}
</ListGroup.Item>
<ListGroup.Item >
 Description : <p>{product.description}</p>
</ListGroup.Item>


</ListGroup>
</div>



   </div>
<div className='col-md-3 '>
  <Card>
    <Card.Body>

<ListGroup variant="flush">
<ListGroup.Item>

  <Row>
    <COl>price:</COl>
    <COl>{product.price}</COl>
    </Row>
</ListGroup.Item>
<ListGroup.Item>

  <Row>
    <COl>status:</COl>
    <COl>{product.countInStock>0?
    <Badge bg='success'>In stock</Badge>:
    <Badge bg='danger'>unavailable</Badge>}
    </COl>
    </Row>
</ListGroup.Item>

<ListGroup.Item>
{product.countInStock>0 &&(

  <div className='d-grid'>
    <Button onClick={addToCartHandelr} variant="primary">

      Add to cart
    </Button>
  </div>

)}


</ListGroup.Item>


</ListGroup>

    </Card.Body>
  </Card>
</div>
</div>
    }

   </div>
    </Container>
    </main>


  )
}
