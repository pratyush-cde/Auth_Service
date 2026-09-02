const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const UserService = require("./services/user-service");
const db = require("./models/index");
const { User, Role } = require("./models/index");
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started at PORT: ${PORT}`);
    // if (process.env.DB_SYNC) {
    //   db.sequelize.sync({
    //     alter: true,
    //   });
    // }

    const u1 = await User.findByPk(5);
    const r1 = await Role.findByPk(1);
    // u1.addRole(r1);
    const response = await u1.hasRole(r1);
    console.log(response);
  });
};

prepareAndStartServer();
