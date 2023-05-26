const express = require("express");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const { User, Role } = require("./models/index");

const app = express();

const prepareAndStartServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log("Server started on port", PORT);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
    const u1 = await User.findByPk(2);
    const r1 = await Role.findByPk(4);

    // u1.addRole(r1);
    const response = await u1.hasRoles(r1);
    console.log(response);
  });
};

prepareAndStartServer();
