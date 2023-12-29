import db from '.';
import { DataBase, SelectType } from '../types';
import { separateObject, separateToValuesAndKeys } from '../helpers';

export function selectBy<T>(tableName: DataBase, data?: Record<string, string>, type?: SelectType): T {
  if (!data) return db.prepare(`SELECT * FROM ${tableName}`).all() as T;
  const { keys, values } = separateObject(data);
  const query = keys.map((i) => `${i} = ?`).join(' AND ');

  const res = (type === 'single'
    ? db.prepare(`SELECT * FROM ${tableName} WHERE ${query}`).get(values)
    : db.prepare(`SELECT * FROM ${tableName} WHERE ${query}`).all(values)
  ) as T;
  return res;
};

export function insert(tableName: DataBase, data: Record<string, string>) {
  const { keys, values } = separateObject(data);
  const marks = new Array(values.length).fill('?').join(', ');
  const { lastInsertRowid } = db.prepare(`INSERT INTO ${tableName}(${keys.join(', ')}) VALUES (${marks})`).run(values);

  return lastInsertRowid;
};

export function update(tableName: DataBase, data: Record<string, string>, keys: string[]) {
  const [newValues, keyValues, keyNames] = separateToValuesAndKeys(data, keys);
  const queries = keyNames.map((i) => `\`${i}\`=?`).join(', ');
  const conditionKeys = keys.map((i) => `\`${i}\` = ?`).join(' AND ');

  return db.prepare(`UPDATE ${tableName} SET ${queries} WHERE ${conditionKeys}`)
    .run([...newValues, ...keyValues]);
};

export function remove(table: DataBase, data: Record<string, string>) {
  const { keys, values } = separateObject(data);
  const query = keys.map((i) => `${i} = ?`).join(' AND ');

  return db.prepare(`DELETE FROM ${table} WHERE ${query}`).run(values);
};
