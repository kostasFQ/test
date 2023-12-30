import { useCallback } from 'react';
import classNames from 'classnames';
import { Todo } from 'types';
import Button from './sharable/Button';
import { ReactComponent as CheckIcon } from 'assets/checkmark-svgrepo-com.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete-1-svgrepo-com.svg';
import { useTodosContext } from 'storage/todosContext';

import styles from './comonStyles.module.scss';

function TodoListItem({ data, index }: { data: Todo, index: number }) {
  const { updateTodo, deleteTodo } = useTodosContext();

  const onComplete = useCallback(() => {
    updateTodo({ ...data, isDone: true }, index);
  }, [data, index, updateTodo]);

  const onDelete = useCallback(() => {
    deleteTodo(data.id, index);
  }, [data, deleteTodo, index]);

  return (
    <li className={styles.todoItem}>
      <Button className={styles.completeButton} onClick={onComplete} disabled={data.isDone}>
        <CheckIcon />
      </Button>
      <span className={classNames(styles.todoText, { [styles.completedTodo]: data.isDone })}>
        {data.title}
      </span>
      <Button onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </li>
  );
}

export default TodoListItem;
