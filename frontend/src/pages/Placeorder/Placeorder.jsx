import React, { useReducer } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Helmet } from 'react-helmet-async'
import Checkout from '../../components/Checkout/Checkout'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { contextStore } from '../../components/Context/ContextStore'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import { useEffect } from 'react'
import { getError } from '../../components/utils/Utils'
import { toast } from 'react-toastify'
import Axios from 'axios'
import Loading from '../../components/Loading/Loading'

function reducer (state,action ){
    switch(action.type){

        case 'CREATE_REQUEST':
            return {...state,loading:true};
        case 'CREATE_SUCCESS':
                return {...state,loading:false};
        case 'CREATE_FAIL':
            return {...state,loading:false}
        default:
           return state
    }
}







const Placeorder = () => {

        const [{loading},dispatch] =useReducer(reducer,{
            loading :false , 
            
        })


    const { state, dispatch: contextDispatch } = useContext(contextStore);
    const { cart, userInfo } = state;
    let navigate = useNavigate()

    const round2 = (num) => Math.round(num *100 + Number.EPSILON) /100 ; //123.2345 = 123.23

    cart.itemsPrice = round2 (cart.cartItems.reduce((a,c)=> a + c.quantity * c.price, 0 ));

    cart.shippingPrice =cart.itemsPrice > 100 ?  round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice +cart.shippingPrice+ cart.taxPrice;
      async  function placeOrderHandelr () {
        try{
            dispatch({type: "CREATE_REQUEST"})
            const {data } =await Axios.post("/api/orders",{
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:localStorage.getItem('paymentMethod'),
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice,
            },{
                headers:{
                    authorization: `Bearer ${userInfo.token}`,
                }
            }
            
            )
            contextDispatch({type: "CART_CLEAR"})
            dispatch({type:"CREATE_REQUEST"})
            localStorage.removeItem('cartItems')
            navigate(`/order/${data.order._id}`)
        }catch(err){
            dispatch({type:'CREATE_FAIL' });
            toast.error(getError(err))
        }

    }

useEffect(()=>{
if (!localStorage.getItem('paymentMethod')){
    navigate('/payment')
}
},[cart,Navigate]);








    return (
        <div>
            <Helmet>
                <title> Preview Order</title>
            </Helmet>
            <Container className='mt-2 mb-4'> <Checkout step1 step2 step3 step4></Checkout>

    
                <h2 className='my-3'> Preview Order</h2>

                <Row>
                    <Col md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>shipping</Card.Title>
                                <Card.Text>
                                    <strong> Name :</strong> {cart.shippingAddress.fullName} <br />
                                    <strong> Address :</strong> {cart.shippingAddress.address}, {' '}
                                    {cart.shippingAddress.city},{' '},{cart.shippingAddress.postalCode},{' '},
                                    {cart.shippingAddress.country}





                                </Card.Text>
                                <Link to="/shipping">Edit</Link>


                            </Card.Body>
                        </Card>
                           <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong> Method :</strong> {localStorage.getItem('paymentMethod')} <br />
                                </Card.Text>
                                <Link to="/Payment">Edit</Link>


                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                               <ListGroup variant='flush' >

                            {cart.cartItems.map((item)=>{ return<ListGroup.Item key={item._id}>
                                <Row className='align-items-center'>
                                    <Col md={6} >

                                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" /> {' '}
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>



                                    </Col>
                                    <Col md={3}> <span>{item.quantity}</span> </Col>
                                    <Col md={3}> <span>{item.price}</span> </Col>






                                </Row>
                            </ListGroup.Item>


    })}





                               </ListGroup>
                                <Link to="/Cart">Edit</Link>


                            </Card.Body>
                        </Card>


                    </Col>
                    <Col md={4}>
                        <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <Row>
                            <Col>items</Col>
                            <Col>{cart.itemsPrice.toFixed(2)} </Col>
                        </Row>

                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>shipping</Col>
                            <Col>{cart.shippingPrice.toFixed(2)} </Col>
                        </Row>

                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>{cart.taxPrice.toFixed(2)} </Col>
                        </Row>

                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col> <strong> Order Total </strong></Col>
                            <Col>{cart.totalPrice.toFixed(2)} </Col>
                        </Row>

                        </ListGroup.Item>
                        <ListGroup.Item>
                       <div className='d-grid'>
                        <Button type='button' disabled={cart.cartItems.length ==0} onClick={placeOrderHandelr}> 
                        Place Order
                        </Button>

                       </div>
                        {loading && <Loading className="mt-3 d-flex justify-content-center"></Loading>}
                        </ListGroup.Item>




                    </ListGroup>



                        </Card.Body>



                    </Col>

                </Row>
                </Container>
            </div>


    )
}

export default Placeorder
