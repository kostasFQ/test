export enum DataBase {
  USERS = 'users',
  TODOS = 'todos'
};

export type User = {
  username: string;
  password: string;
  email: string;
  id?: number
}

export type Todo = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
}

export type SelectType = 'single' | 'plural'