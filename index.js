const app = require("./src/app");

const { sequelize } = require("./models");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🤯 : Shuting Down....");
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  app.emit("Started");

  console.log(`Server is running on ${PORT} 🔥 `);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🤯 : Shuting Down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
