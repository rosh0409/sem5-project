import express from "express";
import Users from "../models/User.js";
import bcryptjs from "bcryptjs";
import multer from "multer";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from "crypto";

// import data from "./dataset.json";


const route = express.Router()


route.get("/home",(req,res)=>{
    res.send("Welcome to home page...")
})
// image uploading storage
let uniquefile = ""
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(!fs.existsSync("public")){
            fs.mkdirSync("public")
        }
        if(!fs.existsSync("public/uploads")){
            fs.mkdirSync("public/uploads")
        }
        cb(null,"public/uploads")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        uniquefile = uniqueSuffix + file.originalname
        cb(null,uniqueSuffix + file.originalname)
        // console.log(file.path)

    }
})
const upload = multer({storage:storage})

// loging user
route.post("/signin", async (req,res)=>{
    try {
        const { email,password } = req.body
        if(email && password) {
            const user = await Users.findOne({email:email})
            console.log(user);
            if(user != null) {
                const dePassword = await bcryptjs.compare(password,user.password)
                if(email === user.email && dePassword){
                    // const savedUser = await Users.findOne({email:email})
                    // // Generate JWT Token
                    // const token = jwt.sign(
                    //     {userID:savedUser._id},
                    //     process.env.JWT_SECRET_KEY,
                    //     {expiresIn:"5d"}
                    //     )
                    const token = await user.generateAuthToken();
                    console.log(token)
                    res.cookie("shopzilla",token,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    })
                    res.json({
                        "status":"success",
                        "message":"Login Successfull :-)",
                        user,
                        "token":token
                    })
                } else {
                    res.json({
                        "status":"failed",
                        "message":"Bad Credentials :-("
                    })
                }
            } else {
                res.json({
                    "status":"failed",
                    "message":"Bad Credentials :-("
                })
            }
        } else {
            res.json({
                "status":"failed",
                "message":"Please fill all the fields :-("
            })
        }
    } catch (error) {
        
    }
});

