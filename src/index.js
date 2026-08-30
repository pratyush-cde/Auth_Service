const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const UserService = require("./services/user-service");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started at PORT: ${PORT}`);

    const service = new UserService();

    const token = service.createToken({
      email: "this@fullu.com",
      id: "1",
    });

    console.log("Token:", token);

    const response = service.verifyToken(token);

    console.log("Decoded:", response);
  });
};

prepareAndStartServer();
