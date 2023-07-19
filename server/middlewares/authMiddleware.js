const jwt=require("jsonwebtoken");
module.exports=(req,res,next)=>{ //next method will go to try block of userRoutes 
    try {
        //get token from header
        const token= req.header("authorization").split(" ")[1];
        const decryptedToken=jwt.verify(token,process.env.jwt_secret);
        req.body.userId= decryptedToken.userId;  
        next();
    } catch (error) {
        res.send({
            sucess:false,
            message: error.message
        })
    }
}