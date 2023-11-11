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
// import Data from "./dataset.js";
import axios from "axios";
import cheerio from "cheerio";
import User from "../models/User.js";
// import puppeteer from "puppeteer";

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
      // console.log(user);
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

//get user
route.get("/get-user", (req, res) => {});

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
      // console.warn("adf");
      const token = req.headers?.cookie.split("=")[1];
      const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
      // console.log(token);
      const user = await Users.find({ _id: decode.userID });
      console.log(user[0]);
      if (user[0]) {
        console.log(req.params);
        const { id } = req.params;
        console.log("id", id);
        // const userCart = user[0].cart;
        // console.log("cart", cart);
        // console.log("productExist1");
        // const { cart } = await Users.find(
        //   { _id: user[0]._id },
        //   { "cart.id": id }
        // )[0];
        const productExist = await Users.find(
          { _id: user[0]._id },
          { cart: { $elemMatch: { id } } }
        );
        const { cart } = productExist[0];
        console.log(cart);
        // console.log("productExist3", productExist[0].cart);
        if (cart.length > 0) {
          console.log(cart[0].qty);
          const updatedCart = await User.updateOne(
            { _id: user[0]._id, "cart.id": cart[0].id },
            { $inc: { "cart.$.qty": 1 } }
            // { $set: { cart: { id: { qty: qty + 1 } } } }
          );
          console.log(cart[0].qty);
          console.log(updatedCart);
        } else {
          console.log("2");
          Users.updateOne(
            { _id: user[0]._id },
            { $push: { cart: { id, qty: 1 } } }
          )
            .then((cartProduct) => {
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
            })
            .catch((err) => {
              console.log(err.message);
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

// remove from cart
route.get("/remove-cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.headers.cookie.split("=")[1]);
    // console.log(id);
    const token = req.headers?.cookie.split("=")[1];
    const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
    const user = await Users.findOne({ _id: decode.userID });
    console.log(user);
    const removedItem = await Users.updateOne(
      { _id: user._id },
      { $pull: { cart: { id: id } } }
    );
    // console.log(removedItem);
    if (removedItem) {
      res.json({
        status: "success",
        message: "Product removed from cart",
        removedItem,
      });
    } else {
      res.json({
        status: "failed",
        message: "Something went wrong",
      });
    }
  } catch (error) {
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
      const userCart = user[0].cart;
      // console.log(userCart);
      const cartId = [];
      userCart.forEach((o) => {
        cartId.push(o.id);
      });
      // console.log("f", cartId);
      const cartProduct = await Product.find({
        _id: {
          $in: cartId,
        },
      });
      // console.log(cartProduct);
      res.json({
        status: "success",
        message: "Authenticate User :-)",
        cartProduct,
        userCart,
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

//add-to-notify
route.get("/add-to-notify/:id", async (req, res) => {
  try {
    if (req.headers?.cookie.split("=")[0]) {
      // console.warn("adf");
      const token = req.headers?.cookie.split("=")[1];
      const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
      // console.log(token);
      const user = await Users.find({ _id: decode.userID });
      // console.log(user)
      if (user) {
        console.log(req.params);
        const { id } = req.params;
        // console.log("id", id);
        // const cart = user[0].cart;
        // console.log("cart", cart);
        // if(){

        // }
        // console.log(req.body)
        // console.log(user[0]._id.toString());
        // user.cart[0].id = index
        const notify = await Users.updateOne(
          { _id: user[0]._id },
          { $push: { notify: id } }
        );
        if (notify) {
          res.json({
            status: "success",
            message: "Product added for receiving notification",
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

//search
route.post("/search", async (req, res) => {
  try {
    const { search } = req.body;
    console.log(search, req.body);
    const query = search[0].toUpperCase() + search.slice(1);
    // console.log(query);
    const pname = await Product.find({ pname: query });
    const pcat = await Product.find({ pcat: query });
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

//get suscription
route.post("/suscribing", async (req, res) => {
  try {
    console.log("yes");
    const { selectedPlan } = req.body;
    console.log("selectedPlan", selectedPlan);
    const token = req.headers?.cookie.split("=")[1];
    const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
    const user = await Users.findOne({ _id: decode.userID });
    console.log(user);
    var instance = new Razorpay({
      key_id: process.env.PAYMENT_KEY_ID,
      key_secret: process.env.PAYMENT_KEY_SECRET,
    });
    var options = {
      amount:
        selectedPlan === "basic"
          ? 99 * 100
          : selectedPlan === "standard"
          ? 199 * 100
          : 599 * 100,
      currency: "INR",
      receipt: "reciept1",
    };
    const order = await instance.orders.create(options);
    res.json({
      status: "success",
      message: "",
      order,
      user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//saving suscribed
route.post("/suscribed/:id/:selectedPlan", async (req, res) => {
  console.log(req.params);
  const { id, selectedPlan } = req.params;
  console.log(id, selectedPlan);
  // const user = User.findOne({ _id: req.params.id });
  // console.log(user);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (generated_signature == razorpay_signature) {
    //save in database
    // console.log(user._id, req.params.selectedPlan);
    const userSubs = await Users.updateOne(
      { _id: id },
      {
        $push: {
          subs: { is: true, plan: selectedPlan, at: Date.now() },
        },
      }
    );
    //res.redirect
    console.log(userSubs);
    res.send("payment is successfull");
  }
});

//payment
route.post("/payment", async (req, res) => {
  try {
    console.log("cookie", req.headers.cookie);
    const { _id } = req.body;
    console.log(req.body);
    console.log(_id);
    const token = req.headers.cookie.split("=")[1];
    console.log("token", token);
    const decode = jwt.verify(token, "RroshansinghRoshanSinghROSHANSINGHS");
    const user = await Users.findOne({ _id: decode.userID });
    console.log(user);
    // const amount = Number(pprice.replaceAll(",", ""));
    // console.log(`http://localhost:8000/api/get-product/${_id}`);
    // console.log(amount * 100);
    const { data } = await axios.get(
      `http://localhost:8000/api/get-product/${_id}`
    );
    console.log(data);
    const product = data.isExist;
    console.log(typeof Number(data.isExist.pprice));

    console.log(product);
    var instance = new Razorpay({
      key_id: process.env.PAYMENT_KEY_ID,
      key_secret: process.env.PAYMENT_KEY_SECRET,
    });
    var amount = 0;
    if (user.subs.length > 0) {
      console.log("1");
      if (user.subs[0].is === true) {
        console.log("2");
        amount = Number(product.pprice) * 95 + 50 * 100;
        // localStorage.setItem("is", true);
      } else {
        console.log("3");
        amount = (Number(product.pprice) + 100) * 100;
      }
    } else {
      console.log("4");
      amount = (Number(product.pprice) + 100) * 100;
    }
    var options = {
      amount: amount,
      currency: "INR",
      receipt: "reciept1",
    };
    const order = await instance.orders.create(options);
    res.send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//payment verification
route.post("/payment-verification/:uid/:pid", async (req, res) => {
  console.log(req.params);
  const { uid, pid } = req.params;
  console.log(uid, pid);
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

    const userOrder = await Users.updateOne(
      { _id: uid },
      { $push: { order: { pid, oid: razorpay_order_id } } }
    );
    //res.redirect
    // res.json({
    //   status: "success",
    //   message: "Payment Successfull :-)",
    // });
    res.redirect("http://localhost:3000/payment-successfull");
    // res.render("/")
  } else {
    res.redirect("http://localhost:3000/check");
    // res.json({
    //   status: "failed",
    //   message: "Payment Unsuccessfull :-(",
    // });
  }
});

//product-detail
route.get("/product-detail", (req, res) => {});

//get key
route.get("/get-key", (req, res) => {
  res.status(200).json({ key: process.env.PAYMENT_KEY_ID });
});

export default route;
