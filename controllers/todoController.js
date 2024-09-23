import Todo from '../models/todoModel.js';
import Joi from 'joi';

const todoSchema = Joi.object({
  task: Joi.string().min(1).required(),
});

export const getTodos = async (req, res) => {
  const todos = await Todo.getAll();
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
};

export const updateTodo = async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.update(req.params.id, req.body);
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  await Todo.delete(req.params.id);
  res.status(204).send();
};
