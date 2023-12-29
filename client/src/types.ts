export type LoginUserData = {
  password: string;
  email: string;
}
export type NewUser = LoginUserData & { username: string }
export type User = NewUser & { id: number }

export type NewTodo = {
  title: string;
}

export type Todo = NewTodo & {
  id: number,
  isDone: boolean,
  userId: number,
}
export type FormView = "register" | "login";
export type SubmitData = LoginUserData | NewUser;
