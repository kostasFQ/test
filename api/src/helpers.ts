import { DBTodo, ErrorType, Todo } from "./types";

export const parseTodo = (todo: DBTodo): Todo => {
  const boolenValue = todo.isDone === 'true' ? true : false;
  return { ...todo, isDone: boolenValue };
}

export const errorHandler = (error: unknown): ErrorType => {
  let defaultstatusCode = 500;
  let defaultMessage = 'Oops! Something went wrong...';

  if (error instanceof Error) {
    if (error.name = 'JsonWebTokenError') {
      defaultstatusCode = 403;
      defaultMessage = 'Invalid token'
    }
  }

  console.log(`[ERROR] Status: ${defaultstatusCode} - ${defaultMessage}`);
  return { statusCode: defaultstatusCode, message: defaultMessage };
};
