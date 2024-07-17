import React, { useEffect, useReducer } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import Container from 'react-bootstrap/Container'
import Product from '../../components/Product/Product'
import { Helmet } from 'react-helmet-async'
import Loading from '../../components/Loading/Loading'
import MessageBox from '../../components/MessageBox/MessageBox'
// import logger from "use-reducer-logger"


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}

export const Home = () => {
//dipatch to update on the state 
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    Products: [],
    error: ''
  })
  // const [state, dispatch] = useReducer(reducer, initialState)


  async function GetProducts() {
    dispatch({ type: 'FETCH_REQUEST' })
    try {
      const { data } = await axios.get("/api/proudcts")
      dispatch({ type: 'FETCH_SUCCESS', payload: data })

       
    }
    catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message })

    } 
  }

  useEffect(() => {
    GetProducts()
  }, [])

  return <>
  <Container>
 <Helmet>
  <title>Amazona</title>
 </Helmet>
    <h1 className='mb-4 mt-2 fw-bold  ms-4'>Featured products</h1>
  
    <div className="row   g-4">
        {loading ? <Loading/> : error ? 
        <MessageBox   variant='danger'>{error}</MessageBox>
        :
      
            products?.map((proudct, index) =>
              <div key={index} className="col-md-3 site-container  col-sm-6" >
               
               <Product proudct={proudct}/>
              </div>

            )}
      </div>





    </Container>
  </>

}
