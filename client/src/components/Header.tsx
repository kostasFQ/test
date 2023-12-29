import { User } from "types";
import { useCallback } from "react";
import Button from "./sharable/Button";
import useApi from "hooks/useApi";
import apiRoutes from "paths/api";
import { AxiosError } from "axios";
import { USER_STORAGE_KEY } from "consts";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useUserContext } from "storage/userContext";

import styles from "./comonStyles.module.scss";

function Header({ user }: { user: User | undefined }) {
  const { get } = useApi();
  const { setUser } = useUserContext();
  const { deleteStorageValue } = useLocalStorage();

  const onLogout = useCallback(async () => {
    try {
      await get(apiRoutes.users.logout);
      setUser(undefined);
      deleteStorageValue(USER_STORAGE_KEY);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      }
    }
  }, [deleteStorageValue, get, setUser]);

  if (!user) return null;


  return (
    <div className={styles.header}>
      <span>{user.username}'s todo list</span>
      <Button className={styles.logoutButton} onClick={onLogout}>Log out</Button>
    </div>
  )
}

export default Header;
