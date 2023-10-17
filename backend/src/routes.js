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
// import Dataset from "./dataset.json";
import Data from "./dataset.js";
// import axios from "axios";
// import cheerio from "cheerio";

const route = express.Router();

// route.get("/url",(req,res)=>{
//     console.log("hiii")
//     axios.get(req.body.url).then((data)=>{
//         console.log(data)
//         const $ =  cheerio.load(data)
//         res.send($("#a-offscreen"))
//     })
// })
route.get("/home", (req, res) => {
  res.send("Welcome to home page...");
});
// image uploading storage
let uniquefile = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/uploads")) {
      fs.mkdirSync("public/uploads");
    }
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    uniquefile = uniqueSuffix + file.originalname;
    cb(null, uniqueSuffix + file.originalname);
    // console.log(file.path)
  },
});
const upload = multer({ storage: storage });

//jwt token
const generateAuthToken = async (id) => {
  try {
    let token = jwt.sign(
      { userID: id },
      "RroshansinghRoshanSinghROSHANSINGHS",
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

//get cookie verify user
route.get("/verify-user", async (req, res) => {
  try {
    // console.log(req.headers?.cookie.split("=")[1]);
    const token = req.headers?.cookie.split("=")[1];
    const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
    const user = await Users.find({ _id: decode.userID });
    if (user) {
      res.json({
        status: "success",
        message: "Authenticate User :-)",
        user,
      });
    } else {
      res.json({
        status: "failed",
        message: "Unauthenticate User :-(",
      });
    }
  } catch (err) {}
});

//logout-user
route.get("/logout-user", (req, res) => {
  try {
    if (req.headers?.cookie.split("=")[0]) {
      res.clearCookie(req.headers?.cookie.split("=")[0]).json({
        status: "success",
        message: "User Logged Out :-)",
      });
    } else {
      res.json({
        status: "failed",
        message: "User not Logged Out :-(",
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// loging user
route.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await Users.findOne({ email });
      console.log(user);
      if (user != null) {
        const dePassword = await bcryptjs.compare(password, user.password);
        if (email === user.email && dePassword) {
          const token = await generateAuthToken(user._id);
          // console.log(token)
          res
            .cookie("shopzilla", token, {
              expires: new Date(Date.now() + 86400000),
              httpOnly: true,
              path: "/",
              sameSite: "strict",
            })
            .json({
              status: "success",
              message: "Login Successfull :-)",
              user,
              token: token,
            });
        } else {
          res.json({
            status: "failed",
            message: "Bad Credentials :-(",
          });
        }
      } else {
        res.json({
          status: "failed",
          message: "Bad Credentials :-(",
        });
      }
    } else {
      res.json({
        status: "failed",
        message: "Please fill all the fields :-(",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//registering user
route.post("/signup", upload.single("profile"), async (req, res) => {
  // console.log(req.body)
  try {
    const { name, username, email, password, cpassword, mobile, gender } =
      req.body;
    const profile = req.file.filename;
    console.log(
      name,
      username,
      email,
      password,
      cpassword,
      mobile,
      gender,
      profile
    );
    if (
      name &&
      username &&
      email &&
      password &&
      cpassword &&
      mobile &&
      gender &&
      profile
    ) {
      if (await Users.findOne({ email })) {
        const dir = path.resolve(
          path.join("public/uploads" + "/" + uniquefile)
        );
        fs.unlinkSync(dir);
        res.send({
          status: "failed",
          message: "Email already exists :-(",
        });
      } else {
        if (await Users.findOne({ username })) {
          const dir = path.resolve(
            path.join("public/uploads" + "/" + uniquefile)
          );
          fs.unlinkSync(dir);
          res.send({
            status: "failed",
            message: "Username already taken :-(",
          });
        } else {
          if (password === cpassword) {
            const user = new Users({
              name,
              username,
              email,
              password,
              mobile,
              gender,
              profile,
            });
            user.save();
            res.send({
              status: "success",
              message: "Registration successfull :-) ",
              user,
            });
          } else {
            const dir = path.resolve(
              path.join("public/uploads" + "/" + uniquefile)
            );
            fs.unlinkSync(dir);
            res.send({
              status: "failed",
              message: "Password and Confirm Password does not match :-(",
            });
          }
        }
      }
    } else {
      const dir = path.resolve(path.join("public/uploads" + "/" + uniquefile));
      fs.unlinkSync(dir);
      res.json({
        status: "failed",
        message: "Please fill all the fields :-(",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Add Product
route.post("/add-product", upload.single("pimg"), async (req, res) => {
  try {
    console.log(req.body);
    const { pname, pprice, pdesc, pcat, pqty } = req.body;
    const pimg = req.file.filename;
    console.log(pname, pprice, pdesc, pcat, pqty, pimg);
    if (pname && pprice && pimg && pdesc && pcat && pqty) {
      const product = await new Product({
        pname,
        pimg,
        pcat,
        pdesc,
        pprice,
        pqty,
      });
      product.save();
      res.json({
        status: "success",
        message: "Product added successfully :-)",
        product,
      });
    } else {
      const dir = path.resolve(path.join("public/uploads" + "/" + uniquefile));
      fs.unlinkSync(dir);
      res.json({
        status: "failed",
        message: "Please fill all the fields :-(",
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Get Product
route.get("/get-product", async (req, res) => {
  try {
    const product = await Product.find();
    res.json({
      status: "success",
      message: "Product added successfully :-)",
      product,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//get user by id
route.get("/get-user/:_id", async (req, res) => {
  try {
    const _id = req.params;
    const isExist = await Users.findOne({ _id });
    if (isExist) {
      res.json({
        status: "success",
        message: "User found :-)",
        isExist,
      });
    } else {
      res.json({
        status: "failed",
        message: "User not found :-(",
      });
    }
  } catch {
    res.status(400).send(err.message);
  }
});

//get product by id
route.get("/get-product/:_id", async (req, res) => {
  try {
    const _id = req.params;
    const isExist = await Product.findOne({ _id });
    if (isExist) {
      res.json({
        status: "success",
        message: "Product found :-)",
        isExist,
      });
    } else {
      res.json({
        status: "failed",
        message: "Product not found :-(",
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//add-to-cart
route.post("/add-to-cart/:id", async (req, res) => {
  try {
    if (req.headers?.cookie.split("=")[0]) {
      console.warn("adf");
      const token = req.headers?.cookie.split("=")[1];
      const decode = await jwt.verify(
        token,
        "RroshansinghRoshanSinghROSHANSINGHS"
      );
      console.log(token);
      const user = await Users.find({ _id: decode.userID });
      // console.log(user)
      if (user) {
        const id = req.params;
        console.log(id);
        // console.log(req.body)
        console.log(user[0]._id.toString());
        // user.cart[0].id = index
        const cartProduct = await Users.updateOne(
          { _id: user[0]._id },
          { $push: { cart: id } }
        );
        if (cartProduct) {
          res.json({
            status: "success",
            message: "Product added to cart",
          });
        } else {
          res.json({
            status: "failed",
            message: "Something went wrong",
          });
        }
      }
    } else {
      res.json({
        status: "failed",
        message: "Unauthenticated User",
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//mycart
route.get("/mycart", async (req, res) => {
  try {
    if (req.headers?.cookie.split("=")[0]) {
      const token = req.headers?.cookie.split("=")[1];
      const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
      const user = await Users.find({ _id: decode.userID });
      const cart = user[0].cart;
      const cartId = [];
      cart.forEach((o) => {
        cartId.push(o.id);
      });
      // console.log("f", cartId);
      const cartProduct = await Product.find({
        _id: {
          $in: cartId,
        },
      });
      console.log(cartProduct);
      res.json({
        status: "success",
        message: "Authenticate User :-)",
        cartProduct,
      });
    } else {
      res.json({
        status: "failed",
        message: "Unauthenticated User",
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//search
route.post("/search", async (req, res) => {
  try {
    const { search } = req.body;
    console.log(search, req.body);
    // const name = await Product.find({pname:search})
    // const cat = await Product.find({pcat:search})
    // Dataset.forEach(()=>{

    // },Dataset.)
    const pcat = await Data.filter((cat) => cat.pcat == search);
    const pname = await Data.filter((name) => name.pname == search);
    // res.redirect("/abc",{"pcat":pcat,"pname":pname})
    console.log(pcat, pname);
    res.json({
      status: "success",
      message: "Search found :-)",
      pname,
      pcat,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//payment
route.post("/payment", async (req, res) => {
  try {
    const { pname, pprice, pcat, pdesc, pimg } = req.body;
    // console.log(typeof(pprice))
    const amount = Number(pprice.replaceAll(",", ""));
    console.log(amount * 100);
    var instance = new Razorpay({
      key_id: process.env.PAYMENT_KEY_ID,
      key_secret: process.env.PAYMENT_KEY_SECRET,
    });
    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "reciept1",
    };
    const order = await instance.orders.create(options);
    res.send(order);
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
    res.status(400).send(err.message);
  }
});

route.post("/payment-verification", async (req, res) => {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature)
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  // console.log("r",razorpay_signature)
  // console.log("g",generated_signature)
  if (generated_signature == razorpay_signature) {
    //save in database
    //res.redirect
    res.send("payment is successfull");
  }
});

route.get("/get-key", (req, res) => {
  res.status(200).json({ key: process.env.PAYMENT_KEY_ID });
});

// route.post("/r",async(req,res)=>{
//     const{e,p}=req.body
//     if( e && p ){
//         if( e ==="rosh" && p === "1" ){
//             const token = jwt.sign(
//                 {e},
//                 "RroshansinghRoshanSinghROSHANSINGHS",
//                 {expiresIn:"1d"}
//                 )
//             console.log("t",token)
//             res.cookie("token",token,{
//                 path:"/",
//                 httpOnly:true,
//                 expires:new Date(Date.now() + 1000 * 86400), //1 day
//                 sameSite:"strict",
//                 secure:true
//             })
//             res.json({
//                 status:"success",
//                 auth:1,
//                 token
//             })
//         }
//         else{
//             res.json({
//                 status:"failed",
//                 auth:0
//             })
//         }
//     }
//     else{
//         res.json({
//             status:"failed",
//             auth:-1
//         })
//     }
// })
// route.post("/l",(req,res)=>{
//     const{e,p}=req.body
//     if( e && p ){
//         if( e ==="rosh" && p === "1" ){
//             console.log(req.cookies)
//             console.log(req.cookies.token)
//             res.json({
//                 status:"success",
//                 auth:1
//             })
//         }
//         else{
//             res.json({
//                 status:"failed",
//                 auth:0
//             })
//         }
//     }
//     else{
//         res.json({
//             status:"failed",
//             auth:-1
//         })
//     }
// })

export default route;
