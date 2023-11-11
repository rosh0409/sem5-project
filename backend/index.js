import "./db/connection.js";
import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import path from "path";
import puppeteer from "puppeteer";
import User from "./models/User.js";
import nodemailer from "nodemailer";
// import axios from "axios"
// import cheerio from "cheerio";

// import multer from "multer";
// import fs from "./"
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const url = "http://192.168.43.234:3000";
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", url],
  })
);
// , "http://192.168.0.103:3000"
// app.use(cors())
app.use(cookieParser());
app.use("/static", express.static("public/uploads"));
// console.log(__dirname);
dotenv.config();
// app.use(multer({dest:"./public/uploads",rename: function (fieldname, filename) {
// return fieldname;}}))
app.use("/api/", routes);

let fetchedPrice = [];

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  // const url = "http://192.168.43.234:3000";
  await page.goto(url);
  // Wait for the dynamic content to load (you may need to adjust the waiting time)
  await page.waitForSelector(".repeat");
  // Extract all div elements with class name "repeat"
  const elements = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll("div.repeat"));
    return divs.map((div) => div.textContent.trim());
  });
  elements.forEach((e) => {
    fetchedPrice.push({ pid: e.split("=")[1], price: e.split("=")[0] });
  });
  // console.log("fetched", fetchedPrice);
})();

const getPricePage = async () => {
  const user = await User.find({});
  // console.log(user);
  const sendNotify = [];
  user.forEach((u) => {
    if (u.notify.length !== 0) {
      sendNotify.push({ uid: u._id, pid: u.notify });
    }
  });
  console.log(sendNotify);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  // const url = "http://192.168.43.234:3000";

  await page.goto(url);

  // Wait for the dynamic content to load (you may need to adjust the waiting time)
  await page.waitForSelector(".repeat");

  // Extract all div elements with class name "repeat"
  const elements = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll("div.repeat"));
    return divs.map((div) => div.textContent.trim());
  });
  // Print the content of all "repeat" divs
  // elements.forEach((element, index) => {
  //   console.log(`Repeat Div ${index + 1}: ${element.split("=")[0]}`);
  // });
  // console.log("dropped", elements.indexOf("134900"));
  // fetchedPrice.forEach((fp, index) => {
  //   console.log(index);
  //   console.log(elements[index].split("=")[0]);
  //   console.log(fetchedPrice[index].split("=")[0]);
  // });
  // console.log(fetchedPrice);
  sendNotify.forEach((sn) => {
    const userPID = sn.pid;
    // console.log(userPID);
    fetchedPrice.forEach((fp, index) => {
      for (let j = 0; j < userPID.length; j++) {
        if (userPID[j] === fp.pid) {
          // console.log("userPID", userPID[j]);
          // console.log("fp.pid", fp.pid);
          // console.log("price", Number(fp.price));
          if (Number(fp.price) > Number(elements[index].split("=")[0])) {
            console.log("price droped");
            User.findOne({ _id: sn.uid })
              .then(({ email }) => {
                console.log(email);
                mailNotify(
                  "roshan.2002kumr@gmail.com",
                  "ccxf gtrl hkxv mvpj",
                  email,
                  userPID[j],
                  Number(fp.price),
                  Number(elements[index].split("=")[0])
                );
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        }
      }
    });
  });
  fetchedPrice = [];
  elements.forEach((e) => {
    fetchedPrice.push({ pid: e.split("=")[1], price: e.split("=")[0] });
  });
  await browser.close();
};

const mailNotify = (sender, password, reciever, pid, dprice, aprice) => {
  console.log(sender, password, reciever, pid, dprice, aprice);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender || "youremail@gmail.com", //sender
      pass: password || "yourpassword",
    },
  });

  var mailOptions = {
    from: sender || "youremail@gmail.com", //sender
    to: reciever || "myfriend@yahoo.com", //reciever
    subject: "Price Dropped ....!!!",
    text: `Congrats \n The price for the procduct id ${pid} has been drop from ${aprice} to ${dprice}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// setInterval(getPricePage, 10000);

app.listen(8000, (err) => {
  if (err) console.log(err.message);
  console.log("server started...");
});
