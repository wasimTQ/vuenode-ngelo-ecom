const Sequelize = require("sequelize");
const db = require("../connection");

const Seller = db.define("sellers", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.INTEGER,
  },
  created_at: {
    type: Sequelize.DATE,
  },
});

module.exports = Seller;
