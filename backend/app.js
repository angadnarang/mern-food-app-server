const express =require('express');
const app= express();
const mongoose = require('mongoose');
const seedDB =require('./seed');
const cors=require('cors');

const uri = 'process.env.MONGO_URL';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}


    mongoose.connect(uri, options, (err) => {
      if (err) console.error(err);
      else console.log("database connection")
    })


// seedDB();

app.use(express.json()); 

app.use(cors(
    {
        origin:['http://localhost:3000'],
        credentials:true
    },
));


const foodRoutes = require('./api/foodRoutes');

app.use(foodRoutes);


app.get('/hello',(req,res)=>{
    res.status(200).json({msg:'Hello from the server'});
})



const port = process.env.PORT || 8000;


app.listen(port,(req,res)=>{
    console.log("server running at port 8000");
})