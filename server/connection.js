const Sequelize = require("sequelize");

const db = new Sequelize('e-commerce', 'wasim', 'templatedivME', {
  host: "127.0.0.1",
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

module.exports = db;
