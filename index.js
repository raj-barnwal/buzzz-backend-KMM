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
const multer= require("multer");
const path= require("path");

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


app.use("/images", express.static(path.join(__dirname, "public/images")));


// const {signup, googlelogin}=require("./controller/auth");
// getting or importing routes
// const authRoutes = require("./routes/auth");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(morgon("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
}));
// app.use(cookieSession({
//     secret:"session",
//     resave: true,
//     saveUnInitialized:true
// }));
const session= cookieSession({
  secret:"session",
    resave: true,
    saveUnInitialized:true
})
app.use(session);
app.use("/api/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/posts", postRouter );



app.use(passport.initialize());
app.use(passport.session());

app.get('/heloo', (req, res)=>{
    res.send("heloo")
})

const PORT=process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`listening 5000 `)
})