import bcrypt from 'bcryptjs'
const data = {
    users:[
        {
            name :'habeeb',
            email:"habeebnasr4@gmail.com",
            password: bcrypt.hashSync('123456'),
            isAdmin:true
        }
    
        ,
            {
                name :'john',
                email:'user@exmaple.com',
                password: bcrypt.hashSync('123456'),
                isAdmin:false
            }
        ],
            
    





    proudcts:[
        {
            // _id: '1',
            name: "Nike Slim shirt",
            slug: "Nike-Slim-shirt",
            category: "shirts",
            image: "/images/p1.jpg",
            price:120,
            countInStock:10,
            brand:"Nike",
            rating:4.5,
            numReviews:10,
            description:"high quailty shirt"
        },
        {
            // _id: '2',
          name: "Adidas Fit shirt",
            slug: "adidas-fit-shirt",
            category: "shirts",
            image: "/images/p2.jpg",
            price:250,
            countInStock:0,
            brand:"Adidas",
            rating:4,
            numReviews:10,
            description:"high quailty Prodct"
        },
        {
            // _id: '3',
            name: "Nike Slim pant",
            slug: "Nike-Slim-pant",
            category: "pants",
            image: "/images/p3.jpg",
            price:25,
            countInStock:15,
            brand:"Nike",
            rating:4.5,
            numReviews:14,
            description:"high quailty Proudct"
        },
        {
            // _id: '4',
            name: "Adidas Fit pant",
            slug: "adidas-fit-pant",
            category: "pants",
            image: "/images/p4.jpg",
            price:65,
            countInStock:5,
            brand:"Puma",
            rating:4.5,
            numReviews:10,
            description:"high quailty Prodct"
        },
    ]
}

export default data