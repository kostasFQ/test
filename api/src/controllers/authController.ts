import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME, jwtToken } from '../../consts';
import { LoginUserData, NewUser } from '../types';
import { addNewUser, getUser } from '../db/userQueries';
import { errorHandler } from '../helpers';

export const register = (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as NewUser;
    const existingUser = getUser(email);
    if (existingUser) return res.status(409).json('User exists');

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = addNewUser({ email, username, password: hash });

    res.status(201).json(newUser);
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginUserData;
    const existingUser = getUser(email);
    if (!existingUser) return res.status(404).json('User not found');

    const { password: dbUserPassword, ...rest } = existingUser;
    const isMatch = bcrypt.compareSync(password, dbUserPassword);
    if (!isMatch) return res.status(400).json("Wrong user name or password");

    const token = jwt.sign({ id: existingUser.id }, jwtToken);
    res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'none', secure: true })
      .status(200).json(rest);
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie(COOKIE_NAME, { sameSite: 'none', secure: true })
      .status(200).json("Logged out");
  } catch (err) {
    const { statusCode, message } = errorHandler(err);
    res.status(statusCode).json(message);
  }
};
