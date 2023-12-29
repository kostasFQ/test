
export type User = {
  username: string;
  password: string;
  email: string;
  id?: number
}

export type NewTodo = {
  title: string;
}

export type Todo = NewTodo & {
  id: number,
  isDone: boolean,
  userId: number,
}
