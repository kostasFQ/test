import { API_PATH } from 'consts';

const apiRoutes = {
  users: {
    register: `${API_PATH}/users/register`,
    login: `${API_PATH}/users/login`,
    logout: `${API_PATH}/users/logout`,
  },
  todos: {
    list: `${API_PATH}/todos`,
    byId: (id: number) => `${API_PATH}/todos/${id}`,
  }
};

export default apiRoutes;
