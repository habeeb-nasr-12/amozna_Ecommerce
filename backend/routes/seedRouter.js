import  express  from "express"

import data from "../data.js"
import Product from "../Models/ProductModel.js"
import User from "../Models/UserModel.js"
// creatig route 
  const seedRouter =express.Router()

  seedRouter.get('/',async function  (req,res){

    await Product.remove({})
    const createdProducts= await Product.insertMany(data.proudcts)
    


    await User.remove({})
    const createdUser= await User.insertMany(data.users)
    res.send({ createdProducts ,createdUser})



  }

  
  )
  export default seedRouter;