import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface IFormFieldProps {
  error?: FieldError | undefined;
  isShowPassword?: boolean;
  onChangeShowPassword?: () => void;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> &
  IFormFieldProps;

export interface IFormField extends TypeInputPropsField {}

export interface IAuthForm {
  email: string;
  password: string;
}
