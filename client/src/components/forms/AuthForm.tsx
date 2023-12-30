import { FormEvent } from 'react';
import { FormView, SubmitData } from 'types';
import { getValuesFromFromData } from 'utils';
import Button from 'components/sharable/Button';
import Input from 'components/sharable/Input';
import styles from '../comonStyles.module.scss';

type AuthFormProps = {
  viewType: FormView,
  error?: string,
  onSubmit: (data: SubmitData) => void;
};

const formTitleMap: Record<FormView, string> = {
  register: 'Registration',
  login: 'Login'
};

const buttonTitleMap: Record<FormView, string> = {
  register: 'Register',
  login: 'Log in'
};

function AuthForm({ viewType, error, onSubmit }: AuthFormProps) {
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = getValuesFromFromData<SubmitData>(e.currentTarget);

    onSubmit(values);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} className={styles.authForm}>
        <h2>{formTitleMap[viewType]}</h2>
        {viewType === 'register' && (
          <Input required name="username" />
        )}
        <Input required name="email" type="email" />
        <Input required name="password" type="password" />
        <Button type="submit" className={styles.button}>{buttonTitleMap[viewType]}</Button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </>
  );
}

export default AuthForm;
