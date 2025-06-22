/**const express=require("express")
const zod=require("zod")
const dotenv=require("dotenv")
dotenv.config()
const app=express()
const mongoose=require("mongoose")
const connectDB = require("./config/db")
const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);

mongoose.connect(process.env.url)
.then().console.log('conneted')
.catch().console.error('not connected',err)

app.get('/',(req,res)=>{
    res.send("get connected ")
})
const userschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const user=mongoose.model("user",userschema)

const signup=zod.object({
    username:zod.String().min(5),
    email:zid.email(),
    password:zod.String().min()
})
app.post('/api/v1/auth/signup',(req,res)=>{
    const parsedata=signup.safeParse(req.body)
    if (!parsedata.success) {
    return res.status(400).json({ error: parsedata.error.errors });
  }
})

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
connectDB()**/

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const app = express();
app.use(express.json());
const vibeRoutes = require('./routes/vibes');
app.use('/api/v1/vibes', vibeRoutes); 
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
  res.send('API is running');
});
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
connectDB(); // ⬅️ Connect DB on startup