//registering user
route.post("/signup",upload.single("profile"), async (req,res)=>{
    try {
        const {name,username,email,password,cpassword,mobile,gender} = req.body
        const profile = req.file.filename
        if(name && username && email && password && cpassword && mobile && gender && profile){
            if(await Users.findOne({email})){
                const dir = (path.resolve(path.join("public/uploads"+"/" + uniquefile)))
                const file = fs.unlinkSync(dir)
                res.send({
                    "status":"failed",
                    "message":"Email already exists :-("
                })
            }
            else{
                if(await Users.findOne({username})){
                    const dir = (path.resolve(path.join("public/uploads"+"/" + uniquefile)))
                    const file = fs.unlinkSync(dir)
                    res.send({
                        "status":"failed",
                        "message":"Username already taken :-("
                    })
                }
                else{
                    if(password === cpassword){
                        const user = new Users({
                            name,
                            username,
                            email,
                            password,
                            mobile,
                            gender,
                            profile
                        })
                        // user.save();
                        res.send({
                            "status":"success",
                            "message":"Registration successfull :-) ",
                            user
                        })
                    }
                    else{
                        const dir = (path.resolve(path.join("public/uploads"+"/" + uniquefile)))
                        const file = fs.unlinkSync(dir)
                        res.send({
                            "status":"failed",
                            "message":"Password and Confirm Password does not match :-("
                        })
                    }
                }
            }
        }
        else{
            const dir = (path.resolve(path.join("public/uploads"+"/" + uniquefile)))
            const file = fs.unlinkSync(dir)
            res.json({
                "status":"failed",
                "message":"Please fill all the fields :-("
            })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

// Add Product
route.post("/add-product",async(req,res)=>{
    try{
        const{ pname , pprice , pimg , pdesc , pcat } = req.body
        // console.log(pname , pprice , pimg , pdesc , pcat)
        if( pname && pprice && pimg && pdesc && pcat ){
            const product = await new Product({
                pname,
                pimg,
                pcat,
                pdesc,
                pprice
            })
            res.json({
                "status":"success",
                "message":"Product added successfully :-)",
                product
            })
        }
        else{
            res.json({
                "status":"failed",
                "message":"Please fill all the fields :-("
            })
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//get user by id
route.get("/get-user/:_id",async(req,res)=>{
    try{
        const _id  = req.params
        const isExist = await Users.findOne({_id})
        if(isExist){
            res.json({
                "status":"success",
                "message":"User found :-)",
                isExist
            })
        }
        else{
            res.json({
                "status":"failed",
                "message":"User not found :-("
            })
        }
    }
    catch{
        res.status(400).send(err.message)
    }
})

//get product by id
route.get("/get-product/:_id",async(req,res)=>{
    try{
        const _id  = req.params
        const isExist = await Product.findOne({_id})
        if(isExist){
            res.json({
                "status":"success",
                "message":"Product found :-)",
                isExist
            })
        }
        else{
            res.json({
                "status":"failed",
                "message":"Product not found :-("
            })
        }
    }
    catch{
        res.status(400).send(err.message)
    }
    
})

route.post("/search",async(req,res)=>{
    try {
        const search = toString(req.body)
        const name = await Product.find({pname:search})
        const cat = await Product.find({pcat:search})
        res.json({
            "status":"success",
            "message":"Search found :-)",
            name,
            cat
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//payment
route.post("/payment",async(req,res)=>{
    try {
        const {pname,pprice,pcat,pdesc,pimg} = req.body
        // console.log(typeof(pprice))
        const amount = Number(pprice.replaceAll(",",""))
        console.log(amount*100)
        var instance = new Razorpay({ key_id: process.env.PAYMENT_KEY_ID, key_secret: process.env.PAYMENT_KEY_SECRET })
        var options = {
            amount:amount*100,
            currency:"INR",
            receipt:"reciept1"
        }
        const order = await instance.orders.create(options)
        res.send(order)
        // instance.orders.create({
        //     amount,
        //     currency:"INR",
        //     receipt:"reciept1"
        // },(err,order)=>{
        //     if(!err){
        //         res.status(200).send({
        //             success:true,
        //             msg:"Order Successfull",
        //             order_id:order.id,
        //             amount:amount*100,
        //             key_id:process.env.PAYMENT_KEY_ID,
        //             product_name:pname,
        //             description:pdesc,
        //             contact:"987456321",
        //             name:"Roshan Singh",
        //             email:"roshan@gmail.com"
        //         });
            // }
            // else{
            //     res.status(400).send({success:false,msg:"Something went Wrong"})
            // }
        // })
        // res.json({
        //     "status":"success",
        //     i
        // })
        // .then(()=>{
        //     res.json({
        //         "status":"success"
        //     })
        // }).catch((err)=>{
        //     res.status(400).send(err.message)
        // })
        // instance.payments.capture(paymentId, amount, currency)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

route.post("/payment-verification",async(req,res)=>{
    console.log(req.body);
    const{razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body
    // console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature)
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const generated_signature = crypto.createHmac("sha256", process.env.PAYMENT_KEY_SECRET).update(body.toString()).digest("hex");
    // console.log("r",razorpay_signature)
    // console.log("g",generated_signature)
    if (generated_signature == razorpay_signature) {
        res.send("payment is successfull");
    }
})

route.get("/get-key",(req,res)=>{
    res.status(200).json({key:process.env.PAYMENT_KEY_ID})
})

route.post("/r",async(req,res)=>{
    const{e,p}=req.body
    if( e && p ){
        if( e ==="rosh" && p === "1" ){
            const token = jwt.sign(
                {e},
                "RroshansinghRoshanSinghROSHANSINGHS",
                {expiresIn:"1d"}
                )
            console.log("t",token)
            res.cookie("token",token,{
                path:"/",
                httpOnly:true,
                expires:new Date(Date.now() + 1000 * 86400), //1 day
                sameSite:"strict",
                secure:true
            })
            res.json({
                status:"success",
                auth:1,
                token
            })
        }
        else{
            res.json({
                status:"failed",
                auth:0
            })
        }
    }
    else{
        res.json({
            status:"failed",
            auth:-1
        })
    }
})
route.post("/l",(req,res)=>{
    const{e,p}=req.body
    if( e && p ){
        if( e ==="rosh" && p === "1" ){
            console.log(req.cookies)
            console.log(req.cookies.token)
            res.json({
                status:"success",
                auth:1
            })
        }
        else{
            res.json({
                status:"failed",
                auth:0
            })
        }
    }
    else{
        res.json({
            status:"failed",
            auth:-1
        })
    }
})




export default route;