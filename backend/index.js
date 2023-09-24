import "./db/connection.js"
import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// import multer from "multer";
// import fs from "./"
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
dotenv.config()
// app.use(multer({dest:"./public/uploads",rename: function (fieldname, filename) {
    // return fieldname;}}))
app.use("/api/",routes);



app.listen(8000,(err)=>{
    if(err) console.log(err.message)
    console.log("server started...")
})