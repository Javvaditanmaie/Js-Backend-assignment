const express=require("express");
const z=require("zod")
const app=express()
app.get('/',(req,res)=>{
    res.status(200).send('welcome')
})

let sampleVibes=[{ id: 1, mood: "happy", message: "Today is a great day!" },
    { id: 2, mood: "chill", message: "Relax and take it easy." },
    { id: 3, mood: "motivated", message: "Keep pushing forward!" }];
app.get('/api/v1/vibes',(req,res)=>{
    res.status(200).json(sampleVibes);
})

app.get('/api/v1/vibes/:id',(req,res)=>{
    const ids=parseInt(req.params.id);
    const searchid=sampleVibes.find(s=>s.id===ids);
    if(!searchid){
        return res.status(404).json({
            success:false,
            message:"That vibe is off the grid, not found."
        })
    }
    return res.status(200).json(searchid);
    
})

app.listen(5000,()=>{
    console.log("Server blasting off on port 5000")
})