-- CREATE TABLE users(
--   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   username VARCHAR(100) NOT NULL,
--   password VARCHAR(255) NOT NULL,
-- );

-- INSERT INTO users(id, email, username, password)
-- VALUES(1, 'kst@mail.com', 'KST', '123');

-- SELECT * FROM users

----------

-- CREATE TABLE todos (
--   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   description VARCHAR(1000) NOT NULL,
--   isDone BOOLEAN NOT NULL,
--   userId INTEGER NOT NULL,
--   FOREIGN KEY (userId) REFERENCES users (id)
-- );

-- INSERT INTO todos(title, description, isDone, userId)
-- VALUES('todo2--', '2222---- this test task', 'false', '2');
-- SELECT * FROM todos
-- DROP TABLE todos