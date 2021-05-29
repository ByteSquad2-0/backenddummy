let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    minlength:3,
  },
  password:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    minlength:8,
  },
  name:{
    type:String,
    require:true,
    unique:false,
    trim:true,
    minlength:1,
  },
  pincode:{
    type:String,
    require:true,
    unique:false,
    trim:true,
    minlength:6,
  },
  email:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    minlength:1,
  }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);