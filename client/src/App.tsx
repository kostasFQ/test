import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { USER_STORAGE_KEY } from 'consts';
import { User } from 'types';
import appPaths from 'paths/app';
import Header from 'components/Header';
import PrivatePageWrapper from 'components/PrivatePageWrapper';
import { useUserContext } from 'storage/userContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import List from 'pages/List';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

function App() {
  const { getStorageValue } = useLocalStorage();
  const { user, setUser } = useUserContext();
  const storedUser = getStorageValue<User>(USER_STORAGE_KEY);
  const isAuthenticated = !!user || !!storedUser;

  useEffect(() => {
    if (storedUser && !user) {
      setUser(storedUser);
    }
  }, [getStorageValue, setUser, user, storedUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.root} element={
          <PrivatePageWrapper isAuthenticated={isAuthenticated} authenticationPath={appPaths.login}>
            <>
              <Header user={user} />
              <List />
            </>
          </PrivatePageWrapper>
        }>
        </Route>
        <Route path={appPaths.register} element={<Register />} />
        <Route path={appPaths.login} element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
