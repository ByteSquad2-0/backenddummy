let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    minlength:1,
  },
  password:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    minlength:1,
  },
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);