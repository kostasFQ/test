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

export type DBTodo = {
  id: number;
  title: string;
  isDone: string;
  userId: number;
}

export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  userId: number;
}

export type SelectType = 'single' | 'plural'

export type SeparatedObject = Record<string, string[]>
export type SeparateToValuesAndKeys = string[][]
