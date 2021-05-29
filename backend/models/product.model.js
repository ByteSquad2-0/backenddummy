let mongoose = require('mongoose')

let exerciseSchema = new mongoose.Schema({
  username:{ type:String,require:true,},
  description:{ type:String,require:true,},
  pincode:{ type:Number,require:true,},
  date:{ type:Date,require:true,},
},{timestamps:true})

module.exports = mongoose.model('Product', exerciseSchema);