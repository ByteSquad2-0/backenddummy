const express=require('express')
const cors=require('cors')
const mongoose = require('mongoose');


require('dotenv').config();


const app=express();
const PORT= process.env.PORT || 5000;

// mongo snippet
const uri='mongodb+srv://gattu:gattu123@cluster0.mowof.mongodb.net/MERN?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("mongo is connected !")
});

// initializing app
app.use(cors());
app.use(express.json());

// router
const exercisesRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use('/products', productssRouter);
app.use('/users', usersRouter);

// listning on the port
app.listen(PORT,()=>{
    console.log(`server is up ! on port number :${PORT}`);
})