const express=require('express')
const cors=require('cors')
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');


require('dotenv').config();


const app=express();
const PORT= process.env.PORT || 5000;

mongoose.connect(MONGOURI, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("database is connected successfully!")
});

// initializing app
app.use(cors());
app.use(express.json());

// router
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use('/products', productssRouter);
app.use('/users', usersRouter);

// listning on the port
app.listen(PORT,()=>{
    console.log(`server is running on port number :${PORT}`);
})
