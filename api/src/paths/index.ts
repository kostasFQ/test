const prefix = '/api';

const appPaths = {
  auth: {
    root: `${prefix}/users`,
    register: '/register',
    login: '/login',
    logout: '/logout'
  },
  todos: {
    root: `${prefix}/todos`,
    get: '/',
    post: '/',
    put: '/:id',
    delete: '/:id',
  }
};

export default appPaths;
