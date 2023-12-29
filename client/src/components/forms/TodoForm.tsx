import { SyntheticEvent, useCallback } from "react";
import { getValuesFromFromData } from "utils";
import { NewTodo } from "types";
import Input from "components/sharable/Input";
import Button from "components/sharable/Button";
import styles from "./styles.module.scss"

type TodoFormProps = {
  onSubmit: (data: NewTodo) => void;
}

function TodoForm({ onSubmit }: TodoFormProps) {
  const addTodo = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement
    const newTodo = getValuesFromFromData<NewTodo>(form);
    onSubmit(newTodo);
    form.reset();
  }, [onSubmit]);

  return (
    <div className={styles.todoForm}>
      <h3>Add new todo</h3>
      <form className={styles.addTodoControls} onSubmit={addTodo}>
        <Input className={styles.mainInput} name='title' placeholder='enter todo title' required />
        <Button className={styles.mainButton} type='submit'>Add</Button>
      </form>
    </div>
  )
};

export default TodoForm;
