import { useCallback, useState } from "react";
import AuthForm from "components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import useApi from "hooks/useApi";
import apiRoutes from "paths/api";
import appPaths from "paths/app";
import { User } from "types";
import { AxiosError } from "axios";
import AuthRedirect from "components/AuthRedirect";

import styles from "./styles.module.scss";


function Register() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { post } = useApi();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (formJsonData: Partial<User>) => {
    try {
      await post<Partial<User>, void>(apiRoutes.users.register, formJsonData);
      navigate(appPaths.login);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data)
      }
    }
  }, [navigate, post]);

  return (
    <div className={styles.authPage}>
      <AuthForm viewType="register" onSubmit={onSubmit} error={error} />
      <AuthRedirect goToHref={appPaths.login} goToTitle="Login Page" label="Have an account?" />
    </div>
  )
}

export default Register;
