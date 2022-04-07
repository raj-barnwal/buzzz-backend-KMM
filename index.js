const express =require('express');
const app=express();
const cors =require('cors');
require('dotenv').config();
const helmet= require("helmet");
const morgon= require("morgan");
const userRouter= require("./routes/user");
const authRouter= require("./routes/auth")
const mongoose= require("mongoose")

mongoose.connect(process.env.MONGo_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });

//connecting db
// require("./db/connectDB");



// const {signup, googlelogin}=require("./controller/auth");
// getting or importing routes
// const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(helmet());
app.use(morgon("common"));
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// app.use('/api/googlelogin', googlelogin);

app.get('/heloo', (req, res)=>{
    res.send("heloo")
})

const PORT=process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`listening 5000 `)
})