import { Metadata } from "next";

import { FormAuth } from "@/components/form-auth";

export const metadata: Metadata = {
  title: "Вход в личный кабинет",
  robots: { index: false, follow: false },
};

const AuthPage = () => {
  return <FormAuth />;
};

export default AuthPage;
