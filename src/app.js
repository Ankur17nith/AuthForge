const express = require('express');
const cookieParser = require('cookie-parser');
const UserRouter = require("./routes/userRoutes");
const MongoConnect= require('./config/db');
const {port}= require("./config/env")
const app = express();
const PORT= port;

MongoConnect();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.json())

app.use('/api',UserRouter)

app.listen(PORT, ()=>{
    console.log(`Express Server is Connected at PORT:${PORT}`);
})
