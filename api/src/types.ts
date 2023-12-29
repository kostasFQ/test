export type ID = number | bigint;

export type LoginUserData = {
  password: string;
  email: string;
}
export type NewUser = LoginUserData & { username: string }
export type User = NewUser & { id: ID }

export type BaseTodo = {
  id: ID;
  title: string;
  userId: ID;
}
export type DBTodo = BaseTodo & { isDone: string }
export type Todo = BaseTodo & { isDone: boolean }

export type ErrorType = {
  statusCode: number,
  message: string
}
