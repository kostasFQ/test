import { SyntheticEvent } from "react";
import { User } from "types";
import { getValuesFromFromData } from "utils";
import Button from "components/sharable/Button";
import Input from "components/sharable/Input";
import styles from "../comonStyles.module.scss";

type FormView = "register" | "login";

type AuthFormProps = {
  viewType: FormView,
  error?: string,
  onSubmit: (data: Partial<User>) => void;
}

const formTitleMap: Record<FormView, string> = {
  register: "Registration",
  login: "Login"
}
const buttonTitleMap: Record<FormView, string> = {
  register: "Register",
  login: "Log in"
}

function AuthForm({ viewType, error, onSubmit }: AuthFormProps) {
  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const values = getValuesFromFromData<Partial<User>>(e.target as HTMLFormElement);
    onSubmit(values);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} className={styles.authForm}>
        <h2>{formTitleMap[viewType]}</h2>
        {viewType === "register" && (
          <Input required name="username" />
        )}
        <Input required name="email" type="email" />
        <Input required name="password" type="password" />
        <Button type="submit" className={styles.button}>{buttonTitleMap[viewType]}</Button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </>
  )
}

export default AuthForm;
