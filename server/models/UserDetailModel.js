const Sequelize = require("sequelize");
const db = require("../connection");

const UserDetails = db.define("user_details", {
  user_id: {
    type: Sequelize.INTEGER,
  },
  role_id: {
    type: Sequelize.INTEGER,
  },
  profile_img: {
    type: Sequelize.STRING,
  },
  about: {
    type: Sequelize.TEXT,
  },
});

module.exports = UserDetails;
