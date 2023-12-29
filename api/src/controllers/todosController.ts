import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { selectBy, insert, update, remove } from '../db/queries';
import { DBTodo, DataBase, Todo } from '../types';
import { COOKIE_NAME, jwtToken } from '../../consts';
import { parseTodo } from '../helpers';

export const getTodos = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id } = jwt.verify(token, jwtToken) as JwtPayload;
    const userId = id.toString();
    const todos: DBTodo[] = selectBy(DataBase.TODOS, { userId });

    res.json(todos.map(parseTodo));
  } catch (err: unknown) {
    //   if (err) return res.status(403).json('Invalid token'); 
    res.status(500).json('Smtn went wrong...');
  }
};

export const addTodo = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id: userId } = jwt.verify(token, jwtToken) as JwtPayload;
    const newTodo = { ...req.body, isDone: false, userId };
    const newId = insert(DataBase.TODOS, newTodo);
    res.status(201).json({ id: newId, ...newTodo, userId });

  } catch (e) {
    // if (err) return res.status(403).json('Invalid token');
    res.status(500).json('Smtn went wrong...');
  }
};


export const updateTodo = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    jwt.verify(token, jwtToken);
    update(DataBase.TODOS, { ...req.body, isDone: req.body.isDone.toString() }, ['id', 'userId']);
    res.status(200).json({ ...req.body });

  } catch (e) {
    // if (err) return res.status(403).json('Invalid token');
    res.status(500).json('Smtn went wrong...');
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json('Not authenthicated');

    const { id } = jwt.verify(token, jwtToken) as JwtPayload;
    const userId = id.toString();
    const todo: Todo = selectBy(DataBase.TODOS, { id: req.params.id, userId }, 'single');

    if (!todo) return res.status(404).json('Todo not found');

    remove(DataBase.TODOS, { id: req.params.id, userId });
    res.json(`Todo with id ${req.params.id} was deleted`);

  } catch (e) {
    // if (err) return res.status(403).json('Invalid token');
    res.status(500).json('Smtn went wrong...');
  }
};
