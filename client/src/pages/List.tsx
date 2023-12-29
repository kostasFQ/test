import { useCallback } from "react";
import { NewTodo } from "types";
import TodoList from "components/TodoList";
import TodoForm from "components/forms/TodoForm";
import { useTodosContext } from "storage/todosContext";
import styles from "./styles.module.scss";

function List() {
  const { todos, error, createNewTodo } = useTodosContext();

  const addTodo = useCallback((data: NewTodo) => {
    createNewTodo(data.title);
  }, [createNewTodo]);

  return (
    <div className={styles.listPage}>
      <div className={styles.listPageLayout}>
        <TodoForm onSubmit={addTodo} />
        {error && <p className={styles.error}>{error}</p>}
        <TodoList todos={todos} />
      </div>
    </div>
  )
};

export default List;

