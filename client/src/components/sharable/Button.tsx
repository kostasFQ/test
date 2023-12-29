import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "../comonStyles.module.scss";

function Button(data: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = data;

  return <button {...rest} className={classNames(styles.button, className)} />
};

export default Button;
