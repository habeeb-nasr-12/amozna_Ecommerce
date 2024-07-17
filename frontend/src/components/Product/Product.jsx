import React from 'react'
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from '../Rating/Rating'
import axios from 'axios'
import { useContext } from 'react'
import { contextStore } from '../Context/ContextStore'



const Product = (props) => {
    const { proudct } = props
    const { state, dispatch: contextDispatch } = useContext(contextStore)
    const {cart} =state
    const {cartItems}= cart

    async function addToCart (item){
        const exsitItem = cartItems?.find((x)=> x._id==proudct._id);
        const quantity = exsitItem?exsitItem.quantity+1 :1 ;
        let {data} = await axios.get(`/api/proudcts/${item._id}`)
        if (data.countInStock<quantity){
            window.alert('sorry,product is out of stock')  
            return;
             }
            contextDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}})
        }
    return (
        <Card className="product " >

            <Link to={`/product/${proudct.slug}`}>
                <img src={proudct.image} className="card-img-top" alt={proudct.name} />
            </Link>

            <Card.Body>
                <Link to={`/product/${proudct.slug}`}>

                    <Card.Title> {proudct.name}</Card.Title>
                </Link>
                <Rating rating={proudct.rating} numReviews={proudct.numReviews}></Rating>
                <Card.Text> ${proudct.price}</Card.Text>
                {proudct.countInStock==0 ? <Button variant="light" disabled >Out of Stock </Button>:
                <Button onClick={()=> addToCart(proudct)} >Add to cart</Button>
                }
                
            </Card.Body>


        </Card>
    )
}

export default Product
