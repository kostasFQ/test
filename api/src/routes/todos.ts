import express from "express";
import { getTodos, deleteTodo, addTodo, updateTodo } from "../controllers/todosController";
import appPaths from "../paths";

const router = express.Router();

router.get(appPaths.todos.sub.get, getTodos);
router.post(appPaths.todos.sub.post, addTodo);
router.put(appPaths.todos.sub.put, updateTodo);
router.delete(appPaths.todos.sub.delete, deleteTodo);

export default router;
