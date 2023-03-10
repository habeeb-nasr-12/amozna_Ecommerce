import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { contextStore } from '../../components/Context/ContextStore'
import Loading from '../../components/Loading/Loading'
import MessageBox from '../../components/MessageBox/MessageBox'
import { getError } from '../../components/utils/Utils'


function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;


    }





}

































const Orderhistory = () => {









    const { state } = useContext(contextStore);
    const { userInfo } = state;
    let Navigate = useNavigate()
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })


  async function fetchData(){

    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.get(
        `/api/orders/mine`,

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(error),
      });
    }




   }














useEffect(()=>{

fetchData()



},[userInfo])






    return (
        <div>

            <Helmet>
                <title>Order History </title>
            </Helmet>
            <Container>
                <h2 className='my-3'>Order History </h2>
                {loading ? <Loading></Loading> : error ? <MessageBox variant="danger">{error} </MessageBox> :

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>





                            </tr>




                        </thead>
                        <tbody>
                        {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      Navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}





                        </tbody>






                    </table>





                }














            </Container>




















        </div>
    )
}

export default Orderhistory
