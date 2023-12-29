import { Todo } from "types";
import TodoListItem from "./Todo";
import styles from './comonStyles.module.scss';

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo, index) => <TodoListItem key={todo.id} data={todo} index={index} />)}
    </ul>
  );
};

export default TodoList;

