const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const UserRepository = require("./repository/user-repository");
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started at PORT: ${PORT}`);
    const repo = new UserRepository();
    const response = await repo.getById(5);
    console.log(response);
  });
};

prepareAndStartServer();
