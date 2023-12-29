import db from ".";
import { NewUser, User } from "../types";

export function getUser(email: string): User | undefined {
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get([email]) as User;
  return user ?? undefined;
}

export function addNewUser(data: NewUser): User {
  const values = [data.email, data.username, data.password]
  const { lastInsertRowid } = db.prepare(`INSERT INTO users(email, username, password) VALUES(?, ?, ?)`).run(values);
  return { ...data, id: lastInsertRowid };
}