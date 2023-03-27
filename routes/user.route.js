const express=require("express")
const userRouter=express.Router()
const {UserModel}= require("../model/user.model")
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists, please login' });
    }
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"Reg has been done"})
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})



userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    try {
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login success","token":jwt.sign({"userId":user._id},"avnish")})
                }else{
                    res.status(400).send({"msg":"Wrong Crendential"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={
    userRouter
}