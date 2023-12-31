import { User } from 'types';
import { useCallback } from 'react';
import Button from './sharable/Button';
import useApi from 'hooks/useApi';
import apiRoutes from 'paths/api';
import { USER_STORAGE_KEY } from 'consts';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useUserContext } from 'storage/userContext';

import styles from './comonStyles.module.scss';
import { errorParser } from 'utils';

function Header({ user }: { user: User | undefined }) {
  const { get } = useApi();
  const { setUser } = useUserContext();
  const { deleteStorageValue } = useLocalStorage();

  const onLogout = useCallback(async () => {
    try {
      setUser(undefined);
      deleteStorageValue(USER_STORAGE_KEY);
      await get(apiRoutes.users.logout);
    } catch (err) {
      const errorMessage = errorParser(err);
      console.log(errorMessage);
    }
  }, [deleteStorageValue, get, setUser]);

  return (
    <div className={styles.header}>
      {user && <span>{user.username}&lsqo;s todo list</span>}
      <Button className={styles.logoutButton} onClick={onLogout}>Log out</Button>
    </div>
  );
}

export default Header;
