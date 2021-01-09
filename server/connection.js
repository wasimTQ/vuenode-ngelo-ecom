  const Sequelize = require("sequelize");

  const db = new Sequelize('e-commerce', 'wasim', 'templatedivME', {
    host: "127.0.0.1",
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  });

  // const hostname = "postgres://dqwhhqehhqicdy:5843c101c40a02e78fba6034fafb6108dc0bcd3172820e34eb70dcd87e89c214@ec2-52-202-146-43.compute-1.amazonaws.com:5432/d1ucdjnmn9u53s"

  // const db = new Sequelize(hostname, {
  //   dialect:  'postgres',
  //   protocol: 'postgres',
  //   logging:  true,
  //   define: {
  //     timestamps: false
  //   }
  // })

  module.exports = db;
