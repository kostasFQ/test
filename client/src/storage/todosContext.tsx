import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { NewTodo, Todo } from "types";
import useApi from "hooks/useApi";
import apiRoutes from "paths/api";
import { errorParser } from "utils";
import { useUserContext } from "./userContext";

type TodosContextType = {
  todos: Todo[]
  error: string | undefined
  createNewTodo: (title: string) => void
  updateTodo: (data: Todo, index: number) => void
  deleteTodo: (id: number, index: number) => void
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

const TodosContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fetched = useRef(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const { get, post, put, del } = useApi();
  const { user } = useUserContext();

  const fetchTodos = useCallback(async () => {
    try {
      const todos = await get<Todo[]>(apiRoutes.todos.list);
      setTodos(todos);
    } catch (e) {
      setError(errorParser(e))
    }
  }, [get]);

  const createNewTodo = useCallback(async (title: string) => {
    try {
      const newTodo = await post<NewTodo, Todo>(apiRoutes.todos.list, { title });
      setTodos((todos) => [...todos, newTodo]);
    } catch (e) {
      setError(errorParser(e))
    }
  }, [post]);

  const updateTodo = useCallback(async (todo: Todo, index: number) => {
    try {
      const updatedTodo = await put<Todo>(apiRoutes.todos.byId(todo.id), todo);
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos[index] = updatedTodo;
        return newTodos;
      })
    } catch (e) {
      setError(errorParser(e))
    }
  }, [put]);

  const deleteTodo = useCallback(async (id: number, index: number) => {
    try {
      await del<void>(apiRoutes.todos.byId(id));
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos.splice(index, 1);
        return newTodos;
      })
    } catch (e) {
      setError(errorParser(e))
    }
  }, [del])

  useEffect(() => {
    if (user && !fetched.current) {
      fetchTodos();
      fetched.current = true;
    }
  }, [fetchTodos, user]);

  return (
    <TodosContext.Provider value={{ todos, error, createNewTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

const useTodosContext = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodosContext must be used within a MyContextProvider");
  }

  return context;
};

export { TodosContext, TodosContextProvider, useTodosContext };
