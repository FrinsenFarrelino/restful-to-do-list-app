const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);
const User = require("./models/Users")(sequelize);
const Todo = require("./models/Todos")(sequelize);

const app = express();

app.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    User.sync();
    Todo.sync();
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
