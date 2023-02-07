import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { contextStore } from '../../components/Context/ContextStore';
import Loading from '../../components/Loading/Loading'
import MessageBox from '../../components/MessageBox/MessageBox'
import { getError } from '../../components/utils/Utils';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container"
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

function reducer(state, action) {

    switch (action.type) {

        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true }
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false }
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false }
        default:
            return state






    }





}

const Order = () => {
    const pramas = useParams()
    const { id: orderId } = pramas

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    let Navigate = useNavigate()
    const { state } = useContext(contextStore);
    const { userInfo } = state;
    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false,

    })
    async function fatchOrder() {
        try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${orderId}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            dispatch({ type: 'FETCH_SUCCESS', payload: data })
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) })

        }






    }
    async function loadPaypalScript() {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            },
        })
        paypalDispatch({
            type: 'resetOptions',
            value: {
                'client-id': clientId,
                currency: 'USD',
            }
        })
        
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })


    }
    function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: order.totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }

      function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await axios.put(
              `/api/orders/${order._id}/pay`,
              details,
              {
                headers: { authorization: `Bearer ${userInfo.token}` },
              }
            );
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            toast.success('Order is paid');
          } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            toast.error(getError(err));
          }
        });
      }
    function onError(err) {

        toast.error(getError(err));
    }
    useEffect(() => {
        if (!userInfo) {
            return Navigate('/login')
        }
        if (!order._id || successPay || (order._id && order._id != orderId)) {
            fatchOrder()
            if (successPay) {
                dispatch({ type: 'PAY_RESET' })
            }
        } else {

            loadPaypalScript()
        }


    }, [order, userInfo, Navigate, paypalDispatch, successPay])





    return (
        <Container>
            {loading ? (<Loading></Loading>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    <div>
                        <Helmet>
                            <title>Order {orderId}</title>
                        </Helmet>
                        <h2 className='my-3'> Order {orderId} </h2>
                        <Row>
                            <Col md={8}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>shipping</Card.Title>
                                        <Card.Text>
                                            <strong> Name :</strong> {order.shippingAddress.fullName} <br />
                                            <strong> Address :</strong> {order.shippingAddress.address}, {' '}
                                            {order.shippingAddress.city},{' '},{order.shippingAddress.postalCode},{' '},
                                            {order.shippingAddress.country}


      

                                        </Card.Text>
                                        {order.isDeliverd ? (
                                            <MessageBox variant='success'>
                                                Delivered at {order.deliverdAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant='danger'>Not Deliverd</MessageBox>
                                        )}


                                    </Card.Body>
                                </Card>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Payment</Card.Title>
                                        <Card.Text>
                                            <strong> Method :</strong> {localStorage.getItem('paymentMethod')} <br />
                                        </Card.Text>
                                        {order.isPaid ? (
                                            <MessageBox variant='success'>
                                                paid at {order.paidAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant='danger'>Not Paid</MessageBox>
                                        )}


                                    </Card.Body>
                                </Card>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Items</Card.Title>
                                        <ListGroup variant='flush' >

                                            {order.orderItems.map((item) => {
                                                return <ListGroup.Item key={item._id}>
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


                                    </Card.Body>
                                </Card>


                            </Col>

                            <Col md={4}>
                                <Card className='mb-3'>
                                    <Card.Body>

                                        <Card.Title>Order Summary</Card.Title>
                                        <ListGroup variant='flush' >
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>items</Col>
                                                    <Col>${order.itemsPrice.toFixed(2)}</Col>

                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>shipping</Col>
                                                    <Col>{order.shippingPrice.toFixed(2)} </Col>
                                                </Row>

                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax</Col>
                                                    <Col>{order.taxPrice.toFixed(2)} </Col>
                                                </Row>

                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col> <strong> Order Total </strong></Col>
                                                    <Col>{order.totalPrice.toFixed(2)} </Col>
                                                </Row>

                                            </ListGroup.Item>
                                            {!order.isPaid && (

                                                <ListGroup.Item>
                                                    {isPending ? (<Loading />) :( <div>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}>

                                                        </PayPalButtons>
                                                    </div>)

                                                    }
                                                </ListGroup.Item>
                                            )}
                                            {loading && <Loading></Loading>}



                                        </ListGroup>


                                    </Card.Body>
                                </Card>



                            </Col>
                        </Row>
                    </div>}
        </Container>

    )
}

export default Order
