const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../connection");

const userModel = require("../models/UserModel");

router.get("/", async (req, res) => {
  const user = await userModel.findAll();
  console.log(user);
  res.send(user);
});

router.post("/register", async (req, res) => {
  const userExist = await userModel.findOne({
    where: { email: req.body.userDetails.email },
  });

  if (userExist) {
    res.send({
      msg: "User already existed",
      isUser: true,
    });
    return;
  }
  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.userDetails.password, salt);

  console.log(hashedPassword);

  const user = await userModel.create({
    name: req.body.userDetails.username,
    email: req.body.userDetails.email,
    password: hashedPassword,
    role: req.body.userDetails.role,
    created_at: new Date(),
  });
  res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const userExist = await userModel.findOne({
    where: {
      email: req.body.userDetails.email,
      role: req.body.userDetails.role,
    },
  });

  if (!userExist) {
    res.send({
      msg: "User not found",
      isUser: false,
    });
    return;
  }

  const validPD = await bcrypt.compare(
    req.body.userDetails.password,
    userExist.password
  );

  if (!validPD) {
    res.send({
      msg: "Password does not match",
      isPassword: false,
    });
    return;
  }

  let genString = Math.floor(Math.random() * 500) * Date.now() * userExist.id;

  console.log(genString);

  const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const getRandomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);

  const getRandomSymbols = () => {
    const symbols = "!@#$%^&*()_=[];,./{}?/*-+";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const random = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols,
  };

  let generatedString = "";

  const neededArr = ["lower", "upper", "number", "symbol"];

  for (i = 0; i <= 50; i++) {
    let types = neededArr[Math.floor(Math.random() * neededArr.length)];
    generatedString += random[types]();
  }

  console.log(generatedString);
  let jwtExpires = 3600 * 3;
  const token = jwt.sign(
    {
      _id: userExist.id,
      rand: genString,
    },
    `${generatedString}`,
    {
      expiresIn: jwtExpires,
    }
  );
  console.log(token);

  res.header("auth-token", token).send({
    token,
    userExist,
    expiresIn: jwtExpires,
  });
});

module.exports = router;
