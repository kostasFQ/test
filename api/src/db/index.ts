import Database from 'better-sqlite3';

export default new Database('db.sqlite', { verbose: console.log });;
