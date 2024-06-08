
import User from "../Model/user.js";
import Internship from "../Model/internship.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
let homePage = async (req, res) => {
  try {
    let data = await Internship.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

let login = async (req, res) => {
  try {
    let data = req.body;

// check if email exist
    let user = await User.findOne(
      { email: data.email },
      
    );

    if (!user) {
      return res.status(400).send('email is not found')
    }

    // password is incorrect
    
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(400).send({msg:'Invalid password',res:false});
    }
     else{

      const token=jwt.sign({_id:user._id},process.env.SecretToken);

      res.header('auth-token',token).send({msg:"Authentication Success",res:true})
     console.log(token);

     }



  } catch (err) {
    res.send(err);
  }
};

let signup = async (req, res) => {
  try {

  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(req.body.password,salt);

  // console.log(hashedPassword);

    let userData = req.body;
    let user = new User({
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    }); // This is only to create the USER
    let data = await user.save(); // THis is to save in DB
    res.send(data);
  } catch (err) {
    res.send(err);
  }

};



// token verify

function verifyToken(req,res,next){

  const token=req.headers('auth-token');

  if(typeof token!=='undefined'){
   req.token=token;
   next()
  }
  else{
    res.send({
      res:false,
      result:'Token is not valid'
    })
  }

}


let internshipApply = async (req, res) => {
 

jwt.verify(req.token,process.env.SecretToken,(err,authData)=>{
if(err){
  res.send({
    msg:"invalid1 token",
    res:false
  })
}
else{
  res.send({
    msg:"valid token",
    res:true,
    authData
  })
}
})

}

export { homePage, login, signup , internshipApply,verifyToken };
