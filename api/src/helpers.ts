import { DBTodo, SeparatedObject, SeparateToValuesAndKeys, Todo } from "./types";

export const separateObject = (obj: object): SeparatedObject => {
  const initial: SeparatedObject = { values: [], keys: [] };

  return Object.entries(obj).reduce((a, c) => {
    const [key, value] = c;
    a.keys.push(key);
    a.values.push(value.toString());

    return a;
  }, initial);
};

export const separateToValuesAndKeys = (data: Record<string, string>, keys: string[]): SeparateToValuesAndKeys => {
  return Object.entries(data).reduce((a, c) => { //Tuple
    const [nv, kv, kn]: SeparateToValuesAndKeys = a;
    if (keys.includes(c[0])) { kv.push(c[1]) };
    if (!keys.includes(c[0])) {
      nv.push(c[1]);
      kn.push(c[0]);
    }

    return a;
  }, [[], [], []]);
};

export const parseTodo = (todo: DBTodo): Todo => {
  const boolenValue = todo.isDone === 'true' ? true : false;
  return { ...todo, isDone: boolenValue };
}