import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewUser, SubmitData } from 'types';
import useApi from 'hooks/useApi';
import apiRoutes from 'paths/api';
import appPaths from 'paths/app';
import AuthForm from 'components/forms/AuthForm';
import AuthRedirect from 'components/AuthRedirect';

import styles from './styles.module.scss';
import { isNewUserDataGuard } from 'utils';

function Register() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { post } = useApi();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (body: SubmitData) => {
    try {
      if (isNewUserDataGuard(body)) {
        await post<NewUser, void>(apiRoutes.users.register, body);
        navigate(appPaths.login);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
      }
    }
  }, [navigate, post]);

  return (
    <div className={styles.authPage}>
      <AuthForm viewType='register' onSubmit={onSubmit} error={error} />
      <AuthRedirect goToHref={appPaths.login} goToTitle='Login Page' label='Have an account?' />
    </div>
  );
}

export default Register;
