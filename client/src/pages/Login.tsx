import { AxiosError } from "axios";
import AuthForm from "components/forms/AuthForm";
import useApi from "hooks/useApi";
import apiRoutes from "paths/api";
import appPaths from "paths/app";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUserData, User } from "types";
import { useLocalStorage } from "hooks/useLocalStorage";
import { USER_STORAGE_KEY } from "consts";
import { useUserContext } from "storage/userContext";
import AuthRedirect from "components/AuthRedirect";

import styles from "./styles.module.scss";

function Login() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { post } = useApi();
  const { setUser } = useUserContext();
  const { setStorageValue } = useLocalStorage();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (body: LoginUserData) => {
    try {
      const user = await post<LoginUserData, User>(apiRoutes.users.login, body);
      setUser(user);
      setStorageValue(USER_STORAGE_KEY, user);
      navigate(appPaths.root);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data)
      }
    }
  }, [navigate, post, setStorageValue, setUser]);

  return (
    <div className={styles.authPage}>
      <AuthForm viewType='login' onSubmit={onSubmit} error={error} />
      <AuthRedirect goToHref={appPaths.register} goToTitle='Registration' label='New User?' />
    </div>
  )
}

export default Login;
