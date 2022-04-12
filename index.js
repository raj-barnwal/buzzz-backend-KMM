const express =require('express');
const app=express();
const cors =require('cors');
require('dotenv').config();
const helmet= require("helmet");
const morgon= require("morgan");
const userRouter= require("./routes/user");
const authRouter= require("./routes/auth");
const postRouter= require("./routes/post");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup=require("./passport");

//db connection
const mongoose= require("mongoose");

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





// const {signup, googlelogin}=require("./controller/auth");
// getting or importing routes
// const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(helmet());
app.use(morgon("common"));
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
}));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter );

// app.use(cookieSession({
//     name:"session",
    
//     maxAge: 24*60*60*100
// }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/heloo', (req, res)=>{
    res.send("heloo")
})

const PORT=process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`listening 5000 `)
})