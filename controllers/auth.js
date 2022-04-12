const User = require("../modules/user");
const jwt = require("jsonwebtoken")
exports.postLogIn = async (req, res, next) => {

     User.findOne({ email: req.body.email }).then(user => {

        console.log(user);
        if(!user)
      return  res.status(400).json({ msg:"login unsuccessfully" })


        User.findOne({ password: req.body.password }).then(password => {
            if(!password)
            return    res.status(400).json({ msg:"login unsuccessfully" })
            
           const token = jwt.sign({ email:req.body.email , userId:user._id.toString()}, "key",{expiresIn:"1h"})
            res.status(201).json({token:token , msg:"login successfully" })

         })
       

     })
     .catch(err => {
        res.status(400).json({ msg:"login unsuccessfully" })
    console.log(err);
     });;
    

  
};
