const { Todo } = require("../models");

async function createTodo(req, res) {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllTodos(req, res) {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getTodoById(req, res) {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const todo = await Todo.update(
      { title, description },
      { where: { id, userId: req.user.id } }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;

  try {
    const todo = await Todo.destroy({ where: { id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
