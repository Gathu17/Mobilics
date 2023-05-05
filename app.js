const express = require("express");
const app = express()
const cors = require("cors");
const mongoose = require('mongoose')
const User = require('./models/User')
const routes = require('./Routes/routes')
const data = require('./data/sample_data.json')
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes)


// Database connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("DB connection successful")
    
    User.find({}).then(users =>{
        if(users.length > 0){
          console.log('Users altready exists')
          return
        }
        const options = { writeConcern: { w: 'majority' }};
        User.insertMany(data,options).then(result => {
            console.log(result.length + ' Documents inserted successfully');
        })
        
    })
    
}).catch((err)=> {
    console.log(err)
    
});

app.listen(5000, () =>
	console.log(`Server is listening on port `)
);