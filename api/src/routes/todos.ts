import express from "express";
import { getTodos, deleteTodo, addTodo, updateTodo } from "../controllers/todosController";
import appPaths from "../paths";

const router = express.Router();

router.get(appPaths.todos.get, getTodos);
router.post(appPaths.todos.post, addTodo);
router.put(appPaths.todos.put, updateTodo);
router.delete(appPaths.todos.delete, deleteTodo);

export default router;
