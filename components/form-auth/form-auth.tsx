"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { FormField } from "./form-field";
import { IAuthForm } from "./form.interface";
import { Api } from "@/services/api-client";
import styles from "./form-auth.module.scss";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const FormAuth = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<"Авторизация" | "Регистрация">(
    "Авторизация"
  );
  const isAuthType = type === "Авторизация";
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm) =>
      Api.authService.main(isAuthType ? "login" : "register", data),
    onSuccess(data) {
      if (data?.message) toast.error(data.message);
      else router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    },
  });

  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    startTransition(() => {
      mutate(data);
    });
  };

  const onChangeShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onChangeType = () => {
    setType(isAuthType ? "Регистрация" : "Авторизация");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>{type}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            type="email"
            placeholder="Электронная почта"
            disabled={isPending}
            error={errors.email}
            {...reg("email", {
              required: "Это поле не может быть пустым!",
              pattern: {
                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                message: "Неверный формат электронной почты!",
              },
            })}
          />
          <FormField
            type={isShowPassword ? "text" : "password"}
            placeholder="Пароль"
            disabled={isPending}
            isShowPassword={isShowPassword}
            onChangeShowPassword={onChangeShowPassword}
            error={errors.password}
            {...reg("password", {
              required: "Это поле не может быть пустым!",
              pattern: {
                value:
                  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  "Пароль не соответствует критериям: строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов!",
              },
            })}
          />
          <button type="submit" className={styles.button} disabled={isPending}>
            {isAuthType ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <div className={styles.selection}>
          {isAuthType ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <span onClick={onChangeType}>
            {isAuthType ? "Зарегистрироваться" : "Войти"}
          </span>
        </div>
      </div>
    </div>
  );
};
