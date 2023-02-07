import  express  from "express";
import Product from "../Models/ProductModel.js";



const ProductRouter =express.Router()


ProductRouter.get('/', async function (req,res){

    const products= await  Product.find()
    res.send(products)
}

)

ProductRouter.get("/slug/:slug", async(req,res)=>{
    const product =await Product.findOne({ slug :req.params.slug} )
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message: "product not found "})
    }
    
})

ProductRouter.get("/:id", async(req,res)=>{ 
    const product =await  Product.findById( req.params.id )
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message: "product not found "})
    }
    
})


export default ProductRouter