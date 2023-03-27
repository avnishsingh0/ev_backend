const express=require('express')
const postRouter=express.Router()
const {PostModel}=require("../model/post.model")
postRouter.get("/",async(req,res)=>{
    try {
        const posts= await PostModel.find()
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.post("/add",async(req,res)=>{
   try {
       const posts = new PostModel(req.body)
       await posts.save() 
       res.status(200).send({"msg":"A new Note has been added"})
   } catch (error) {
    res.status(400).send({"msg":error.message})
   }

})

// noteRouter.patch("/update/:noteId",(req,res)=>{
    
// })

// noteRouter.delete("/delete/:noteId",(req,res)=>{
    
// })

module.exports={
    postRouter
}