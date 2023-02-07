import  express  from "express";
import path from 'path'
import dotenv from "dotenv"
import mongoose from "mongoose"
import seedRouter from "./routes/seedRouter.js";
import ProductRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";




dotenv.config();
mongoose.set("strictQuery", false);

//to load the variabule in env here 
mongoose.connect(process.env.MONGODB_URI).then(()=>{

    console.log('connect to db')
}).catch((err)=>{
    console.log(err.message)
})



//creating server 
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });

app.use('/api/seed',seedRouter)

app.use('/api/proudcts',ProductRouter)
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter);
const __dirname= path.resolve()
app.use(express.static(path.join(__dirname,'/front-end/build')))
app.get('*',(req,res)=> res.sendFile(path.join(__dirname,'/front-end/index.html')))

app.use((err,req,res,next)=>{
    res.status(5000).send({message:err.message})
})









const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`)
} )
