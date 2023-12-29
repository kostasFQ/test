import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from '../comonStyles.module.scss';

function Input(data: InputHTMLAttributes<HTMLInputElement>) {
  const { name, className, placeholder, ...rest } = data;
  return <input {...rest} name={name} placeholder={placeholder || name} className={classNames(styles.input, className)} />
}

export default Input;
