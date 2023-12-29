import db from ".";
import { parseTodo } from "../helpers";
import { DBTodo, Todo, ID } from "../types";

export function getUserTodos(userId: ID): Todo[] {
  const todos = db.prepare('SELECT * FROM todos WHERE userId = ?')
    .all([userId.toString()]) as DBTodo[];

  return todos ? todos.map(parseTodo) : [];
};

export function getExistingTodo(id: ID, userId: ID): Todo {
  const todo = db.prepare('SELECT * FROM todos WHERE id = ? AND `userId` = ?')
    .get([id.toString(), userId.toString()]) as DBTodo;

  return todo ? parseTodo(todo) : undefined;
}

export function addNewTodo(title: string, userId: ID): Todo {
  const newTodoValues = { title, userId, isDone: false };
  const { lastInsertRowid: id } = db.prepare('INSERT INTO todos(title, isDone, userId) VALUES (?, ?, ?)')
    .run([newTodoValues.title, newTodoValues.isDone.toString(), newTodoValues.userId.toString()]);

  return { ...newTodoValues, id };
}

export function updateExistingTodo(data: Todo): Todo {
  const values = [data.title, data.isDone.toString(), data.id.toString(), data.userId.toString()];
  db.prepare('UPDATE todos SET `title` = ?, `isDone` = ? WHERE `id` = ? AND `userId` = ?').run(values);

  return data;
}

export function removeTodo(id: ID, userId: ID): void {
  db.prepare('DELETE FROM todos WHERE id = ? AND userId = ?').run([id.toString(), userId.toString()]);
}
