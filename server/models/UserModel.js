const Sequelize = require("sequelize");
const db = require("../connection");

const Seller = db.define("users", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.INTEGER,
  },
  role: {
    type: Sequelize.STRING,
  },
  created_at: {
    type: Sequelize.DATE,
  },
});

module.exports = Seller;
