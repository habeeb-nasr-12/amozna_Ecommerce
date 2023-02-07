


import Container from "react-bootstrap/esm/Container";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Main } from "./components/Main/Main";
import { Proudcts } from "./pages/Proudcts/Proudcts";
import {HelmetProvider} from 'react-helmet-async'
import { useContext } from "react";
import { contextStore } from "./components/Context/ContextStore";
import CartScreen from "./pages/CartScreen/CartScreen";
import SignIn from "./pages/SignIN/SIgnIn";
 
import'react-toastify/dist/ReactToastify.css'
import Shipping from "./pages/Shipping/Shipping";
import SignUp from "./pages/SignUp/SignUP";
import Payment from "./pages/Payment/Payment";
import Placeorder from "./pages/Placeorder/Placeorder";

import Order from "./pages/OrderScreen/Order";

import Orderhistory from "./pages/Orderhistory/Orderhistory"; 
import UserProfile from "./pages/Userprofile/UserProfile";








function App() {


const router = createHashRouter( [
 {path:"",element:<Main/>,children:[
  {path:"",element:<Home/>},
  {path:'/home',element:<Home/>},
  {path: "/product/:slug",element : <Proudcts/>},
  {path: "cart",element : <CartScreen/>},
  {path: "signin",element : <SignIn/>},
  {path: "login",element : <SignIn/>},
  {path: "signup",element : <SignUp/>},
  {path: "shipping",element : <Shipping/>},
  {path: "signin/shipping",element : <Shipping/>},
  {path: "payment",element : <Payment/>},
  {path: "/placeorder",element : <Placeorder/>},
  {path: "/orderhistory",element : <Orderhistory/>},
 {path: '/profile',element: <UserProfile/>},
  {path: "/order/:id",element : <Order/>},
  
 ]
 }
]
)



 




  return <>
  

   <RouterProvider router={router}/>

   
   </>
}

export default App;

