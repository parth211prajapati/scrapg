const router = require("express").Router();
// const { response } = require("express");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
//new user registration this is an api

router.post("/register", async (req, res) => {
  //calback function will always be async
  try {
    //part 1 check if user already exists
    const user = await User.find({ email: req.body.email });
    console.log(user);
    // if (user) {
    //   throw new Error("User already exists");
    // }
    //part 2 if user does not exists, Hash the password

    const salt = await bcrypt.genSalt(10); //10 is the number of rounds
    const hashedPassword = await bcrypt.hash( req.body.password, salt);
    req.body.password = hashedPassword; //replacing the hashed password with the original password

    //part 3 save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/login",async(req,res)=>{
    try {
        //part 1 user does not exists
        const user=await User.findOne({ email: req.body.email })
        if(!user){
            throw new Error('User not found');
        }
        //part 2 compare password
        const validpassword=bcrypt.compare(   //.compare is an inbuild method of bcrypt
            req.body.password,user.password
        );
        if(!validpassword){
            throw new Error('Invalid password');
        }
        //in login we have to send token to then client then only we can login 
            //create and assign token
        const token=jwt.sign({userId:user._id},process.env.jwt_secret); //we are encrypting the user id
        //send response
            res.send({
                success: true,
                message: "User logged in successfully",
                data: token
            })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})

module.exports=router;