import React, { useContext } from 'react'

import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { contextStore } from '../../components/Context/ContextStore'
import MessageBox from '../../components/MessageBox/MessageBox'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import Product from '../../components/Product/Product'



const CartScreen = () => {
    const { state, dispatch: contextDispatch } = useContext(contextStore)
    let Navigate =useNavigate()
    function checkOut(){
        Navigate('/signin?redirect=/shipping')
    }







    // const { cart } = state
    // const { cartItems } = cart
    const {cart: { cartItems } } = state;
    async function updateCart (item,quantity){
    let {data} = await axios.get(`/api/proudcts/${item._id}`)
    if (data.countInStock<quantity){
        window.alert('sorry,product is out of stock')  
        return;
         }
        contextDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}})
    }

    function removeItem(item){

contextDispatch({type:'CART_REMOVE_ITEM',payload:item})

    }








   
    return (
        <Container>
            <div>
                <Helmet>

                    <title>shopping cart</title>
                </Helmet>
                <h1>Shopping cart</h1>
                <div className='row'>
                    <div className='col-md-8'>

                        {cartItems == null ?
                            <MessageBox className='m-auto'>
                                cart is empty. <Link to="/"> Go shopping</Link>
                            </MessageBox> :
                            <ListGroup>

                                {cartItems?.map((item) => {
                                    return <ListGroup.Item key={item._id}>
                                        <div className='row align-items-center'>
                                            <div className="col-md-4">
                                                <div className='item'>
                                                    <img src={item.image} alt={item.name} className="img-fulid rounded img-thumbnail" />{'  '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>

                                                </div>
                                            </div>
                                            <div className="col-md-3"> 
                                                <div className='item'>
                                                    <Button onClick={()=> updateCart(item,item.quantity-1)}  variant="light" disabled={item.quantity == 1} >
                                                        <i className='fas fa-minus-circle'></i>
                                                    </Button>{' '}
                                                    <span>{item.quantity}</span>
                                                    <div className='item'>
                                                        <Button  onClick={()=> updateCart(item,item.quantity+1)} variant="light" disabled={item.quantity == item.countInStock}  >
                                                            <i className='fas fa-plus-circle'></i>
                                                        </Button>{' '}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='col-md-1'>${item.price}</div>
                                            <div className='col-md-2'>
                                                <Button    onClick={()=> removeItem(item)}              variant='light'>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </div>
                       

                                        </div>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>

                        }
                                           

                    </div>

                    <div className='col-md-3'>
                        <Card className ="ms-2">
                            <Card.Body>
                                <ListGroup variant="flush">

                                    <ListGroup.Item > 

                                        <h3>
                                        Subtotal ({cartItems?.reduce((a, c) => a + c.quantity, 0)}{' '} items
                                            )  $
                                            {cartItems?.reduce((a, c) => a + c.price * c.quantity, 0)}


                                        </h3>





                                    </ListGroup.Item>

                        <ListGroup.Item>
                        <div className='d-grid'>
                     
                        <Button type='Button' onClick={checkOut} variant="primary" disabled={cartItems?.length==0}>
                        Proceed to Checkout
                        </Button>







                        </div>




                        </ListGroup.Item>



                                </ListGroup>



                            </Card.Body>




                        </Card>


                    </div>

                  
                </div>

            </div>
        </Container>
    )
}

export default CartScreen
