import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { COOKIE_NAME, jwtToken } from '../../consts';
import { addNewTodo, getExistingTodo, getUserTodos, removeTodo, updateExistingTodo } from '../db/todoQueries';
import { errorHandler } from '../helpers';

export const getTodos = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id } = jwt.verify(token, jwtToken) as JwtPayload;
    res.json(getUserTodos(id));
  } catch (err: unknown) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};

export const addTodo = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id: userId } = jwt.verify(token, jwtToken) as JwtPayload;
    res.status(201).json(addNewTodo(req.body.title, userId));
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};

export const updateTodo = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id: userId } = jwt.verify(token, jwtToken) as JwtPayload;
    const existingTodo = getExistingTodo(req.body.id, userId);
    if (!existingTodo) return res.status(404).json('Todo Not Found');

    const updatedTodo = updateExistingTodo(req.body);

    res.status(200).json(updatedTodo);
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id);
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id: userId } = jwt.verify(token, jwtToken) as JwtPayload;
    const existingTodo = getExistingTodo(todoId, userId);
    if (!existingTodo) return res.status(404).json('Todo Not Found');

    removeTodo(todoId, userId);

    res.json(todoId);
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};
