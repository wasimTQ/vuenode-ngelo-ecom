const Sequelize = require("sequelize");
const db = require("../connection");
const Seller = require("./SellerModel");

const Product = db.define("products", {
  prod_name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING,
  },
  sub_category: {
    type: Sequelize.STRING,
  },
  seller_id: {
    type: Sequelize.INTEGER,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  main_file: {
    type: Sequelize.STRING,
  },
  tags: {
    type: Sequelize.ARRAY(15),
  },
  preview_images: {
    type: Sequelize.ARRAY(5),
  },
  containing_files: {
    type: Sequelize.ARRAY(30),
  },
  created_at: {
    type: Sequelize.DATE,
  },
});

module.exports = Product;
