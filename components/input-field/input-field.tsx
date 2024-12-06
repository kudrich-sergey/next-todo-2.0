import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

import styles from "./input-field.module.scss";

interface InputFieldProps {
  title: string;
  disabled: boolean;
  error: FieldError | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> &
  InputFieldProps;

const InputField = forwardRef<HTMLInputElement, TypeInputPropsField>(
  ({ title, disabled, error, ...rest }, ref) => {
    return (
      <>
        {title && <span className={styles.title}>{title}</span>}
        <input
          autoFocus
          ref={ref}
          {...rest}
          className={clsx(styles.input, error && styles.error)}
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error.message}</span>}
      </>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
