const express=require('express')
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
noteRouter.get("/",async(req,res)=>{
    try {
        const notes= await NoteModel.find()
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.post("/add",async(req,res)=>{
   try {
       const note = new NoteModel(req.body)
       await note.save() 
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
    noteRouter
}