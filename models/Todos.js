const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Todo = sequelize.define("Todo", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Todo;
};
