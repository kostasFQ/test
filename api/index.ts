import express from 'express';
import cookieParser from 'cookie-parser';
import todosRoutes from './src/routes/todos';
import authRoutes from './src/routes/auth';
import appPaths from './src/paths';
import { port } from './consts';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(appPaths.auth.root, authRoutes);
app.use(appPaths.todos.root, todosRoutes);

app.listen(port, () => { console.log('Conected to BE') });
