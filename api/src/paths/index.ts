const prefix = '/api';

const appPaths = {
  auth: {
    root: `${prefix}/users`,
    sub: {
      register: '/register',
      login: `/login`,
      logout: '/logout'
    }
  },
  todos: {
    root: `${prefix}/todos`,
    sub: {
      get: '/',
      post: '/',
      put: '/:id',
      delete: '/:id',
    }
  }
};

export default appPaths;
