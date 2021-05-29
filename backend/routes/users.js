const router = require('express').Router();
let User = require('../models/user.model');
const requireLogin = require('../middlewares/requireLogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

router.get('/',(req, res) => {
  return res.status(200).json({
    message:"Hello. Please sign in."
  });
});

router.post('/signin',(req, res) => {
  const {username,password} = req.body;
  if(!username || !password)
    {
        return res.status(422).json({error:"Please fill out all the fields."})
    }
    User.findOne({$or : [{username:username},{email:username}]})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Username or password is incorrect."})
        }
        bcrypt.compare(password,savedUser.password)
        .then(matchsuccess=>{
            if(matchsuccess)
            {
                return res.json({message:"You have been signed in successfully",username:savedUser.username,email:savedUser.email,pincode:savedUser.pincode,name:savedUser.name})
            }
            else{
                return res.status(422).json({error:"Username or password is incorrect."})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })  
});

router.post('/signup',(req, res) => {
  const {username,password,name,pincode,email} = req.body;
  if(!username || !password || !name || !pincode || !email)
    {
        return res.status(422).json({error:"Please fill out all the fields."})
    }
    bcrypt.hash(password,12)
    .then(haspassword=>{
        User.findOne({username:username})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"Username already exists. Please enter other username"})
            }
            User.findOne({email:email})
            .then((dupemail)=>{
                if(dupemail){
                    return res.status(422).json({error:"Email already exists. Please enter other email."})
                }
                const user = new User({
                    name,
                    username,
                    password:haspassword,
                    email,
                    pincode,
                })
                user.save()
                .then(user=>{
                    res.json({message:"Profile is created successfully."})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
    })
    })
        .catch(err=>{
            console.log(err)
        })
});

module.exports = router;
