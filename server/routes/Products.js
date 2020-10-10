const express = require("express");
const router = express.Router();
const db = require("../connection");
const multer = require("multer");
const sequelize = require("sequelize");

const productModel = require("../models/ProductModel");
const Seller = require("../models/SellerModel");

const DIR = "/home/wasim21/Desktop/digi-commerce/e-commerce-app/client/static";

let mainFile;
let previewFiles = [];

const checkFileExt = (fileName) => {
  if (fileName.match(/\.zip/)) {
    return {
      name: "zip",
      file: fileName.match(/\.zip/),
    };
  } else if (fileName.match(/\.jpg/)) {
    return {
      name: "jpg",
      file: fileName.match(/\.jpg/),
    };
  } else if (fileName.match(/\.png/)) {
    return {
      name: "png",
      file: fileName.match(/\.png/),
    };
  } else if (fileName.match(/\.gif/)) {
    return {
      name: "gif",
      file: fileName.match(/\.gif/),
    };
  }
};

const fileNameChange = (fileName, index) => {
  const fileNameChange = fileName.split("");
  fileNameChange.splice(index, 1, Date.now().toString());
  return fileNameChange.join("");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase();
    let Ext = checkFileExt(fileName);
    if (Ext.name === "zip") {
      let indexMatch = Ext.file.index - 1;
      fileName = fileNameChange(fileName, indexMatch);
      mainFile = fileName;
    } else if (Ext.name === "jpg" || Ext.name === "png" || Ext.name === "gif") {
      let indexMatch = Ext.file.index - 1;
      fileName = fileNameChange(fileName, indexMatch);
      previewFiles.push(fileName);
    }
    cb(null, fileName);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "application/zip" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error(
          `Only .png, .jpg and .gif format allowed! your file is ${file.mimetype}`
        )
      );
    }
  },
});

// Getting all products
router.get("/", async (req, res) => {
  try {
    // const products = await productModel.findAll();
    const products = await db.query(
      "SELECT products.*, users.name FROM products INNER JOIN users ON products.seller_id = users.id"
    );
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Get products from sellerId
router.get("/:seller_id", async (req, res) => {
  // res.send(products);
  try {
    let products = await productModel.findAll({
      where: {
        seller_id: req.params.seller_id,
      },
    });
    // const products = await productModel.findAll({ include: Seller });
    // const products = await db.query(
    //   `SELECT * FROM products WHERE products.seller_id = ${req.params.seller_id}`
    // );
    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Adding a product
router.post("/add", upload.any("files"), async (req, res) => {
  const productDetail = JSON.parse(req.body.productDetail);
  const id = JSON.parse(req.body.id);
  const filesInMain = JSON.parse(req.body.filesInMain);
  console.log(req.body, filesInMain);

  try {
    const product = await productModel.create({
      prod_name: productDetail.name,
      price: +productDetail.price,
      description: productDetail.description,
      category: productDetail.selectedCategory,
      sub_category: productDetail.selectedSubCategory,
      main_file: mainFile,
      preview_images: previewFiles,
      containing_files: filesInMain,
      tags: productDetail.tags,
      seller_id: id,
      rating: 0,
      created_at: new Date(),
    });

    setTimeout(() => {
      console.log(product);
      res.status(200).send(product);
      previewFiles = [];
    }, 1000);
  } catch (e) {
    console.log(e);
  }
});

// Deleting a product
router.delete("/delete/:prod_id", async (req, res) => {
  try {
    const productDelete = await productModel.destroy({
      where: {
        id: req.params.prod_id,
      },
    });
    res.status(200).send(true);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Like a product
router.post("/like", async (req, res) => {
  console.log(req.body);

  try {
    const like = await db.query(
      `INSERT INTO likes(user_id, prod_id, created_at) VALUES (${
        req.body.liked.userId
      }, ${req.body.liked.productId}, ${Date.now()})`
    );
    res.status(200).send(true);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Get likes of a product
router.get("/getlikes/:prod_id/:user_id", async (req, res) => {
  console.log(req.params);
  try {
    const likesCount = await db.query(
      `SELECT COUNT(prod_id) FROM likes WHERE prod_id=${req.params.prod_id}`
    );

    const userLikes = await db.query(
      `SELECT * FROM likes WHERE prod_id=${req.params.prod_id} AND user_id=${req.params.user_id}`
    );

    let likes = {
      likesCount,
      userLikes,
    };
    res.status(200).send(likes);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Delete Likes
router.delete("/deletelike/:prod_id/:user_id", async (req, res) => {
  console.log(req.params);
  try {
    const likeDeleted = await db.query(
      `DELETE FROM likes WHERE prod_id=${req.params.prod_id} AND user_id=${req.params.user_id}`
    );
    res.status(200).send(likeDeleted);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Get liked products for single user
router.get("/likedproducts/:user_id", async (req, res) => {
  try {
    const likedProducts = await db.query(
      `SELECT * FROM likes INNER JOIN products ON likes.prod_id = products.id WHERE likes.user_id = ${req.params.user_id}`
    );
    res.status(200).send(likedProducts);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
