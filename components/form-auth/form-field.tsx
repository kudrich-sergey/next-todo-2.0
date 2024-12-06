import { forwardRef } from "react";

import { IFormField } from "./form.interface";
import styles from "./form-auth.module.scss";

const FormField = forwardRef<HTMLInputElement, IFormField>(
  ({ onChangeShowPassword, isShowPassword, error, type, ...rest }, ref) => {
    return (
      <>
        <div className={styles.group}>
          {type === "email" ? (
            <i className={`ic-email`} />
          ) : (
            <i className={`ic-password`} />
          )}
          <input ref={ref} type={type} {...rest} />
          {typeof onChangeShowPassword === "function" &&
            (isShowPassword ? (
              <i className="ic-eye-slash" onClick={onChangeShowPassword} />
            ) : (
              <i className="ic-eye" onClick={onChangeShowPassword} />
            ))}
        </div>
        {error && <div className={styles.error}>{error.message}</div>}
      </>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
