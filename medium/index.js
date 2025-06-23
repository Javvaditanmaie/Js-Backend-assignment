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

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vibeRoutes = require('./routes/vibes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to VibeCheck API');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vibes', vibeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server blasting off on port ${PORT}`);
});
