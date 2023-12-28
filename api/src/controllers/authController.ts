import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME, jwtToken } from '../consts';
import { DataBase, User } from '../types';
import { insert, selectBy } from '../db/queries';

export const register = (req: Request, res: Response) => {
  try {
    const user = req.body as User;
    const { email, password, username } = user;
    const existingUser: User = selectBy(DataBase.USERS, { email }, 'single');

    if (existingUser) return res.status(409).json('User exists');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const id = insert(DataBase.USERS, { email, username, password: hash });

    res.status(201).json({ ...req.body, id });
  } catch (err: unknown) {
    res.status(500).json('Smtn went wrong...');
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const user = req.body as User;
    const { email, password } = user;
    const existingUser: User = selectBy(DataBase.USERS, { email }, 'single');

    if (!existingUser) return res.status(404).json('User not found');

    const { password: dbUserPassword, ...rest } = existingUser;
    const isMatch = bcrypt.compareSync(password, dbUserPassword);

    if (!isMatch) return res.status(400).json("Wrong user name or password");

    const token = jwt.sign({ id: user.id }, jwtToken);
    res.cookie(COOKIE_NAME, token, { httpOnly: true }).status(200).json(rest);
  } catch (err: unknown) {
    res.status(500).json('Smtn went wrong...');
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    sameSite: 'none',
    secure: true
  }).status(200).json("Logged out");
};
